# FACILITATOR_GUIDE — EX-01-IL

# The Domain Model Is the Product · Israeli multi-practice variant

**Delivery guide. Version 1.0.** Read with [`EXPERIENCE_SPEC.md`](./EXPERIENCE_SPEC.md).
Learner-facing material is Hebrew; this guide is English with glosses.

---

## Before the room

| # | Preparation | Non-negotiable? |
| --- | --- | --- |
| 1 | Local instance running, loaded with [`synthetic-matters-il.csv`](./EXPERIENCE_ASSETS/synthetic-matters-il.csv) | **Yes** — rule P4 |
| 2 | **The firm's four objectives collected, at least a week ahead** (see below) | **Yes** — segment 4 collapses without them |
| 3 | All three demonstrations rehearsed **against today's instance** | **Yes** — rule P6 |
| 4 | **Hebrew renders correctly** in the matter list, the status field and the dashboard filter | **Yes** — see below |
| 5 | **The drift values genuinely drift** — confirm the recognised status set and adjust the dataset to sit outside it | **Yes** |
| 6 | Worksheets printed RTL: [forum audit](./EXPERIENCE_ASSETS/worksheet-forum-audit.md), [promise trace](./EXPERIENCE_ASSETS/worksheet-promise-trace.md) | Yes |
| 7 | [Demonstration cards](./EXPERIENCE_ASSETS/cards-demonstrations.md) to hand | Recommended |

### The two checks that are specific to this variant

**Hebrew must render.** If the dashboard displays `×‘×˜×™×¤×•×œ` instead of `בטיפול`, segment 5 teaches the wrong lesson entirely — the room sees an encoding bug, shrugs, and the exclusion principle never lands. Check the full path: CSV import → matter list → status filter → dashboard aggregate.

**The drift must drift.** If the instance already accepts Hebrew status values, D1-IL simply does not fire and you lose the centrepiece with no warning. Confirm the recognised set before you rely on it.

### Collecting the four objectives

Segment 4 traces **the firm's own promises**, not invented ones. A week ahead, ask your sponsor for four claims — from the vendor's proposal, the internal tool's requirements document, or whatever was promised when the budget was approved. Verbatim, in their words.

Ask for four; expect to receive three usable ones. Objectives phrased as features (*"a client portal"*) are weaker than objectives phrased as promises (*"partners will always know what is due this week"*) — push for the second kind, but take what you get and trace it as written.

---

## The mechanism

Unchanged from EX-01, and it is the whole design:

> **Set up silently → participants commit to a prediction → reveal → name the principle.**

Executives must be **wrong out loud** before they are told anything. A partner who has just predicted that the deadline will appear on the litigation file, and then watched all four matters come up empty, has learned something no vendor demo can teach. Skip the prediction and you have delivered a talk.

Resist narrating the setup. The urge is strong and it is fatal.

---

## Running the ninety minutes

### Segment 1 — Opening wager · 5 min

> *״רשמו שלוש שאלות שמערכת ראויה למשרד שלכם צריכה לדעת לענות עליהן מיד. אל תדונו בהן.״*

Collect nothing. They return to these in segment 8.

**Transition:** *"Hold those. We're going to look at a system built by people trying to answer exactly that kind of question."*

### Segment 2 — The forum audit · 10 min

**Supporting segment — facilitator-paced, and it must not overrun.** Its job is to prime segments 3 and 5, not to be exhaustive.

Pairs, five facts. Circulate. When a pair says *״זה פשוט לא קיים״* — that is the finding, and your only reply is *״תרשמו את זה״*.

The fact that lands hardest is #2: the same dispute existing simultaneously as a judgment and as a תיק הוצל"פ. Most systems in this market hold one identifier per matter. Let a pair discover that and the rest of the morning has its foundation.

**Watch for** pairs who start designing fixes. Redirect: *״עוד לא. רק תרשמו מה נכשל.״*

**Transition:** *"You've found things it can't say. Now I'll show you one of them happening."*

### Segment 3 — D2-IL, the deadline that belongs to a client · 12 min · **CORE**

Set up in silence. Create a hearing date. Attach it to client `CL-004` — who holds four live matters across ליטיגציה, מקרקעין, מיסוי מקרקעין and הוצאה לפועל.

Then, before you click:

> *״אני עומד לפתוח את ארבעת התיקים של הלקוח הזה, אחד אחרי השני. באיזה מהם יופיע המועד?״*

Take three answers. Most will pick the litigation file — it is the reasonable guess, which is what makes it useful.

Open all four, deliberately, one at a time. **The deadline is on none of them.**

