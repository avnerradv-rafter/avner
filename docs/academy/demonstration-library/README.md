# Demonstration Library

**Standing Academy asset. Permanent. Version 1.0.**

Ten reproducible demonstrations in which a structural defect is **felt rather than described**. Each is a short sequence a facilitator performs live; the failure appears on screen, and the principle lands before it is named.

A demonstration is not a slide. Its value is the gap between what a participant expects and what the system does — so the sequence is performed, the reaction is allowed to happen, and only then is the principle stated.

---

## Safety protocol

**Binding. Read before running D3 or D10.**

> **D3 and D10 are performed only against a local instance populated with synthetic data**, and are framed as **defensive-security education**. Their purpose is to teach architectural reasoning about trust boundaries.
>
> **Never exercise these techniques against a system you do not own.** No demonstration in this library is performed against a production system, a third-party system, or any system holding real client data.

The wider constraint applies to every demonstration: the Academy analyses systems as evidence and never contributes to, modifies, or probes a subject it does not control.

---

## How to run one

1. **Set up** the precondition without commentary.
2. **Perform** the sequence and let participants predict the outcome aloud.
3. **Reveal** the actual behaviour.
4. **Name** the principle, then link it to its pattern and lesson.

Step 2 is the demonstration. Skipping the prediction turns it into a lecture and forfeits most of the teaching value.

---

## The demonstrations

### D1 — Free text destroys analytics, silently

