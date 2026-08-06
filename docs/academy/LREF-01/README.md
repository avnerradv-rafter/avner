# LREF-01 — LegalTech Reverse Engineering Framework

**Standing Academy methodology. Permanent asset. Version 1.0.**

LREF-01 defines how the Academy extracts durable intellectual property from an existing LegalTech product. It exists so that successive analyses are **comparable** and therefore **cumulative** — an analysis that invents its own structure produces an essay; an analysis that instantiates a common structure produces a data point in a growing corpus.

> **Standing rule.** Future analyses **instantiate** this methodology. They do not redefine it. Where a subject demands a deviation, the deviation is declared in the case study's front matter and raised as an amendment under §14 — never absorbed silently.

## Contents

| Document | Purpose |
| --- | --- |
| [`LREF-01-Methodology.md`](./LREF-01-Methodology.md) | **The framework.** Nine stages, 25 instruments, 16 quality gates, IP protocol, instantiation contract, worksheets, prompt library |
| [`../libraries/`](../libraries/README.md) | **The standing libraries.** Pattern Library, Lesson Library, Instrument Library — the accumulating asset |
| [`../demonstration-library/`](../demonstration-library/README.md) | **The Demonstration Library.** Ten reproducible demonstrations in which a structural defect is felt rather than described. Carries a binding safety protocol |
| [`../executive-experiences/`](../executive-experiences/README.md) | **Executive Experiences.** Production assets — each a spec, a learner-facing artifact, a facilitator guide and its supporting assets. EX-01 delivered |
| This file | Register, case-study index, and how to start a study |

## The nine stages

| # | Stage | Produces |
| --- | --- | --- |
| S1 | **Discovery** | Promise Register · role model · maturity verdict |
| S2 | **Domain extraction** | Entity inventory · absence audit · phantom census |
| S3 | **Workflow extraction** | Flows with breakdown points · absent-workflow table |
| S4 | **UX analysis** | Screen inventory · decision-support audit · scorecard |
| S5 | **AI opportunity mapping** | Opportunity register · agent tiers · guardrails · waves |
| S6 | **Gap analysis** | KEEP / IMPROVE / REPLACE / REMOVE / NEW · integration thesis |
| S7 | **Product redesign** | Target-state design · core-versus-edge architecture |
| S8 | **Academy lesson extraction** | Modules · lessons · exercises · demonstrations · challenges |
| S9 | **Rafter OS opportunity extraction** | Promoted patterns · defensibility · prioritised backlog |

## Case study register

| ID | Subject | Tier | LREF version | Status | Location |
| --- | --- | --- | --- | --- | --- |
| **CS-001** | CaseAce Law Firm Management System | T2 | 1.0 (retrospective) | Complete | [`../../product-archaeology/CaseAce-Product-Archaeology.md`](../../product-archaeology/CaseAce-Product-Archaeology.md) |

**CS-001 note.** The CaseAce study was conducted before LREF-01 was formalised, and LREF-01 was abstracted *from* it. It conforms in substance; its phase numbering differs from the stage numbering. See Appendix D of the methodology for the concordance. It is not required to be renumbered or relocated.

**Recommended relocation (optional, at next housekeeping):** move CS-001 to `docs/academy/case-studies/CS-001-CaseAce.md` so that all case studies sit under one root. Deferred here to avoid churning a published artifact.

## Standing libraries

Studies feed three libraries that outlive any one analysis. These are the accumulating asset; case studies are their output.

| Library | Location | Fed by | Accumulation rule |
| --- | --- | --- | --- |
| **Pattern Library** | [`../libraries/Pattern-Library.md`](../libraries/Pattern-Library.md) | S9, eight fixed categories | Observed in two subjects → *confirmed*. Contradicted → *contested*, annotated with conditions |
| **Lesson Library** | [`../libraries/Lesson-Library.md`](../libraries/Lesson-Library.md) | S8 | Recurrence across independent subjects raises confidence — the strongest evidence a failure is structural, not incidental |
| **Instrument Library** | [§8 of the methodology](./LREF-01-Methodology.md#8-the-instrument-library) | §8, plus amendments | Retained while productive; retired after three barren studies |

The libraries are **instantiated at v1.0** from CS-001. They are the design authority: a builder should be able to work from them without reading any case study.

**Synthesis cadence.** After every third case study, a synthesis pass reconciles the libraries and updates the reference model S6 compares against. Without it, the libraries grow without converging.

## Starting a study

1. Score the subject against the selection criteria (§2.2). **Intent evidence** — specifications, diagrams, prototypes — is weighted highest, because the intent/build delta is the richest seam available.
2. Declare the tier: **T1** reconnaissance (0.5–1 day), **T2** standard (3–5 days, default), **T3** deep (2–3 weeks).
3. **Clear the licence position (§6). This is gating** — no substantive work proceeds until it is determined and recorded.
4. Copy the instantiation checklist (Appendix A) into a new case study at `docs/academy/case-studies/CS-NNN-<subject>.md`.
5. Complete the front matter (§9.3), including the evidence base and licence position.
6. Work the nine stages. Collect evidence verbatim and in parallel; synthesise once, centrally.
7. Pass all 16 quality gates (§10). Write the executive summary last.
8. Run the anti-pattern self-check (§11).
9. Promote patterns and lessons to the [standing libraries](../libraries/README.md), assigning patterns to the eight fixed categories. Raise any deviations as §14 amendments.

## The six doctrines

The compressed method, for reference:

1. **Mine decisions, not implementations** — a finding that evaporates on rewrite is not a finding.
2. **Absence is evidence** — what a system cannot represent defines it.
3. **Defects are specifications in disguise** — structural failure marks where the successor earns value.
4. **Intent and build are separate objects** — the delta between them is the highest-yield seam.
5. **Judge ideas and execution independently** — they are uncorrelated.
6. **Every claim carries its evidence** — inferences labelled, assumptions declared.

## Non-negotiables

- **Never contribute to the subject.** It is evidence, not a client. No pull requests, no issues, no modifications.
- **Ideas, not expression.** Every promoted pattern must require independent re-implementation (§6.3).
- **Never ship leverage before safety.** No capability generating consequential output is recommended ahead of the audit, verification and authorization substrate it depends on (S5).
- **Zero KEEP items means the study failed** — not the subject.

---

*LREF-01 is a controlled document. Structural and doctrinal changes require board approval (§14).*