Let the silence sit. Then:

> *״המועד קיים. המערכת יודעת עליו. הוא מקושר ללקוח. והוא בלתי נראה מכל תיק שהוא נוגע אליו.״*

Name **EM-1** — כל דבר שיש לו תאריך שייך **לתיק**, לא ללקוח. Stress the last three words; that is the entire adaptation.

**Do not connect it to anything else.** The thesis stays withheld.

**The objection you will get, and it is a good one:** *"but it's under the client, so we'd find it."* Answer with the count — this client has four matters; a real client of theirs might have nine. Then move on. Do not resolve it fully here; segment 7 does that.

### Segment 4 — Promise tracing · 18 min

The analytical core. Write the firm's four objectives on the board or into the worksheet before you start.

**Enforce the gate as you circulate.** A promise marked בלתי אפשרית must name the missing structure. *״בלתי אפשרית כי המערכת בנויה גרוע״* fails. *״בלתי אפשרית כי אין ישות של דיון״* passes.

**Timebox hard at 18 minutes.** Groups tracing their own firm's promises will want far longer — this is a good problem, and you must still cut it. Segment 7 is where the payoff lands and it cannot be compressed.

**Transition:** *"You've just found promises with nothing underneath them. Here's what that costs on an ordinary Tuesday."*

### Segment 5 — D1-IL, the report that is quietly wrong · 15 min · **CORE**

**The centrepiece. Give it the full fifteen minutes.**

Note aloud how many matters the dashboard shows. Create one more. Type its status as `בטיפול`.

> *״כמה תיקים יציג לוח המחוונים עכשיו?״*

They will say *n+1*. Open it: *n*.

The beat that matters, and the one facilitators rush:

> *״אין שגיאה. אין אזהרה. שום דבר לא נצבע באדום. המספר פשוט שגוי, והוא נראה לגמרי תקין.״*

Name **LL-03** and **EM-2**.

**Then the second move, which is what makes this the Israeli variant.** Show the drift rows in the dataset together — `בטיפול`, `פתוח`, `ממתין ללקוח`, and then `OPEN`. Ask whether `OPEN` should count.

The room will say yes. It is a recognised value; only the casing is wrong. Show it excluded anyway.

> *״זה לא עניין של עברית מול אנגלית. זה עניין של עמודה שמקבלת כל דבר, במשרד שעובד בשתי שפות.״*

This is the moment the principle stops being reasonable and becomes undeniable. **Do not skip the `OPEN` row.**

Expect silence. It is comprehension. If you want to open it up, this is where **Q16** goes.

### Segment 6 — D9, the column that fell out · 8 min

Prototype beside shipped screen. Ask what is missing before revealing.

The forum-status column is absent. It could not be populated — nothing joined the matter to its forum.

> *״אף אחד לא החליט להוריד את זה. זה נשר, כי לא היה במה למלא אותו.״*

Name **LL-08** and **LL-09**. Keep it to eight minutes; it is the third example, not a new idea.

### Segment 7 — Convergence · 12 min

**The payoff. Do not rush it and do not shorten it.**

Put the three failures up together. Ask what they have in common. Let the room reach it — someone usually does, and it is worth waiting through the silence.

Then state the thesis, for the first time in ninety minutes:

> **מערכת מוגדרת על ידי הישויות שלה והקשרים ביניהן, ולא על ידי המסכים שלה. כל כשל ברמת המסך שראיתם היום הוא כשל של מודל התחום בתחפושת.**

Then one line each:

| What they saw | What it was |
| --- | --- |
| המועד שלא הופיע | A missing **relationship** — dated things belong to a matter, not a client *(EM-1)* |
| המספר השגוי | A missing **vocabulary** *(EM-2)* |
| העמודה החסרה | The **same missing relationship**, surfacing elsewhere |

This is also where you settle the segment-3 objection properly: *"under the client" is a relationship — just not the one any of your work actually needs.*

### Segment 8 — The question you take back · 10 min

Return to segment 1. Each participant converts one question into promise-trace form:

> *״באיזו ישות ובאיזה קשר השאלה הזאת תלויה — והאם הם קיימים אצלנו?״*

Take two or three aloud. Close there. **Do not summarise.** The last thing said in the room should be a partner's question about their own system, not your recap.

---

## Expected misconceptions

