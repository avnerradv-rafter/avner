# EXPERIENCE_SPEC — EX-01

# The Domain Model Is the Product

**Executive Experience. Production specification. Version 1.0.**

| | |
| --- | --- |
| **Code** | EX-01 |
| **Duration** | 90 minutes |
| **Format** | Facilitated, in-room or remote, 6–24 participants |
| **Canonical module** | M2 — *The domain model is the product* (4 h, student format) |
| **Core question** | Which absent field breaks which promise? |
| **Status** | Complete — all four artifacts present |

---

## 1. Thesis

The experience delivers one claim, which is the curriculum's stated meta-lesson:

> **A system is defined by its entities and their relationships, not by its screens. Every screen-level failure is a domain-model failure wearing a costume.**

Everything in the ninety minutes exists to make that claim land as a felt conclusion rather than an asserted one.

## 2. Audience

Executives who commission, fund or approve software: managing partners, practice heads, operations directors, and the people who sign off on roadmaps. **No technical background is assumed or required.** No participant reads code at any point.

The experience is designed for the specific failure mode of this audience: approving a roadmap of screens and features while the structural defect that makes those features unbuildable goes unnamed in the room.

## 3. Objectives

| # | Objective |
| --- | --- |
| **O1** | Participants can trace a stated business promise to the entity and relationship required to satisfy it |
| **O2** | Participants recognise that an untraceable promise is decoration, and can say so in a roadmap review |
| **O3** | Participants can identify silent exclusion — the failure that produces plausible numbers rather than visible errors |
| **O4** | Participants understand that a missing interface feature and a missing model join are frequently one defect, not two |
| **O5** | Participants leave with one question they will ask of their own systems |

## 4. Learning outcomes

On completion a participant can:

- Perform a **promise trace** on any system: objective → required entity → required relationship → satisfied / unsatisfiable *(LL-02)*
- Perform an **absence audit**: attempt five domain-typical facts, and treat what fails as the definition of the system *(LL-01)*
- Explain why uncontrolled vocabulary is a permanent decision to forgo aggregation, not a shortcut deferred *(LL-03)*
- Explain why navigation organised by table rather than by domain object indicates a model that lacks the joins users need *(LL-08)*
- State the two modelling rules the experience establishes: **everything dated belongs to a matter** *(EM-1)*, and **every classification is a controlled vocabulary** *(EM-2)*

## 5. Flow

The spine is the Demonstration Library's first session ordering — **D2 → D1 → D9** — under its standing run protocol: *set up silently, let participants predict aloud, reveal, then name the principle.* The prediction step is not optional; it is the mechanism.

| # | Segment | Minutes | Canonical source |
| --- | --- | --- | --- |
| **1** | **Opening wager.** Participants commit in writing to what a competent system should be able to answer. No discussion | 5 | Absence audit framing *(E1, LL-01)* |
| **2** | **The absence audit.** In pairs, attempt five domain-typical facts against the subject. Record what fails | 15 | **E1** — the absence audit *(90 min student form, condensed)* |
| **3** | **D2 — the orphan defect.** Create a task carrying a deadline; open the matter it belongs to. It is nowhere | 10 | **D2**, EM-1, LL-08 |
| **4** | **Promise tracing.** Take four stated objectives. For each, name the entity and relationship required. Mark satisfied or unsatisfiable | 20 | **E2** — promise tracing *(60 min student form, condensed)* |
| **5** | **D1 — silent exclusion.** Create a record with a status outside the expected set; open the dashboard. It has vanished from reporting | 10 | **D1**, EM-2, LL-03 |
| **6** | **D9 — the regression.** Compare the design prototype against what shipped. The activity column is absent, because nothing joined activity to the matter | 10 | **D9**, LL-08, LL-09 |
| **7** | **Convergence.** The three demonstrations are named as one defect. The meta-lesson is stated for the first time | 10 | Phase 9 curriculum thesis |
| **8** | **The question you take back.** Each participant writes the single promise-trace question they will ask of their own system | 10 | O5 |

