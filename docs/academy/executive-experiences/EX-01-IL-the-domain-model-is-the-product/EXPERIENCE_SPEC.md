# EXPERIENCE_SPEC — EX-01-IL

# The Domain Model Is the Product

### Israeli multi-practice variant · מודל התחום הוא המוצר

**Executive Experience. Production specification. Version 1.0.**

| | |
| --- | --- |
| **Code** | EX-01-IL |
| **Parent** | [EX-01](../EX-01-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) — same thesis, same spine, localised instances |
| **Duration** | 90 minutes |
| **Format** | Facilitated, in-room or remote, 6–24 participants |
| **Delivery language** | Hebrew (learner-facing artifacts). English (spec and facilitator guide) |
| **Canonical module** | M2 — *The domain model is the product* (4 h, student format) |
| **Core question** | Which absent field breaks which promise? |
| **Status** | Complete — all four artifacts present |

---

## 1. Thesis

Unchanged from EX-01. The thesis is not localised:

> **A system is defined by its entities and their relationships, not by its screens. Every screen-level failure is a domain-model failure wearing a costume.**
>
> מערכת מוגדרת על ידי הישויות שלה והקשרים ביניהן, ולא על ידי המסכים שלה. כל כשל ברמת המסך הוא כשל של מודל התחום בתחפושת.

## 2. Audience

Partners and managers at an **Israeli multi-practice firm** who commission, fund or approve software — whether purchased from a vendor or built in-house. Practice areas assumed: ליטיגציה, משפחה וירושה, מקרקעין, מסחרי וחוזים, הוצאה לפועל, מיסוי מקרקעין.

No technical background is assumed. No participant reads code.

The variant targets the failure mode specific to this firm shape: evaluating a system against **one matter in one forum**, when the firm's actual working unit is one client holding several matters across several forums at once.

## 3. What changes from EX-01

Three adaptations. The principles, production rules and gates are unchanged; only the instances are localised.

| # | Adaptation | Weight | Canonical anchor |
| --- | --- | --- | --- |
| **A1** | The absence audit becomes a **forum-identity audit** — can one matter hold a נט המשפט number, a תיק הוצל"פ number and a מיסוי מקרקעין reference at once? | **Supporting** | LL-01, and **EM-5** — every date states its authority |
| **A2** | Silent exclusion becomes **bilingual vocabulary drift** — the dashboard filters on Latin-script values while half the firm types Hebrew | **Core** | LL-03, EM-2, challenge **C6**, architecture discussion **AD9** — RTL is a data-layer concern, not a CSS concern |
| **A3** | The orphan defect becomes **client-attached versus matter-attached** — the deadline *is* attached, to a client holding four matters, and appears on none of them | **Core** | **EM-1** — everything dated belongs to a matter — and **EM-3** — every role is contextual, per matter, not global |

A2 and A3 carry the experience. A1 is condensed to a supporting segment that primes them.

## 4. Objectives

| # | Objective |
| --- | --- |
| **O1** | Participants can trace a stated business promise to the entity and relationship required to satisfy it |
| **O2** | Participants recognise that an untraceable promise is decoration, and can say so in a vendor evaluation |
| **O3** | Participants can identify silent exclusion, and understand that bilingual data entry makes it routine rather than exceptional |
| **O4** | Participants understand that attachment to a *client* is not attachment to a *matter*, and why the difference only surfaces at multi-practice scale |
| **O5** | Participants leave with one question they will ask of their own systems |

## 5. Learning outcomes

On completion a participant can:

- Perform a **promise trace**: objective → required entity → required relationship → satisfied / unsatisfiable *(LL-02)*
- Perform a **forum audit**: attempt to express one dispute across its several forums, and treat what fails as the definition of the system *(LL-01)*
- Explain why an uncontrolled status column is a permanent decision to forgo aggregation — and why a bilingual firm reaches that failure faster *(LL-03, AD9)*
- State the three modelling rules the experience establishes: **everything dated belongs to a matter** *(EM-1)*, **every classification is a controlled vocabulary** *(EM-2)*, **every date states its authority** *(EM-5)*

## 6. Flow

Spine unchanged from EX-01 — **D2 → D1 → D9** under the standing run protocol: *set up silently, let participants predict aloud, reveal, then name the principle.* The weighting is redistributed toward A3 and A2.

| # | Segment | Min | Adaptation | Canonical source |
| --- | --- | --- | --- | --- |
| **1** | **Opening wager.** Three questions a competent system should answer instantly. Written, not discussed | 5 | — | E1 framing, LL-01 |
| **2** | **The forum audit.** In pairs, attempt five facts spanning the firm's forums | 10 | **A1** | **E1**, condensed |
| **3** | **D2-IL — the deadline that belongs to a client.** Create a court deadline against a client holding four matters. Open each in turn | 12 | **A3 · core** | **D2**, EM-1, EM-3 |
| **4** | **Promise tracing.** Four objectives — **supplied by the firm** — traced to entity and relationship | 18 | — | **E2**, LL-02 |
| **5** | **D1-IL — the report that is quietly wrong.** A matter whose status was typed `בטיפול` disappears from a dashboard filtering on Latin values | 15 | **A2 · core** | **D1**, LL-03, EM-2, AD9 |
| **6** | **D9 — the column that fell out.** Prototype beside shipped screen; the forum-status column is absent | 8 | — | **D9**, LL-08, LL-09 |
| **7** | **Convergence.** The three failures are named as one. The thesis is stated for the first time | 12 | — | Phase 9 curriculum thesis |
| **8** | **The question you take back.** One promise-trace question, applied to a system the participant owns | 10 | — | O5 |

