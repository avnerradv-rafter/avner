# FACILITATOR_GUIDE — EX-01

# The Domain Model Is the Product

**Delivery guide. Version 1.0.** Read with [`EXPERIENCE_SPEC.md`](./EXPERIENCE_SPEC.md).

---

## Before the room

| # | Preparation | Non-negotiable? |
| --- | --- | --- |
| 1 | Local instance running, loaded with [`synthetic-matters.csv`](./EXPERIENCE_ASSETS/synthetic-matters.csv) | **Yes** — production rule P4 |
| 2 | All three demonstrations rehearsed **against today's instance**, not a remembered one | **Yes** — P6 |
| 3 | Worksheets printed or shared: [absence audit](./EXPERIENCE_ASSETS/worksheet-absence-audit.md), [promise trace](./EXPERIENCE_ASSETS/worksheet-promise-trace.md) | Yes |
| 4 | [Demonstration cards](./EXPERIENCE_ASSETS/cards-demonstrations.md) to hand — you will not remember exact sequences under pressure | Recommended |
| 5 | Screen mirrored and legible from the back of the room | Yes |

**The one thing that ruins this experience** is a demonstration that does not fire. You lose the prediction mechanism, and with it the whole design. Rehearse the same morning.

---

## The mechanism

Everything rests on one move, repeated three times:

> **Set up silently → participants commit to a prediction → reveal → name the principle.**

Participants must be *wrong out loud* before they are told anything. An executive who has just publicly predicted that the task will appear on the matter, and then watched it not appear, has learned something no slide can teach them. Skip the prediction and you have delivered a talk.

Guard the prediction step against your own instinct to explain. The urge to narrate while setting up is strong and it is fatal.

---

## Running the ninety minutes

### Segment 1 — Opening wager · 5 min

Ask, without preamble:

> *"Write down three questions a competent system for your practice should be able to answer instantly. Don't discuss them."*

Collect nothing. They will use these in segment 8.

**Transition:** *"Hold those. We're going to look at a system built by people who were trying to answer exactly that kind of question."*

### Segment 2 — The absence audit · 15 min

Pairs. Hand out the absence-audit worksheet. Five domain-typical facts; attempt to express each in the subject.

Circulate. Do not help. When a pair says *"it just isn't there"* — that is the finding, and your only reply is *"write it down."*

**Watch for:** pairs who start designing fixes. Redirect — *"not yet, just record what fails."*

**Transition:** *"You've each found things it can't say. Now I want to show you one of them happening."*

### Segment 3 — D2, the orphan defect · 10 min

Set up in silence. Create a task carrying a deadline.

Then ask, before you click:

> *"I'm about to open the matter this deadline belongs to. What will I see?"*

Take three answers aloud. Everyone predicts the task appears.

Open the matter. **It is nowhere.**

Let the silence sit. Do not fill it. Then:

> *"The deadline exists. The system knows about it. And it is invisible from the file it concerns."*

Name **EM-1 — everything dated belongs to a matter.** Do not go further. The thesis stays withheld.

### Segment 4 — Promise tracing · 20 min

The analytical core, and the segment most likely to overrun. Four stated objectives; for each, name the entity and relationship required, then mark *satisfied* or *unsatisfiable*.

**Enforce the gate as you circulate:** a promise marked unsatisfiable must name the missing structure. *"Unsatisfiable because it's badly built"* fails. *"Unsatisfiable because no hearing entity exists"* passes.

**Timebox hard at 20 minutes.** Groups will want longer. Cut it — segment 7 is where the payoff lands, and it must not be compressed.

**Transition:** *"You've found promises with nothing underneath them. Here's what that costs on a Tuesday morning."*

### Segment 5 — D1, silent exclusion · 10 min

Create a matter with the status `In Review` — a value outside the three the dashboard expects. Then ask:

> *"How many matters will the dashboard show?"*

They will say *n+1*. Open the dashboard: it shows *n*.

The crucial beat, and the one facilitators miss:

> *"There is no error. No warning. Nothing turned red. The number is simply wrong, and it looks completely fine."*

Name **LL-03** and **EM-2**. This is the segment executives remember longest, because it is the one that maps onto reports they have personally signed off.

### Segment 6 — D9, the regression · 10 min

Prototype beside shipped table. Ask what is missing before revealing.

The activity column is absent. It could not be populated — nothing joined activity to the matter.

> *"Nobody decided to remove this. It fell out, because there was nothing to fill it with."*

### Segment 7 — Convergence · 10 min

**The payoff. Do not rush and do not shorten it.**

Put the three demonstrations up together and ask the room what they have in common. Let them reach it. Someone usually does.

Then state the thesis, for the first time in ninety minutes:

