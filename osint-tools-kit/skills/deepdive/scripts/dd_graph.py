#!/usr/bin/env python3
"""Provenance-preserving wrapper around DeepDive's graph API (core/graph.py, src/build_board.py).

Run with DeepDive's venv interpreter. Storage: $OSINT_CASES_DIR/<case>/deepdive/<investigation>/
  <Name>.json        DeepDive graph (loadable by the DeepDive server)
  provenance.jsonl   append-only log of every record added, with source + retrieval time
  board_3d.html      offline board (mode='skill')
"""
import argparse, json, os, re, sys
from datetime import datetime, timezone

APP = os.environ.get("DEEPDIVE_HOME", os.path.expanduser("~/tools/deepdive"))
CASES = os.environ.get("OSINT_CASES_DIR", os.path.expanduser("~/osint-cases"))
sys.path[:0] = [os.path.join(APP, "core"), os.path.join(APP, "src")]
from graph import InvestigationGraph, Entity, Connection  # noqa: E402

STATUSES = ("source_claim", "inferred", "verified")
SAFE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def slug(s):
    return re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")[:80] or "investigation"


def inv_dir(case, inv):
    for v, n in ((case, "case"), (inv, "investigation")):
        if not SAFE.match(v):
            sys.exit(f"ERROR: {n} id must match [A-Za-z0-9._-]+")
    return os.path.join(CASES, case, "deepdive", inv)


def load(d):
    js = [f for f in os.listdir(d) if f.endswith(".json")] if os.path.isdir(d) else []
    if not js:
        sys.exit(f"ERROR: no investigation graph in {d} (run init first)")
    return InvestigationGraph.load(os.path.join(d, js[0]))


