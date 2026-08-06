# Executive Experiences

**Standing Academy destination. Production assets, not documents.**

An Executive Experience is a deliverable thing: a facilitated session with a specification, a learner-facing artifact, a delivery guide and its supporting production assets. It is complete only when all four exist.

---

## The standard

Every Executive Experience consists of exactly four canonical artifacts.

| # | Artifact | Contains |
| --- | --- | --- |
| **1** | `EXPERIENCE_SPEC.md` | The canonical production specification — objectives, audience, flow, timing, learning outcomes, production rules and quality gates |
| **2** | `EXPERIENCE.html` | The learner-facing experience. The production artifact delivered to participants |
| **3** | `FACILITATOR_GUIDE.md` | Everything required to deliver it — timing, transitions, fallback paths, discussion prompts, expected misconceptions and recovery strategies |
| **4** | `EXPERIENCE_ASSETS/` | All supporting production assets — illustrations, cards, worksheets, datasets, synthetic evidence, slides, media, interactive components |

**An Experience with three of the four is not an Experience.** It is incomplete and is not delivered.

### Content rule

Experiences **reorganize existing canonical specifications** into production form. They do not introduce new findings. Every claim an Experience makes must trace to an entry in the standing libraries, the Demonstration Library, or a registered case study — and its specification must record that trace in a provenance table.

Where a production decision adapts canonical material — condensing a four-hour student module into ninety executive minutes, for instance — the adaptation is recorded, not silently made.

---

## The register

| Code | Experience | Duration | Audience | Status |
| --- | --- | --- | --- | --- |
| [**EX-01**](./EX-01-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) | [The Domain Model Is the Product](./EX-01-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) | 90 min | Executives who commission, fund or approve software | **Complete** — 4/4 artifacts |
| [**EX-01-IL**](./EX-01-IL-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) | [The Domain Model Is the Product — Israeli multi-practice variant](./EX-01-IL-the-domain-model-is-the-product/EXPERIENCE_SPEC.md) | 90 min | Partners at an Israeli multi-practice firm. Learner-facing artifacts in Hebrew, RTL | **Complete** — 4/4 artifacts |

### Variants

A variant carries its parent's code with a suffix (`EX-01-IL`), and shares the parent's thesis, spine, production rules and quality gates. It localises **instances only** — the demonstrations, datasets and worksheet content — and records what changed in an adaptation table and a localisation note in its specification. A variant that alters a principle, a rule or a gate is not a variant; it is a new Experience and takes a new code.

---

## Safety

Every Experience inherits the [Demonstration Library safety protocol](../demonstration-library/README.md#safety-protocol). Demonstrations run against a local instance with synthetic data, framed as defensive-security education where trust boundaries are involved, and never against a system the operator does not own. The protocol is binding and may not be relaxed without board approval (LREF-01 §14).