| # | What they say | Why it's wrong | Recovery |
| --- | --- | --- | --- |
| **M1** | *״זה פשוט נבנה גרוע.״* | The design was better than the build. A properly specified role model degraded into scattered conditionals under delivery pressure. This is the normal failure | *"Their design documents got this right. It degraded on the way to production — which is what makes it worth your morning. Competent teams produce this."* **LL-09** |
| **M2** | *"QA would catch it."* | D1-IL produces no error. There is nothing to catch — the output is plausible and wrong | *"What would the test assert? The dashboard returned the right number for the query it ran."* **LL-03** |
| **M3** | *"That's a UI problem — fix the screen."* | The column could not be populated. The UX defect and the modelling defect are one defect | *"Where would the screen get the data?"* **LL-08** |
| **M4** | *"Add the field next release."* | Unenforced relationships are the first casualty, and retrofitting means rewriting what sits on top | *"Name the screens, queries and workflows that change. That list is the real cost."* **LL-09**, exercise **E4** |
| **M5** | ***"We'll just tell everyone to type in English."*** | **The one you must defeat.** A convention nobody enforces is not a controlled vocabulary. It degrades under exactly the pressure that produced the drift — a busy paralegal at 18:00 | *"Who checks it? On which day? What happens to the four thousand matters already in there?"* Then show the `OPEN` row again — that one was typed in English and still excluded. **EM-2, LL-09** |
| **M6** | *"Our vendor handles this."* | A promise without an entity is marketing, whoever makes it | *"Good — ask them which entity satisfies it. It's a fair question with a real answer."* **LL-02** |
| **M7** | *״בינה מלאכותית תסדר את זה.״* | Machine reasoning cannot rescue a hollow model, and vocabulary drift degrades classification and retrieval too — worse across two scripts | *"Reasoning over what? Every failure today was a model that couldn't answer the question."* **LL-12, AD9** |
| **M8** | *"Our practice areas are too different to share one model."* | The four matters in segment 3 differ in procedure, not in structure. Each still needs a forum, a date with authority, and a lifecycle | *"Name one of the four that doesn't need a deadline attached to it."* **EM-1, EM-3** |

M5 and M7 arrive in almost every Israeli executive room. Budget time for both.

---

## Discussion prompts

Held for segment 7, or when a room goes quiet. From Phase 9 §9.6.

- **Q4** — Is a legal matter fundamentally different from a software project, or only in degree?
- **Q5** — Should obligation or matter be the atomic unit? Defend the alternative.
- **Q16** — If a matter is silently excluded from a deadline report because of a vocabulary mismatch, and a statutory window closes — where does liability sit, between the firm, the vendor and the fee-earner?

**Q16 is the strongest closer for this audience.** Use it after segment 5, while the silence is still in the room. In a firm doing מיסוי מקרקעין and הוצאה לפועל, the statutory windows are unforgiving and every partner present knows it.

---

## Fallback paths

| Situation | Path | Cost |
| --- | --- | --- |
| **Hebrew renders as mojibake** | Switch the demonstration to the `OPEN` mis-cased row and run D1-IL on casing alone | Real. You lose the bilingual point, which is the variant's core. Fix the encoding instead if there is any way to |
| **Drift values don't drift** | Find any value the dashboard filter rejects and use it | Low, if you find one. If the filter accepts everything, D1-IL cannot run — say so in the session record |
| **Firm supplied no objectives** | Run segment 4 on the four objectives in [parent EX-01](../EX-01-the-domain-model-is-the-product/EXPERIENCE_ASSETS/worksheet-promise-trace.md) | Moderate — the segment stops being about them. Note it in the record |
| **Instance won't run** | Cards and dataset as a paper walkthrough | **Gate G5 fails.** Degraded delivery; must not be recorded as EX-01-IL |
| **Only 60 minutes** | Cut segment 2 to 5 min, segment 4 to 12, segment 6 entirely. **Never cut 3, 5 or 7** | Acceptable. Two demonstrations still carry the thesis |
| **Remote** | Predictions posted simultaneously in chat on your count | Low — simultaneity works better than a room, where the confident voice goes first |
| **A partner recognises their own system** | Success, not derailment. Park it — *״בדיוק. תחזיקו את זה למקטע האחרון״* — and return to them in segment 8 | None if parked; high if it runs loose in segment 3 |
| **Room turns hostile to the subject** | Redirect to P5 — the subject is evidence, not a defendant | Moderate. A mocking room stops seeing itself in the material, which is the point |

---

## After the room

Record against the six gates. A session that missed **G1** (predictions) or **G5** (live demonstrations) did not deliver EX-01-IL, whatever else it achieved — record it honestly as degraded.

Capture any segment-8 question that named a structure the libraries do not cover. Those feed the next synthesis cycle.