**Total: 90 minutes.**

The meta-lesson is withheld until segment 7. Stating it earlier converts the experience into a lecture and forfeits the prediction mechanism.

## 6. Production rules

**Binding on any delivery of EX-01.**

| # | Rule |
| --- | --- |
| **P1** | **Predict before reveal.** No demonstration is performed without participants first committing aloud or in writing to the expected outcome |
| **P2** | **The thesis is withheld until segment 7.** No facilitator states the meta-lesson in segments 1–6 |
| **P3** | **No code is shown.** The audience is executive; every demonstration is performed at the interface |
| **P4** | **Synthetic data only.** Demonstrations run against a local instance carrying the supplied synthetic dataset. Never a production system, never real client data |
| **P5** | **The subject is evidence, not a defendant.** The subject system is analysed, never mocked. Participants who recognise their own systems in it are the point |
| **P6** | **No demonstration is claimed that has not been rehearsed** against the actual instance being used that day |

Rule P4 restates the Demonstration Library safety protocol, which is binding and may not be relaxed without board approval (LREF-01 §14). EX-01 uses no trust-boundary demonstration, so the local-instance constraint is the only element that applies — but it applies fully.

## 7. Quality gates

A delivery of EX-01 is complete when all gates pass. Gates are checked by the facilitator against the record of the session.

| # | Gate |
| --- | --- |
| **G1** | Every participant produced a written prediction before each of the three demonstrations. A session in which predictions were skipped has not run EX-01 |
| **G2** | The promise-trace worksheet was completed for all four objectives, and at least one was marked *unsatisfiable with a named structural cause*. A promise marked unsatisfiable without naming the missing entity fails the gate |
| **G3** | The meta-lesson was stated at segment 7 and not before |
| **G4** | Each participant left with one written question in the promise-trace form, applied to a system they own |
| **G5** | All three demonstrations were performed live. A session that described a demonstration instead of performing it fails the gate |
| **G6** | No real client data appeared at any point |

Gate G2 is inherited from the LREF-01 S2 quality gate: *a promise marked unbuildable without a named structural cause fails.*

## 8. Artifacts

| Artifact | Status |
| --- | --- |
| `EXPERIENCE_SPEC.md` | This document |
| [`EXPERIENCE.html`](./EXPERIENCE.html) | Learner-facing production artifact |
| [`FACILITATOR_GUIDE.md`](./FACILITATOR_GUIDE.md) | Delivery guide — timing, transitions, misconceptions, recovery |
| [`EXPERIENCE_ASSETS/`](./EXPERIENCE_ASSETS/) | Worksheets, demonstration cards, synthetic dataset |

## 9. Provenance

EX-01 introduces no new findings. Every claim it makes is drawn from an existing canonical asset:

| Element | Source |
| --- | --- |
| Meta-lesson | Phase 9 curriculum thesis |
| Module frame, core question, duration | M2 — *The domain model is the product* |
| Demonstrations D2, D1, D9 and the run protocol | [Demonstration Library](../../demonstration-library/README.md) |
| Segments 2 and 4 | Exercises E1 and E2 |
| LL-01, LL-02, LL-03, LL-08, LL-09 | [Lesson Library](../../libraries/Lesson-Library.md) |
| EM-1, EM-2 | [Pattern Library](../../libraries/Pattern-Library.md#the-seven-modelling-rules) — the seven modelling rules |
| Gate G2 | LREF-01 §S2 quality gate |
| Discussion prompts | Phase 9 §9.6 questions 4, 5 and 16 |

Where the student format specified a longer duration, the executive format condenses it; the condensation is recorded in the flow table above. No content was added.

**Evidence base.** All demonstrations derive from **CS-001**, registered in the [case study register](../../LREF-01/README.md#case-study-register).

---

*EX-01 is a controlled production asset. Production rules P1–P6 and gates G1–G6 may not be relaxed without board approval.*
