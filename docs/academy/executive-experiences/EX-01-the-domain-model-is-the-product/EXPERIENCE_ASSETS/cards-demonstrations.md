# Demonstration Cards — EX-01

**Facilitator cards for D2, D1 and D9.** Print or keep open on a second screen. Sequences are quoted from the [Demonstration Library](../../../demonstration-library/README.md); the prediction prompts are the executive-format wording.

> **Run protocol.** Set up in silence → take the prediction aloud → reveal → name the principle. Never narrate the setup.

---

## Card 1 · D2 — The orphan defect

**Segment 3 · 10 minutes**

**Set up (silently)**
1. Create a task.
2. Give it a deadline.
3. Assign it to someone.

**Ask before you click**
> *"I'm about to open the matter this deadline belongs to. What will I see?"*

Take three answers. Do not comment on them.

**Reveal** — open the matter. **The task is nowhere.**

**Say**
> *"The deadline exists. The system knows about it. And it is invisible from the file it concerns."*

**Name** — **EM-1: everything dated belongs to a matter.**

**Stop there.** Do not connect it to the other demonstrations. The thesis is withheld until segment 7.

---

## Card 2 · D1 — Silent exclusion

**Segment 5 · 10 minutes**

**Set up (silently)**
1. Note the number of matters currently shown on the dashboard.
2. Create a new matter.
3. Set its status to a value outside the set the dashboard recognises — `In Review` in the supplied dataset.

**Ask before you click**
> *"How many matters will the dashboard show?"*

They will say *n+1*.

**Reveal** — open the dashboard. It shows *n*.

**Say — this is the beat that matters**
> *"There is no error. No warning. Nothing turned red. The number is simply wrong, and it looks completely fine."*

**Name** — **LL-03: free text is a decision to have no data.** **EM-2: every classification is a controlled vocabulary.**

**Expect silence.** That silence is comprehension — this is the demonstration that maps onto reports they have personally signed off. If you want to open it up, prompt **Q16** (liability for a silently excluded matter).

---

## Card 3 · D9 — The regression

**Segment 6 · 10 minutes**

**Set up (silently)** — put the design prototype of the matter grid beside the shipped table.

**Ask before you reveal**
> *"The designers specified this screen. The team shipped that one. What's missing?"*

Let them find it. They usually do.

**Reveal** — the **upcoming-activity column** is absent from the shipped table.

**Say**
> *"Nobody decided to remove this. It fell out, because there was nothing to fill it with — nothing joined activity to the matter."*

**Name** — **LL-08: the interface reifies the data model.** **LL-09: requirements degrade predictably under implementation pressure.**

---

## Card 4 · Convergence

**Segment 7 · 10 minutes · Not a demonstration**

Put all three up together. Ask what they have in common. **Let the room reach it.**

Then state the thesis for the first time:

> **A system is defined by its entities and their relationships, not by its screens. Every screen-level failure you saw today is a domain-model failure wearing a costume.**

One line each:

| Demonstration | What it actually was |
| --- | --- |
| D2 — the missing task | A missing **relationship** *(EM-1)* |
| D1 — the wrong number | A missing **vocabulary** *(EM-2)* |
| D9 — the missing column | The **same missing relationship**, surfacing somewhere else |

---

## Safety

All three demonstrations run against a **local instance with synthetic data** — production rule P4. Neither trust-boundary demonstration (D3, D10) is used in EX-01; if a participant asks to see one, the answer is that they belong to a different experience and carry a binding protocol of their own.
