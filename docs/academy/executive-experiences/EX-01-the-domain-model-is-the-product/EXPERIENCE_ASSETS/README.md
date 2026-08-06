# EXPERIENCE_ASSETS — EX-01

Supporting production assets for [EX-01 — The Domain Model Is the Product](../EXPERIENCE_SPEC.md).

| Asset | Used in | Purpose |
| --- | --- | --- |
| [`worksheet-absence-audit.md`](./worksheet-absence-audit.md) | Segment 2 | Five domain-typical facts to attempt against the instance. Participant-facing, pairs |
| [`worksheet-promise-trace.md`](./worksheet-promise-trace.md) | Segment 4 | Four stated objectives traced to required entity and relationship. Carries quality gate G2 |
| [`cards-demonstrations.md`](./cards-demonstrations.md) | Segments 3, 5, 6, 7 | Facilitator cards for D2, D1, D9 and convergence. Setup, prediction prompt, reveal, principle |
| [`synthetic-matters.csv`](./synthetic-matters.csv) | Segments 3, 5, 6 | Synthetic dataset loaded into the local instance before delivery |

---

## Before you use the dataset

`synthetic-matters.csv` carries fifteen matters. Ten hold a status inside the recognised set; five drift outside it, which is what makes **D1** fire.

**The recognised set in the file is `Open` / `In Progress` / `Closed`.** Your instance may recognise three different values. Check before delivery and adjust the file to match — if the drift values happen to be ones your dashboard accepts, D1 will not fire and the session loses its strongest segment. This is part of the rehearsal required by production rule **P6**.

The drift rows are deliberately varied, because the failure has more than one shape:

| Row | Drift |
| --- | --- |
| SYN-009 `In Review` | A plausible value nobody added to the vocabulary — the canonical D1 case |
| SYN-010 `Awaiting Client` | An operationally useful state the model never anticipated |
| SYN-011 `on hold` | Casing *and* value both outside the set |
| SYN-012 `OPEN` | A **recognised value, mis-cased** — the one that convinces sceptics, because the data is arguably correct and still excluded |
| SYN-013 `Pending review` | Near-collision with SYN-009, showing how quickly a free-text column fragments |

SYN-012 is worth holding in reserve. A participant who accepts that `In Review` was an unanticipated value will often still insist `OPEN` should count — and watching it excluded anyway is what converts the principle from reasonable to undeniable.

---

## Provenance and safety

All names, matters and dates are **synthetic**. No asset in this directory contains real client data, and none may be replaced with real client data — production rule **P4**, inherited from the [Demonstration Library safety protocol](../../../demonstration-library/README.md#safety-protocol).

Demonstration sequences are quoted from the Demonstration Library. Worksheet content derives from exercises E1 and E2 and from lessons LL-01 and LL-02.