def log(d, rec):
    with open(os.path.join(d, "provenance.jsonl"), "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def prov(item):
    status = item.get("claim_status", "source_claim")
    if status not in STATUSES:
        raise ValueError(f"claim_status must be one of {STATUSES}")
    src = item.get("source_url") or item.get("document_ref")
    if status in ("source_claim", "verified") and not src:
        raise ValueError("source_url or document_ref required for source_claim/verified")
    if status == "inferred" and not item.get("basis"):
        raise ValueError("inferred items need 'basis' (the reasoning / records relied on)")
    return {k: v for k, v in {
        "claim_status": status, "source_url": item.get("source_url"),
        "document_ref": item.get("document_ref"), "retrieved_at": item.get("retrieved_at") or now(),
        "basis": item.get("basis"), "note": item.get("note"),
        "verified_by": item.get("verified_by")}.items() if v}


def cmd_init(a):
    d = inv_dir(a.case, a.inv or slug(a.subject))
    if os.path.isdir(d) and any(f.endswith(".json") for f in os.listdir(d)):
        sys.exit(f"ERROR: investigation already exists: {d}")
    os.makedirs(d, exist_ok=True)
    seed = Entity(a.subject, a.type, {"claim_status": "user_provided", "retrieved_at": now()})
    g = InvestigationGraph(a.subject, seed)
    path = g.save(d)
    log(d, {"ts": now(), "op": "init", "subject": a.subject, "type": a.type})
    print(json.dumps({"investigation_dir": d, "graph": path}, ensure_ascii=False))


def cmd_add(a):
    d = inv_dir(a.case, a.inv); g = load(d)
    data = json.load(sys.stdin)
    out = {"entities_new": 0, "entities_merged": [], "connections_new": 0, "rejected": []}
    for e in data.get("entities", []):
        try:
            p = prov(e)
        except ValueError as ex:
            out["rejected"].append({"entity": e.get("name"), "reason": str(ex)}); continue
        ent = Entity(e["name"], e.get("type", "unknown"), {**e.get("attributes", {}), **p})
        if e.get("id"):
            ent.id = e["id"]  # explicit disambiguator for same-name different people
        ent.depth = int(e.get("depth", 1)); ent.sources = [p.get("source_url") or p.get("document_ref")] if (p.get("source_url") or p.get("document_ref")) else []
        if ent.id in g.entities:
            out["entities_merged"].append(ent.id)
            g.findings.append(f"CHECK SAME-NAME MERGE (not proof of identity): '{e['name']}' merged into existing node '{ent.id}'")
        else:
            out["entities_new"] += 1
        g.add_entity(ent)
        log(d, {"ts": now(), "op": "entity", "id": ent.id, "name": e["name"], "type": ent.type, **p})
    for c in data.get("connections", []):
        try:
            p = prov(c)
            for k in ("source", "target"):
                if c[k] not in g.entities:
                    raise ValueError(f"unknown {k} id '{c[k]}'")
        except (ValueError, KeyError) as ex:
            out["rejected"].append({"connection": f"{c.get('source')}->{c.get('target')}", "reason": str(ex)}); continue
        conn = Connection(c["source"], c["target"], c.get("relationship", "related_to"), float(c.get("confidence", 0.4)), p)
        conn.sources = [p.get("source_url") or p.get("document_ref")] if (p.get("source_url") or p.get("document_ref")) else []
        conn.time_period = c.get("time_period")
        if g.add_connection(conn):
            out["connections_new"] += 1
        log(d, {"ts": now(), "op": "connection", "source": c["source"], "target": c["target"], "relationship": conn.relationship, "confidence": conn.confidence, **p})
    for f in data.get("findings", []):
        g.findings.append(f); log(d, {"ts": now(), "op": "finding", "text": f})
    for q in data.get("searches", []):
        g.search_history.append(q); log(d, {"ts": now(), "op": "search", "query": q})
    if data.get("mark_investigated"):
        g.mark_investigated(data["mark_investigated"])
    g.save(d)
    print(json.dumps(out, ensure_ascii=False, indent=1))


def cmd_board(a):
    from build_board import build_board
    d = inv_dir(a.case, a.inv); g = load(d)
    g.detect_gaps(); g.save(d)
    p = os.path.join(d, "board_3d.html")
    build_board(g, p, f"Investigation: {g.name}", mode="skill")
    print(p)


def cmd_summary(a):
    d = inv_dir(a.case, a.inv); g = load(d)
    gaps = g.detect_gaps(); g.save(d)
    counts = {}
    for c in g.connections:
        s = (c.metadata or {}).get("claim_status", "unlabelled"); counts[s] = counts.get(s, 0) + 1
    deg = {}
    for c in g.connections:
        deg[c.source_id] = deg.get(c.source_id, 0) + 1; deg[c.target_id] = deg.get(c.target_id, 0) + 1
    pending = sorted([e for e in g.entities.values() if not e.investigated], key=lambda e: -deg.get(e.id, 0))[:5]
    print(json.dumps({"dir": d, "stats": g.get_stats(), "connections_by_claim_status": counts,
                      "gaps_detected": len(gaps or []), "findings": g.findings[-20:],
                      "top_pending": [e.id for e in pending]}, ensure_ascii=False, indent=1, default=str))


def cmd_list(a):
    base = os.path.join(CASES, a.case, "deepdive")
    print("\n".join(sorted(x for x in os.listdir(base) if os.path.isdir(os.path.join(base, x)))) if os.path.isdir(base) else "(none)")


ap = argparse.ArgumentParser(description=__doc__)
sp = ap.add_subparsers(dest="cmd", required=True)
p = sp.add_parser("init"); p.add_argument("--case", required=True); p.add_argument("--subject", required=True); p.add_argument("--type", default="unknown"); p.add_argument("--inv"); p.set_defaults(f=cmd_init)
for n, f in (("add", cmd_add), ("board", cmd_board), ("summary", cmd_summary)):
    p = sp.add_parser(n); p.add_argument("--case", required=True); p.add_argument("--inv", required=True); p.set_defaults(f=f)
p = sp.add_parser("list"); p.add_argument("--case", required=True); p.set_defaults(f=cmd_list)
a = ap.parse_args(); a.f(a)
