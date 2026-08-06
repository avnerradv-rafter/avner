# Lesson Library

**Standing Academy asset. Permanent. Version 1.0.**

The Lesson Library holds what the Academy teaches about how professional-services systems fail. Lessons accumulate **by principle, not by subject** — each is stated as a general truth, with observed instances attached as evidence beneath it.

> **Standing rule.** When a later study observes the same failure, the lesson gains a second instance and its confidence rises. Recurrence across independent subjects is the strongest available evidence that a failure is structural rather than incidental. Lessons are promoted here by S8 of [LREF-01](../LREF-01/LREF-01-Methodology.md).

## Confidence

| Level | Basis |
| --- | --- |
| **Single-instance** | Observed in one subject. Sound, unproven as structural |
| **Corroborated** | Observed in two or more independent subjects |
| **Conditional** | Contradicted elsewhere; holds under stated conditions only |

All lessons in v1.0 are **single-instance**, evidenced by CS-001.

---

### LL-01 — Absence is the loudest signal

The fastest route to understanding a system is to enumerate what it *cannot represent*. Capability lists describe intent; absences describe reality.

**Instance (CS-001).** The subject could not represent a hearing, a court, an opposing party, a limitation date, or a concluded matter. Those five absences defined the product more completely than any feature list.

**Transferable skill.** Evaluate any system by attempting to express five domain-typical facts in it. What fails, defines it.

---

### LL-02 — A promise without an entity is marketing

Every stated objective depends on a structure capable of satisfying it. Where that structure is absent, the objective was never translated into the model and could never have been met — and no amount of interface work can rescue it.

**Instance (CS-001).** The subject promised that users would never miss a court date. Meeting that promise required a hearing entity and a deadline entity. Neither existed.

**Transferable skill.** Trace every stated objective to the entity and relationship that would satisfy it. Untraceable objectives are decoration.

---

### LL-03 — Free text is a decision to have no data

Uncontrolled vocabulary is not a shortcut deferred to later. It is a decision to forgo aggregation, automation and retrieval permanently. In a system with any machine-reasoning component the cost compounds, because vocabulary drift also degrades classification and search.

**Instance (CS-001).** Status was a free-text field while dashboards filtered on three hardcoded values. Records outside those three were silently excluded from every aggregate — a failure that produces plausible numbers rather than visible errors.

---

### LL-04 — Fork-and-rename is worse than copy-paste

A near-perfect rename passes review precisely *because* it looks correct. The inherited residue stays invisible until the semantics of the two copies diverge in production.

**Instance (CS-001).** One module was a 95%-renamed fork of another. Its analytics filtered on a status the forked entity could not hold, and therefore reported zero permanently.

**Transferable skill.** When forking, change the semantics deliberately and enumerate every assumption inherited from the source.

---

### LL-05 — Deletion is not a lifecycle

Where closure cannot be represented, closure will be expressed as deletion. In a regulated practice with retention duties and discovery exposure, that converts routine operation into evidence destruction. Append-only is not an architectural luxury in professional services; it is a compliance floor.

**Instance (CS-001).** Cancelling deleted. Closing was unrepresentable, so closing also deleted.

---

### LL-06 — The security boundary is wherever the server is

A role string held by the client is not access control. The instructive part is rarely the failure itself but its distribution: where a minority of subsystems get it right, the knowledge existed within the team and was not generalised.

**Instance (CS-001).** Authorization was largely client-side, yet two subsystems implemented correct server-issued per-record permissions.

**Transferable skill.** Find the minority-correct pattern in any codebase. It tells you what the team knew but did not have time to systematise — and it is usually the correct pattern.

---

### LL-07 — Fabricated data is contagious

Once a user discovers one invented metric, every metric beside it becomes untrustworthy, including the correct ones. Demonstration data must never ship. An honest "not yet measured" is worth more than a plausible lie.

**Instance (CS-001).** Two of five dashboard charts rendered invented numbers.

---

### LL-08 — The interface reifies the data model

Where navigation is entity-first, it is usually because the model is entity-first and lacks the joins that would let users navigate by domain object. Users then perform mentally the join the schema failed to make. The UX defect and the modelling defect are one defect.

**Instance (CS-001).** Primary navigation was organised by table rather than by matter, with no matter-level joins beneath it.

---

### LL-09 — Requirements degrade predictably under implementation pressure

Unenforced relationships and unspecified enumerations are the first casualties, every time. Build the enforcement infrastructure before the features that depend on it, because retrofitting it means rewriting them.

**Instance (CS-001).** A designed capability-based role model became scattered role conditionals; designed per-matter member roles became a hardcoded placeholder.

---

### LL-10 — Conway's Law is readable

Module duplication, naming drift and missing joins are legible evidence of team structure. Cross-cutting relationships fail wherever no one owns them.

**Instance (CS-001).** Four contributors, four modules, two fork-duplications, zero integration. The orphaned-deadline defect existed because three modules were built in parallel and nobody owned the joins between them.

---

### LL-11 — Good ideas survive bad implementations

Idea quality and execution quality are independent variables. The extractable asset is the former; the latter is disposable. Judging them together discards good work and preserves bad work in equal measure.

**Instance (CS-001).** The subject's document-request loop was genuinely innovative — in-context, object-based, self-discharging, provenance-preserving — and remained valuable despite a delimiter-encoded payload beneath it.

---

### LL-12 — Machine reasoning cannot rescue a hollow model

No model can warn that a deadline is at risk if deadlines are not attached to matters. AI amplifies a data model; it does not substitute for one. This is the decisive lesson for anyone proposing to add intelligence to a legacy system.

**Instance (CS-001).** Every high-value opportunity identified in the subject was blocked behind the same missing entities.

---

## Evidence

All lessons in v1.0 are evidenced by **CS-001**, registered in the [case study register](../LREF-01/README.md#case-study-register).

*The Lesson Library is a controlled document. Structural changes require board approval (LREF-01 §14).*