| | |
| --- | --- |
| **Sequence** | Create a matter with a status value outside the set the reporting layer expects — e.g. `In Review`. Open the dashboard |
| **Reveals** | The record vanishes from reporting. No error, no warning, no indication that anything was excluded |
| **Principle** | Uncontrolled vocabulary is a decision to forgo aggregation permanently. The failure mode is *silent exclusion*, which produces plausible numbers rather than visible errors |
| **Teaches** | [LL-03](../libraries/Lesson-Library.md#ll-03--free-text-is-a-decision-to-have-no-data) · [BP-5](../libraries/Pattern-Library.md#1-business-patterns) · [EM-2](../libraries/Pattern-Library.md#the-seven-modelling-rules) |

### D2 — The orphan defect, felt rather than described

| | |
| --- | --- |
| **Sequence** | Create a task carrying a deadline. Open the matter it logically belongs to |
| **Reveals** | The task is nowhere. The deadline exists in the system and is invisible from the file it concerns |
| **Principle** | Everything dated belongs to a matter. An unanchored deadline breaks every promise that depends on it |
| **Teaches** | [EM-1](../libraries/Pattern-Library.md#the-seven-modelling-rules) · [LL-08](../libraries/Lesson-Library.md#ll-08--the-interface-reifies-the-data-model) |

### D3 — Client-side authorization is theatre

| | |
| --- | --- |
| **Sequence** | **Local instance, synthetic data only.** Change the stored role value in browser storage. Reload |
| **Reveals** | The interface promotes you |
| **Principle** | A role string held by the client is not access control. The security boundary is wherever the server is |
| **Teaches** | [LL-06](../libraries/Lesson-Library.md#ll-06--the-security-boundary-is-wherever-the-server-is) · [SEC-1](../libraries/Pattern-Library.md#8-security-and-governance) · [ROLE-1](../libraries/Pattern-Library.md#7-role-model) |

> Run this as defensive-security education. The lesson is *where enforcement must live*, not how to escalate privilege.

### D4 — A fork's inherited assumption, failing in production

| | |
| --- | --- |
| **Sequence** | Open the analytics chart belonging to a module that was created by forking another |
| **Reveals** | Permanent zero. The chart filters on a status the forked entity can never hold |
| **Principle** | A near-perfect rename passes review because it looks correct. The inherited assumption stays invisible until the semantics diverge |
| **Teaches** | [LL-04](../libraries/Lesson-Library.md#ll-04--fork-and-rename-is-worse-than-copy-paste) |

### D5 — No conflict detection

| | |
| --- | --- |
| **Sequence** | Book two appointments at the same time with the same attendee |
| **Reveals** | Both are accepted |
| **Principle** | A calendar that cannot detect collision is a list of intentions. Hard, consequential commitments need a different type from soft, movable ones |
| **Teaches** | [Entity model §4](../libraries/Pattern-Library.md#4-entity-model) |

### D6 — State that should invalidate, and doesn't

| | |
| --- | --- |
| **Sequence** | Accept an appointment. Have the creator move it a week. Re-examine your response state |
| **Reveals** | You remain "accepted" for a meeting you never saw |
| **Principle** | A material change to an object must invalidate the responses predicated on its prior state. Per-participant response state is a lifecycle, not a flag |
| **Teaches** | [EM-4](../libraries/Pattern-Library.md#the-seven-modelling-rules) · [WF-2](../libraries/Pattern-Library.md#3-workflow-patterns) |

### D7 — A notification system with no warnings

| | |
| --- | --- |
| **Sequence** | Read every notification in the feed. Now determine what is due tomorrow |
| **Reveals** | Impossible. The feed reports what has happened and never what is about to |
| **Principle** | Retrospective notification is not attention management. Order by consequence if ignored, never by recency |
| **Teaches** | [UX-9](../libraries/Pattern-Library.md#2-ux-patterns) · [DB-2](../libraries/Pattern-Library.md#5-dashboard-concepts) |

### D8 — Deletion as lifecycle

| | |
| --- | --- |
| **Sequence** | Attempt to close a matter |
| **Reveals** | The only available option is deletion |
| **Principle** | Where closure cannot be represented, closure is expressed as deletion. In a regulated practice that converts routine operation into evidence destruction |
| **Teaches** | [LL-05](../libraries/Lesson-Library.md#ll-05--deletion-is-not-a-lifecycle) · [EM-7](../libraries/Pattern-Library.md#the-seven-modelling-rules) · [SEC-4](../libraries/Pattern-Library.md#8-security-and-governance) · [Matter lifecycle](../libraries/Pattern-Library.md#matter-lifecycle) |

### D9 — Design regression caused by a modelling gap

| | |
| --- | --- |
| **Sequence** | Compare the design prototype of the matter grid against the shipped table |
| **Reveals** | The "upcoming activity" column is absent — it could not be populated, because nothing joined activity to the matter |
| **Principle** | Interface features disappear where the model cannot feed them. The UX regression and the modelling gap are one defect |
| **Teaches** | [LL-08](../libraries/Lesson-Library.md#ll-08--the-interface-reifies-the-data-model) · [LL-09](../libraries/Lesson-Library.md#ll-09--requirements-degrade-predictably-under-implementation-pressure) |

### D10 — The confidentiality boundary, breached

| | |
| --- | --- |
| **Sequence** | **Local instance, synthetic data only.** Open a document preview and inspect where the content is actually rendered |
| **Reveals** | An external, public third-party service |
| **Principle** | Privileged content must never render, transit or be processed outside the trust boundary. For legally privileged material this is not a preference |
| **Teaches** | [SEC-6](../libraries/Pattern-Library.md#8-security-and-governance) · [SEC-3](../libraries/Pattern-Library.md#8-security-and-governance) |

> Run this as defensive-security education, using documents that contain nothing real.

---

## Sequencing

The demonstrations are independent, but three orderings work particularly well:

| Session | Order | Arc |
| --- | --- | --- |
| **The domain model is the product** | D2 → D1 → D9 | An absent join, its silent analytic consequence, and the interface feature it killed |
| **Lifecycle and memory** | D8 → D6 → D5 | Nothing can end, nothing invalidates, nothing collides |
| **Trust boundaries** | D3 → D10 | Enforcement in the wrong place, then confidentiality in the wrong place |

D7 and D4 stand alone and work well as openers — both produce their reaction within seconds.

---

## Coverage

Every demonstration discharges at least one Lesson Library entry. The lessons not yet covered by a live demonstration are **LL-01**, **LL-02**, **LL-07**, **LL-10**, **LL-11** and **LL-12** — these are currently taught through analysis rather than demonstration. A future study that produces a runnable instance of any of them should promote it here.

## Evidence

All demonstrations in v1.0 derive from **CS-001**, registered in the [case study register](../LREF-01/README.md#case-study-register). Each is reproducible against that subject's local instance; the principles are general.

---

*The Demonstration Library is a controlled document. The safety protocol may not be relaxed without board approval (LREF-01 §14).*
