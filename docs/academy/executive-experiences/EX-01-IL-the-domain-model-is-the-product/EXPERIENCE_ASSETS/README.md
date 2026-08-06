# EXPERIENCE_ASSETS — EX-01-IL

Supporting production assets for [EX-01-IL](../EXPERIENCE_SPEC.md). Learner-facing assets are Hebrew; this index is English, matching the spec and facilitator guide.

| Asset | Language | Used in | Purpose |
| --- | --- | --- | --- |
| [`worksheet-forum-audit.md`](./worksheet-forum-audit.md) | Hebrew | Segment 2 | Five facts spanning the firm's forums. Participant-facing, pairs |
| [`worksheet-promise-trace.md`](./worksheet-promise-trace.md) | Hebrew | Segment 4 | Four **firm-supplied** objectives traced to entity and relationship. Carries gate G2 |
| [`cards-demonstrations.md`](./cards-demonstrations.md) | Hebrew | Segments 3, 5, 6, 7 | Facilitator cards for D2-IL, D1-IL, D9 and convergence |
| [`synthetic-matters-il.csv`](./synthetic-matters-il.csv) | Hebrew data | Segments 2, 3, 5, 6 | Synthetic dataset loaded into the local instance before delivery |

---

## Before you use the dataset

Eighteen synthetic matters across the firm's six practice areas. Three structures are deliberately built in, and each one carries a segment.

### 1 · Bilingual status drift — drives D1-IL (segment 5)

**The recognised set in the file is `Open` / `In Progress` / `Closed`.** Six rows drift outside it:

| Row | Value | Drift |
| --- | --- | --- |
| `SYN-112` | `בטיפול` | Hebrew value with no Latin equivalent in the set — the primary demonstration row |
| `SYN-113` | `פתוח` | Hebrew equivalent of a value that *is* recognised — the same state, excluded on script alone |
| `SYN-114` | `ממתין ללקוח` | An operationally useful state the model never anticipated |
| `SYN-115` | `הסתיים` | Hebrew equivalent of `Closed` |
| `SYN-116` | `OPEN` | **A recognised value, mis-cased.** Hold this row in reserve |
| `SYN-117` | `In Progress ` | Trailing whitespace only — visually identical on screen |

`SYN-116` is the row that wins the argument. A partner will accept that `בטיפול` was an unanticipated value, then insist that `OPEN` must obviously count — and watching it excluded anyway is what moves the principle from reasonable to undeniable. `SYN-117` is the encore if time allows: nobody can see the defect even when told it is there.

### 2 · The client cluster — drives D2-IL (segment 3)

`CL-004` holds four live matters: `SYN-107` ליטיגציה, `SYN-108` מקרקעין, `SYN-109` מיסוי מקרקעין, `SYN-110` הוצאה לפועל. Attach the demonstration's hearing date to the **client**, then open all four.

### 3 · The forum pair — drives the forum audit (segment 2)

`SYN-103` (judgment, בית משפט מחוזי) and `SYN-104` (enforcement, לשכת הוצאה לפועל) are **the same dispute** carrying two unrelated identifiers. `SYN-107` and `SYN-110` form a second such pair inside the client cluster.

---

## Two checks before delivery

**The drift must actually drift.** If your instance's recognised status set differs, adjust the file so the drift values sit outside it. If the instance accepts anything, D1-IL cannot fire and you lose the centrepiece with no warning at run time. This is part of the rehearsal required by production rule **P6**.

**The Hebrew must render.** The file is saved UTF-8 **with a BOM** so Excel opens it without mojibake; if you regenerate or re-export it, keep the BOM. Then check the whole path — CSV import → matter list → status field → dashboard filter → aggregate. A dashboard showing `×‘×˜×™×¤×•×œ` teaches the wrong lesson: the room reads it as an encoding bug rather than a silent exclusion, and the segment is lost.

---

## Provenance and safety

Clients are **reference codes only** (`CL-001`…`CL-008`) — no names, personal or corporate. Matter references, forum identifiers, dates and responsible-lawyer initials are synthetic and follow the *shape* of Israeli identifiers without corresponding to any real proceeding. No asset here contains real client data, and none may be replaced with real client data — production rule **P4**, inherited from the [Demonstration Library safety protocol](../../../demonstration-library/README.md#safety-protocol).

Demonstration sequences are quoted from the Demonstration Library. Worksheet content derives from exercises E1 and E2 and from lessons LL-01 and LL-02. The bilingual amplification in segment 5 rests on challenge **C6** and architecture discussion **AD9** — *RTL is a data-layer concern, not a CSS concern.*