**Total: 90 minutes.**

Segments 3 and 5 hold the extra minutes because they carry the experience. Segment 2 is condensed from EX-01's 15 minutes to 10 and is facilitator-paced.

### On segment 4

**The four objectives are not supplied by this specification.** In EX-01 they are quoted from the subject's stated vision. Here the firm supplies its own — from its current vendor's claims, its internal tool's requirements, or a live procurement — and they are traced in the room.

This keeps the no-invention rule intact and makes the segment sharper than any pre-written set. The worksheet ships with four empty slots and the gate that governs them. **The facilitator collects the four objectives at least a week before delivery**; arriving without them costs the segment.

## 7. Production rules

**Binding. Unchanged from EX-01.**

| # | Rule |
| --- | --- |
| **P1** | **Predict before reveal.** No demonstration runs without participants first committing to the expected outcome |
| **P2** | **The thesis is withheld until segment 7.** No facilitator states it in segments 1–6. The reveal panel in `EXPERIENCE.html` stays collapsed until then |
| **P3** | **No code is shown.** Every demonstration is performed at the interface |
| **P4** | **Synthetic data only.** A local instance carrying the supplied synthetic dataset. Never a production system, never real client data |
| **P5** | **The subject is evidence, not a defendant.** Participants who recognise their own systems in it are the point |
| **P6** | **No demonstration is claimed that has not been rehearsed** against the actual instance being used that day |

### P6 in this variant

Rehearsal carries two extra checks that do not exist in EX-01, both capable of silently killing a core segment:

1. **The drift values must actually drift.** If the instance's recognised status set already accepts Hebrew values, D1-IL does not fire. Confirm the recognised set and adjust the dataset to sit outside it.
2. **The Hebrew must render.** Confirm the CSV imports without mojibake and that the instance displays Hebrew status values correctly in both the matter list and the dashboard filter. A dashboard that shows `×‘×˜×™×¤×•×œ` teaches the wrong lesson — it looks like an encoding bug rather than an exclusion.

P4 restates the [Demonstration Library safety protocol](../../demonstration-library/README.md#safety-protocol), binding and not relaxable without board approval (LREF-01 §14). EX-01-IL uses no trust-boundary demonstration; the local-instance constraint applies in full regardless.

## 8. Quality gates

**Unchanged from EX-01.** A delivery is complete when all six pass; gates are checked by the facilitator against the session record. Any gate can fail a session.

| # | Gate |
| --- | --- |
| **G1** | Every participant produced a written prediction before each of the three demonstrations. A session in which predictions were skipped has not run EX-01-IL |
| **G2** | The promise-trace worksheet was completed for all four firm-supplied objectives, and at least one was marked *unsatisfiable with a named structural cause*. A verdict without a named missing structure fails |
| **G3** | The thesis was stated at segment 7 and not before |
| **G4** | Each participant left with one written question in promise-trace form, applied to a system they own |
| **G5** | All three demonstrations were performed live. A session that described a demonstration instead of performing it fails |
| **G6** | No real client data appeared at any point |

G2 is inherited from the LREF-01 S2 quality gate: *a promise marked unbuildable without a named structural cause fails.*

## 9. Artifacts

| Artifact | Language | Status |
| --- | --- | --- |
| `EXPERIENCE_SPEC.md` | English | This document |
| [`EXPERIENCE.html`](./EXPERIENCE.html) | **Hebrew, RTL** | Learner-facing production artifact |
| [`FACILITATOR_GUIDE.md`](./FACILITATOR_GUIDE.md) | English, with Hebrew glosses | Delivery guide |
| [`EXPERIENCE_ASSETS/`](./EXPERIENCE_ASSETS/) | **Hebrew** (worksheets, cards) | Worksheets, demonstration cards, synthetic dataset |

## 10. Provenance

EX-01-IL introduces no new findings, principles or objectives. Every claim traces to an existing canonical asset:

| Element | Source |
| --- | --- |
| Thesis | Phase 9 curriculum thesis |
| Module frame, core question, duration | M2 — *The domain model is the product* |
| Demonstrations D2, D1, D9 and the run protocol | [Demonstration Library](../../demonstration-library/README.md) |
| Segments 2 and 4 | Exercises E1 and E2 |
| LL-01, LL-02, LL-03, LL-08, LL-09 | [Lesson Library](../../libraries/Lesson-Library.md) |
| EM-1, EM-2, EM-3, EM-5 | [Pattern Library](../../libraries/Pattern-Library.md#the-seven-modelling-rules) |
| Bilingual amplification (A2) | Challenge **C6**; architecture discussion **AD9** |
| Gate G2 | LREF-01 §S2 quality gate |
| Discussion prompts | Phase 9 §9.6 questions 4, 5 and 16 |
| Structure, rules P1–P6, gates G1–G6 | [EX-01](../EX-01-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) |

**Localisation record.** Adaptations A1–A3 change the *instances* in which the canonical principles are demonstrated. No principle was altered, added or weakened. The four promise-trace objectives are supplied by the client firm rather than by this specification, for the reason given in §6.

**Evidence base.** All demonstrations derive from **CS-001**, registered in the [case study register](../../LREF-01/README.md#case-study-register). Israeli forum names, practice areas and statutory references describe the *delivery context*, not the subject.

---

*EX-01-IL is a controlled production asset. Production rules P1–P6 and gates G1–G6 may not be relaxed without board approval.*