> **A system is defined by its entities and their relationships, not by its screens. Every screen-level failure you saw today is a domain-model failure wearing a costume.**

Then, one line each:
- The missing task was a missing **relationship** *(EM-1)*
- The wrong dashboard number was a missing **vocabulary** *(EM-2)*
- The missing column was the **same missing relationship**, surfacing somewhere else

### Segment 8 — The question you take back · 10 min

Return to segment 1. Each participant converts one of their three questions into promise-trace form:

> *"Which entity and which relationship does this depend on — and do we have them?"*

Ask two or three to read theirs aloud. Close there. **Do not summarise.** The last thing said in the room should be a participant's question about their own system, not your recap.

---

## Expected misconceptions

Each of these will surface. Each has a recovery grounded in the canonical material.

| # | What they say | Why it's wrong | Recovery |
| --- | --- | --- | --- |
| **M1** | *"This was just badly built."* | The design was better than the build. The role model was properly specified and degraded into scattered conditionals under delivery pressure. This is the normal failure, not an incompetent one | *"Their design documents got this right. It degraded on the way to production — which is what makes it worth your ninety minutes. Competent teams produce this."* **LL-09** |
| **M2** | *"Our QA would catch it."* | D1 produces no error. There is nothing for QA to catch — the output is plausible and wrong | *"What would the test assert? The dashboard returned a number. It's the right number for the query it ran."* **LL-03** |
| **M3** | *"That's a UI problem — just fix the screen."* | The column could not be populated. The UX defect and the modelling defect are one defect | *"Where would the screen get the data? That's the whole finding."* **LL-08** |
| **M4** | *"Add the field in the next release."* | Unenforced relationships are the first casualty, and retrofitting enforcement means rewriting everything built on top | *"Name the screens, queries and workflows that change when you add it. That list is the real cost."* **LL-09, exercise E4** |
| **M5** | *"Free text gives us flexibility."* | It is a permanent decision to forgo aggregation, automation and retrieval | *"Flexibility for whoever types it. What does the partner reading the report on Friday get?"* **LL-03** |
| **M6** | *"Our vendor handles all this."* | A promise without an entity is marketing, whoever makes it | *"Good — then ask them which entity satisfies it. That's a fair question and it has a real answer."* **LL-02** |
| **M7** | *"AI will sort this out."* | Machine reasoning cannot rescue a hollow model; vocabulary drift degrades classification and retrieval too | *"Reasoning over what? Every demonstration today was a model that couldn't answer the question."* **LL-12** |

M7 arrives in almost every executive room. It is worth the two minutes.

---

## Discussion prompts

Held in reserve for segment 7, or when a room is quiet. Drawn from Phase 9 §9.6.

- **Q4** — Is a legal matter fundamentally different from a software project, or only in degree? What follows either way?
- **Q5** — Should obligation or matter be the atomic unit? Defend the alternative.
- **Q16** — If a system silently excludes matters from a risk dashboard because of a vocabulary mismatch, and a deadline is missed — where does liability sit?

**Q16 is the strongest closer for this audience** and pairs directly with D1. Use it when the room has gone quiet after segment 5 — that silence is comprehension, and Q16 converts it into a conversation they will continue after the session.

---

## Fallback paths

| Situation | Path | Cost |
| --- | --- | --- |
| **Instance won't run** | Use the demonstration cards and the synthetic dataset as a paper walkthrough | **Gate G5 fails.** This is a degraded delivery and must not be recorded as EX-01. Say so in the session record |
| **Only 60 minutes** | Cut segment 2 to 5 min (facilitator-led rather than paired) and segment 4 to 12 min. **Never cut segments 5 or 7** | Reduced; delivery remains valid |
| **Remote** | Demonstrations on shared screen; worksheets in a shared document; predictions in chat, posted simultaneously on your count | Low — enforced simultaneous posting works better than a room, because nobody hears the confident voice first |
| **Large group (24+)** | Keep pairs for segments 2 and 4; take predictions from a rotating three rather than the room | Low |
| **A participant recognises their own system and derails** | This is success, not derailment. Park it explicitly — *"that's exactly the right instinct, hold it for segment 8"* — and make sure you return to them | None if parked; high if you let it run at segment 3 |
| **Room is hostile to the subject** | Redirect to P5 — the subject is evidence, not a defendant | Moderate — a mocking room stops seeing itself in the material, which is the entire point |

---

## After the room

Record against the six gates in the spec. A session that missed **G1** (predictions) or **G5** (live demonstrations) did not deliver EX-01, whatever else it achieved — record it honestly as a degraded delivery.

Capture any question from segment 8 that named a structure the libraries do not cover. Those feed the next synthesis cycle.
