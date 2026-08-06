# LREF-01 — LegalTech Reverse Engineering Framework

| | |
| --- | --- |
| **Designation** | LREF-01 |
| **Title** | LegalTech Reverse Engineering Framework |
| **Class** | Standing Academy methodology — permanent asset |
| **Version** | 1.0 |
| **Status** | Adopted by board directive |
| **Supersedes** | Ad hoc product-archaeology practice |
| **First instantiation** | CS-001 — CaseAce Law Firm Management System |
| **Change control** | §14 |

---

## 1. Purpose and standing

LREF-01 defines how the Academy extracts durable intellectual property from an existing LegalTech product.

It exists because the analysis of a legacy product is **repeatable work with a repeatable shape**, and because the value of such analysis compounds only if successive studies are *comparable*. An analysis that invents its own structure produces an essay. An analysis that instantiates a common structure produces a data point in a growing corpus.

**Standing rule:** future analyses **instantiate** this methodology. They do not redefine it. Where a subject demands a deviation, the deviation is recorded against §14 as a proposed amendment to LREF-01 — not absorbed silently into the case study.

### 1.1 What LREF-01 is for

| Goal | Meaning |
| --- | --- |
| **Extraction** | Recover reusable product, domain, workflow and UX intellectual property from a subject system |
| **Comparability** | Produce findings in a fixed shape so studies can be compared, aggregated and searched |
| **Accumulation** | Feed a growing Pattern Library, Lesson Library and Instrument Library that outlive any one study |
| **Instruction** | Yield teaching assets as a by-product, not as an afterthought |
| **Direction** | Convert external evidence into a prioritised, defensible build position for Rafter OS |

### 1.2 What LREF-01 is not

It is not code review, not security assessment, not due diligence, not competitive benchmarking, and not a redesign engagement on the subject. It never contributes to, modifies, or files issues against the subject system. **The subject is evidence, not a client.**

---

## 2. Scope and applicability

### 2.1 Eligible subjects

Any system that automates legal work or legal-adjacent professional services: practice management, case management, document automation, e-discovery, contract lifecycle, court filing, legal research, client portals, compliance platforms, and internal tools built by firms for themselves.

### 2.2 Subject selection criteria

Not every system repays a full study. Score a candidate before committing effort:

| Criterion | Why it matters | Weight |
| --- | --- | --- |
| **Legibility** | Can intent be recovered? Documentation, design artifacts, or a readable surface | High |
| **Intent evidence** | Are there specifications, diagrams, prototypes to compare against the build? | **Highest** — the intent/build delta is the richest seam |
| **Domain honesty** | Does it attempt real legal work, or is it a generic tool with legal branding? | High |
| **Instructive failure** | Does it fail along real fault lines rather than merely sloppily? | High |
| **Scale legibility** | Small enough to hold in one analyst's head; large enough to be non-trivial | Medium |
| **Access legality** | Public, or lawfully accessible, with a licence position that permits study | **Gating** |

A subject scoring low on *intent evidence* yields a thinner study: without a specification, the analyst can observe what was built but cannot recover what was meant, and Stage 1's most valuable instrument is unavailable.

### 2.3 Study depth tiers

| Tier | Effort | Stages | Use when |
| --- | --- | --- | --- |
| **T1 — Reconnaissance** | 0.5–1 day | S1, S2 (abbreviated), S9 | Triaging many candidates; deciding whether to go deeper |
| **T2 — Standard** | 3–5 days | All nine, normal depth | Default. A named competitor or a directly analogous system |
| **T3 — Deep** | 2–3 weeks | All nine, plus primary user research and expert review | A system the Academy intends to displace, partner with, or acquire from |

The tier is declared in the case-study front matter and governs the quality gates that apply.

---

## 3. The analytical stance

Every study is conducted through four lenses held simultaneously. They are not sequential phases; they are four questions asked continuously of the same evidence.

| Lens | Question it asks | Guards against |
| --- | --- | --- |
| **Product architect** | What did they decide, and what did that decision cost them downstream? | Mistaking features for decisions |
| **Legal operations practitioner** | Would this survive a Tuesday in a real practice? What breaks under deadline pressure? | Domain-naive praise for generic competence |
| **Design researcher** | What does the interface reveal about the model of the user in the builders' heads? | Cosmetic critique |
| **Engineering leader** | What must be true structurally for this to work, and is it true? | Accepting a promise unbacked by an entity |

**The stance is diagnostic, not adversarial.** The purpose is never to establish that a subject is bad. It is to establish *what the subject teaches*, which requires taking its good decisions as seriously as its failures. A study that finds nothing worth keeping has almost certainly been conducted badly.

---

## 4. Governing doctrines

Six principles govern every stage. They are the compressed method.

**D1 — Mine decisions, not implementations.** Every finding must be expressible as a product or domain assertion that survives being rewritten in any language on any stack. If a finding evaporates when the technology changes, it is not a finding.

**D2 — Absence is evidence.** What a system *cannot represent* defines it more precisely than what it can. Deliberately enumerate the missing before cataloguing the present.

**D3 — Defects are specifications in disguise.** Where a subject is broken, ask whether it is broken along a real fault line in the domain. If so, that fault line is where the successor earns its value. Sloppiness teaches nothing; structural failure teaches a great deal.

**D4 — Intent and build are separate objects.** Specifications, diagrams and prototypes record what was *meant*. Code records what was *achieved*. **The delta between them is the highest-yield seam in any study**, because it reveals which requirements degrade under implementation pressure — and those degrade the same way everywhere.

**D5 — Judge ideas and execution independently.** They are uncorrelated variables. A brilliant idea in a broken implementation remains a brilliant idea, and is exactly what extraction is for.

**D6 — Every claim carries its evidence.** Findings cite the artifact that supports them. Inferences are labelled as inferences. Assumptions are declared where made, not buried.

---

## 5. Evidence doctrine

### 5.1 Source hierarchy

| Rank | Source | What it reveals | Caution |
| --- | --- | --- | --- |
| 1 | **Design artifacts** — models, diagrams, specifications, prototypes | Intent; the designers' domain model | May describe a system never built |
| 1 | **Application source and interface** | What was achieved | Reveals nothing about why |
| 2 | **Written specification** — README, docs, marketing | The product thesis and stated promises | Aspirational; verify every claim against the build |
| 3 | **Version history** | Team topology, sequence, integration discipline | Absent or rewritten in many subjects |
| 3 | **Prototypes and mockups** | Ambition beyond what shipped | Often the best evidence of intended UX |
| 4 | **Third-party accounts** — reviews, discussion, press | Reception and real-world use | Unverifiable; never load-bearing alone |

### 5.2 Recording standard

- Findings cite the artifact: file and location, diagram figure, or document section.
- Enumerated values, field names and labels are recorded **verbatim**. The subject's vocabulary is itself an asset; paraphrase destroys it.
- Every inference is marked as such. Every assumption about non-visible components (a backend, a database, an internal service) is marked *(assumption)* and listed in a single register so it can be validated later.
- Negative findings are recorded with the same rigour as positive ones: *"searched for X across the whole subject; absent"* is a finding, not a gap in the work.

### 5.3 Parallel collection

Evidence collection is parallelised across independent readers where volume warrants it, with each reader given a disjoint scope and instructed to return **dense verbatim inventories rather than summaries**. Summarisation at collection time destroys the vocabulary the later stages depend on. Synthesis happens once, centrally, after collection completes.

---

## 6. Legal and intellectual property protocol

**This section is mandatory and gating. No study proceeds past Stage 1 until it is satisfied.**

### 6.1 Licence determination

Establish the subject's licence before substantive work. Record the finding in the case-study front matter. Absence of a licence file is not permission — it is the most restrictive position.

### 6.2 The ideas/expression discipline

Ideas, systems, methods of operation, domain vocabulary and facts are not protected by copyright. Expression is. Every study operates strictly on the unprotected side of that line:

| Permitted | Prohibited |
| --- | --- |
| Reading lawfully accessible material to understand intent | Copying source into any Academy or Rafter artifact |
| Extracting abstract ideas: domain concepts, workflow shapes, role models, screen taxonomies | Reproducing markup, styling, scripts or file structure |
| Recording facts: field names, enum values, endpoint paths, metric labels, screen labels | Reusing branding, logos, copy or visual assets |
| Independent critique and independent redesign | Contributing to, filing against, or modifying the subject |

Identifiers quoted in a case study appear **as evidence of a design decision, in the manner of citation for analysis** — never as components for transplant.

### 6.3 Re-expression requirement

Every asset promoted to the Pattern Library must be stated at a level of abstraction that **requires independent re-implementation**. A pattern that could be satisfied by pasting the subject's code is not abstract enough and must be re-stated.

### 6.4 Counsel review

Where a study's outputs are intended to inform a build, the licence position and extraction record are referred to counsel before implementation begins. The case study states plainly that this referral is required.

### 6.5 Ethical constraints on demonstration

Where a study identifies a security or confidentiality weakness, it is described **architecturally** — the class of failure and the trust boundary crossed. Any live demonstration is performed only against a locally controlled instance with synthetic data, framed as defensive education. Studies never exercise a weakness against a system the Academy does not own, and never publish an operational exploitation path.

---

## 7. The nine stages

Stages are numbered for reference, not as a strict sequence. S1 precedes everything; S2 precedes S3–S7; S8 and S9 draw on all prior stages. Within those constraints, iteration is expected — S4 routinely returns findings that revise S2.

Each stage below specifies **purpose, inputs, method, instruments, outputs, quality gate and failure modes.** Outputs marked **(required)** must appear in every case study at T2 depth or above; they are the instantiation contract.

---

### S1 — Discovery

**Purpose.** Establish what the product is, who it serves, what it promises, and how mature it is — before forming any opinion about whether it succeeds.

**Inputs.** Written specification, design artifacts, version history, the running system or its interface, market context.

**Method.**
1. Read the stated vision verbatim. Record it without paraphrase.
2. Derive the **revealed** vision independently from what was actually built. State both.
3. Decompose the vision into discrete promises. Each promise is tracked from here to S2.
4. Identify target users, excluded users, and — importantly — users the system *appears* to target but structurally cannot serve.
5. Enumerate roles. Distinguish **organisational roles** (who someone is) from **capability roles** (what someone may do). Record both layers even when only one is implemented.
6. State business goals and, for each, whether the system instruments its own success.
7. Assess maturity against the tier scale, with evidence from version history, configuration posture, test posture and data honesty.
8. Read team topology from the artifact and check it against version history.

**Instruments.** I-01 Promise Register · I-02 Intent/Build Delta · I-03 Maturity Assay · I-04 Conway Reading · I-05 Stated-vs-Revealed Vision.

**Outputs.**
- **(required)** Stated vision and revealed vision, side by side
- **(required)** Promise Register: every stated promise, marked *built / partial / unbuildable*
- **(required)** Role model, both layers
- **(required)** Maturity verdict with evidence table
- Target-user assessment including structural exclusions
- Business-goal table with instrumentation column

**Quality gate.** Every headline promise in the subject's own materials appears in the Promise Register. None is omitted as obviously true.

**Failure modes.** Accepting the stated vision as the real one. Assessing maturity from surface polish rather than configuration and test posture. Recording only implemented roles and missing a designed-but-unbuilt capability model.

---

### S2 — Domain extraction

**Purpose.** Recover the entity model, and — the substantive work — determine what the model **cannot express**.

**Inputs.** S1 outputs, design artifacts, data-carrying interfaces, forms, tables, API surface.

**Method.**
1. Enumerate every business entity with its fields **verbatim**.
2. Record every enumerated value verbatim. Note where a field *should* be an enumeration and is not.
3. Map relationships. **Then map the relationships that are absent but required** — this is where the highest-value findings sit.
4. Run the Absence Audit (I-06) per entity against a domain reference model.
5. Run the Phantom Entity Census (I-07): every concept appearing in the interface with no data behind it.
6. Run the Orphan Test (I-08) on every dated or assignable entity.
7. Run the Lifecycle Completeness Test (I-09) on every long-lived entity.
8. Run the Vocabulary Control Audit (I-10).
9. For each entity, state possible AI enhancements — kept brief here; developed in S5.
10. Derive the entity set the successor must add.

**Instruments.** I-06 Absence Audit · I-07 Phantom Entity Census · I-08 Orphan Test · I-09 Lifecycle Completeness · I-10 Vocabulary Control Audit · I-11 Temporal Model Test.

**Outputs.**
- **(required)** Entity inventory: purpose, fields verbatim, relationships, missing fields, AI note
- **(required)** Enumeration register, verbatim
- **(required)** Relationship map including *absent required relationships*
- **(required)** Phantom Entity Census — **treat as a validated backlog** (see D3)
- **(required)** Cross-cutting structural findings
- **(required)** Entities the successor must add

**Quality gate.** For each unbuilt promise in the Promise Register, S2 identifies the specific missing entity or relationship that makes it unbuildable. A promise marked *unbuildable* without a named structural cause fails the gate.

**Failure modes.** Cataloguing what exists and stopping. Paraphrasing field names. Missing the phantom entities because they look like working features. Failing to test whether dated entities are anchored to the domain's organising object.

---

### S3 — Workflow extraction

**Purpose.** Recover what users actually do, as ordered sequences with actors, decisions and breakdown points — and determine what the system causes to happen next.

**Inputs.** S1–S2 outputs, interaction surfaces, sequence diagrams, API call graph, state transitions.

**Method.**
1. Enumerate candidate workflows from the interface, the specification and the domain.
2. Reconstruct each as a swim-laned flow: actor actions, system actions, gateways, state changes, terminal states.
3. Mark **breakdown points** explicitly — validation gaps, silent denials, unguarded destructive actions, missing conflict checks.
4. Record client-side and server-side validation verbatim.
5. Extract every state machine and the transitions the system permits.
6. Run the Termination Test (I-12) on every workflow.
7. Enumerate **absent workflows** — those the domain requires and the subject lacks. Prioritise them.
8. Identify the meta-pattern across all workflows.

**Instruments.** I-12 Workflow Termination Test · I-13 Destructive Action Audit · I-08 Orphan Test (applied to workflow outputs) · I-14 Trust Boundary Map.

**Outputs.**
- **(required)** Flow description per workflow, actors laned, breakdown points marked
- **(required)** State machine register
- **(required)** Validation register, verbatim
- **(required)** Absent-workflow table with domain-priority rating
- **(required)** Meta-pattern statement: does any workflow trigger another?

**Notation standard.** Flows are expressed in a text-renderable diagram format so they survive in version control and diff meaningfully. A consistent marking convention for breakdown points and absent branches is used throughout a study.

**Failure modes.** Documenting the happy path only. Omitting absent workflows because they are harder to enumerate than present ones. Describing flows without marking where they fail.

---

### S4 — UX analysis

**Purpose.** Assess the product as a modernisation candidate: whether its structure supports the decisions its users must make. Incorporates the screen inventory.

**Inputs.** All prior outputs, every screen, navigation structure, prototypes.

**Method.**
1. Catalogue every screen: route, purpose, target user, category, contents, state.
2. Classify screens by category (register / form / workspace / viewer / feed / analytics / auth) and compute the composition ratio. **A product's ratio of registers to workspaces is diagnostic** of whether it stores work or supports it.
3. Per screen: strengths, weaknesses, missing capabilities, AI opportunity.
4. Compare shipped screens against prototypes. Record every design regression and **trace each to its structural cause** — regressions usually have a modelling origin, not a design one.
5. Assess along seven dimensions: information hierarchy, workflow efficiency, cognitive load, navigation, decision support, missing dashboards, missing contextual information.
6. Run the Decision Support Audit (I-15).
7. Run the Naked Number Test (I-16).
8. Produce a graded scorecard.

**Explicitly out of scope.** Colour, typography and visual styling. LREF-01 assesses structure, economics of attention, and decision support. Aesthetic critique is not an Academy asset.

**Instruments.** I-15 Decision Support Audit · I-16 Naked Number Test · I-17 Navigation Axis Test · I-18 Design Regression Trace.

**Outputs.**
- **(required)** Screen inventory table with category and state
- **(required)** Screen composition ratio and its reading
- **(required)** Per-screen analysis for every substantive screen
- **(required)** Seven-dimension assessment
- **(required)** Decision Support Audit result
- **(required)** Graded scorecard
- Missing-dashboard table
- Design regression trace

**Quality gate.** The Decision Support Audit names at least five real decisions the target user makes and states the support provided for each. A UX assessment without it fails the gate.

**Failure modes.** Critiquing appearance. Assessing screens in isolation from the workflows they serve. Missing that a navigation defect is a data-model defect wearing a costume (I-17).

---

### S5 — AI opportunity mapping

**Purpose.** Determine what should be eliminated, assisted, automated and retained — and under what supervision.

**Inputs.** S1–S4, particularly the workflow set and the decision support audit.

**Method.**
1. Plot the domain's work on the **consequence × determinacy** grid. Determinacy decides *whether* to automate; consequence decides *how much supervision* the automation carries.
2. For each workflow from S3, allocate tasks to **eliminate / assist / retain**, with reasons.
3. For each opportunity, specify the mechanism concretely — not "AI could help" but what goes in, what comes out, and what the human does.
4. Rate each opportunity **value 1–5** and **feasibility 1–5**.
5. Define the agent architecture in supervision tiers (I-19).
6. Specify the tool surface — the capability set expressed as tools rather than screens. **This is the durable interface; screens are one client of it and agents are another.**
7. Define **blocking guardrails**: controls that prevent rather than warn.
8. Sequence into waves, observing the sequencing rule.

**Sequencing rule (mandatory).** *Never ship leverage before safety.* Capabilities that generate consequential output are not deployed before the audit, verification and authorization substrate they depend on exists. A study that recommends otherwise fails the gate.

**Instruments.** I-19 Supervision Tier Assignment · I-20 Consequence/Determinacy Allocation · I-21 Guardrail Specification.

**Outputs.**
- **(required)** Allocation grid for the domain
- **(required)** Opportunity register: workflow, eliminate/assist/retain, mechanism, agents, V/F rating
- **(required)** Agent architecture by supervision tier T0–T4
- **(required)** Tool surface specification
- **(required)** Blocking guardrail list
- **(required)** Wave sequencing with rationale

**Supervision tiers.**

| Tier | Regime |
| --- | --- |
| **T0** | Fully autonomous — acts, logs, does not notify |
| **T1** | Autonomous, notified — acts, logs, informs |
| **T2** | Draft — produces, never releases; a named human adopts |
| **T3** | Advisory — informs, never acts |
| **T4** | Human only — no machine output permitted |

**Three supervision invariants.** Every study asserts them and checks its recommendations against them: **attribution** (every artifact records human or machine origin and the accountable human), **reversibility** (every autonomous action is reversible, and the reversal is itself recorded), **explicability** (every derived fact states its authority and inputs).

**Failure modes.** Proposing capability without supervision. Rating value without feasibility. Recommending automation of high-consequence indeterminate work. Describing opportunities so abstractly that they cannot be estimated.

---

### S6 — Gap analysis

**Purpose.** Classify every element of the subject against the Academy's standing reference model, producing a decision per element.

**Inputs.** All prior stages; the standing Rafter reference architecture.

**Method.**
1. State the comparison frame explicitly, including what the reference model presently is and where it is assumed.
2. Classify every substantive element into exactly one class:

| Class | Meaning |
| --- | --- |
| **KEEP** | Sound; adopt the concept unchanged |
| **IMPROVE** | Right idea, insufficient execution; adopt and deepen |
| **REPLACE** | Real need, wrong mechanism; solve differently |
| **REMOVE** | Harmful or valueless; do not carry forward |
| **NEW** | Absent from both subject and reference; must be built |

3. For each item state the reason and the action. Classification without action is not a finding.
4. Assign priority (P0–P2) to IMPROVE, REPLACE and NEW items.
5. Add a **practice-specific gap section** covering jurisdiction, language and directionality, forum-specific requirements, and matter-shape specialisation. Generic analysis misses these every time.
6. Produce the integration thesis: which layer to build, which to adopt, which to skip, and why.

**Instruments.** I-22 Five-Class Classification · I-23 Layer Separation · I-24 Defensibility Test.

**Outputs.**
- **(required)** Classification summary counts
- **(required)** Full classification tables, one per class, with reason and action
- **(required)** Priority assignment on all IMPROVE / REPLACE / NEW
- **(required)** Practice-specific gap section
- **(required)** Integration thesis with a named build recommendation

**Quality gate.** Every class is non-empty. A study with zero KEEP items has failed the stance test in §3; a study with zero NEW items has not looked beyond the subject.

**Failure modes.** Classifying without prioritising. Skipping the practice-specific section. Producing a thesis that recommends building everything.

---

### S7 — Product redesign

**Purpose.** State the target-state product on its own terms, forgetting the subject's implementation. This is the constructive counterpart to S6 and the bridge to S9.

**Inputs.** All prior stages, freed from the subject's constraints.

**Method.**
1. State the **reframing**: the question the subject answers versus the question the successor must answer. One sentence each.
2. Produce the contrast table across: central object, atomic unit, primary interaction, system posture, work origin, truth model, notification model, authorization model, human role.
3. State **what remains** — decisions from the subject that survive contact with the present.
4. State **what disappears**, each with its replacement.
5. State **what becomes AI-native** — capabilities that could not exist without a model, as distinct from capabilities with a model bolted on.
6. State **what becomes event-driven**, with the event flow made explicit.
7. State **what becomes conversational**, and — equally important — what must remain visual. Dense state does not compress into dialogue; consequential approvals must not be given by typing "yes."
8. State **what becomes autonomous under supervision**, mapped to the T0–T4 tiers from S5.
9. Produce the target architecture, distinguishing core from edge.

**Outputs.**
- **(required)** Reframing statement
- **(required)** Contrast table across all nine dimensions
- **(required)** Remains / disappears / AI-native / event-driven / conversational / autonomous sections
- **(required)** Target architecture with core-versus-edge distinction

**Note on sequence.** S6 and S7 may be run in either order. Running S7 first produces a cleaner target unbiased by the subject; running S6 first produces a target better grounded in evidence. The case study records which order was used and why.

**Failure modes.** Redesigning the subject rather than designing the successor. Declaring everything conversational. Omitting the core/edge distinction, which is what reveals whether the subject built only the surface.

---

### S8 — Academy lesson extraction

**Purpose.** Convert the study into teaching assets. This is a deliverable, not a by-product.

**Inputs.** All prior stages, especially the failures.

**Method.**
1. State the **curriculum thesis** — the single meta-lesson from which the others follow.
2. Define modules with duration and a core question each.
3. Write **lessons**: each a transferable principle with the subject as illustration, plus a named transferable skill. A lesson that only applies to the subject is not a lesson.
4. Design **exercises**: analyst-performed, timeboxed, with a named deliverable.
5. Design **live demonstrations**: short, observable, each revealing one structural truth. Demonstrations touching security or confidentiality carry the §6.5 protocol.
6. Design **student challenges** with difficulty ratings and explicit success criteria.
7. Write **discussion questions** grouped by theme, including ethics and professional responsibility.
8. Design **reverse-engineering exercises** that teach method rather than findings.
9. Identify **prompt-engineering opportunities**, prioritising grounding, verification and refusal.
10. Frame **architecture discussions** as tensions with real trade-offs, not questions with answers.

**Outputs.**
- **(required)** Curriculum thesis
- **(required)** Module table
- **(required)** Lessons, each with a transferable skill
- **(required)** Exercises with deliverables
- **(required)** Demonstrations
- **(required)** Challenges with success criteria
- **(required)** Discussion questions including an ethics group
- **(required)** Reverse-engineering exercises
- **(required)** Prompt-engineering opportunities
- **(required)** Architecture discussion topics

**Quality gate.** Every lesson states a principle that holds beyond the subject. Every challenge has a success criterion that can be judged.

**Failure modes.** Lessons that are merely findings restated. Exercises without deliverables. Omitting the ethics group, which is where legal-domain teaching earns its distinctiveness.

---

### S9 — Rafter OS opportunity extraction

**Purpose.** Convert the study into a build position. S6 assesses the subject; **S9 assesses us.**

**Inputs.** All prior stages, particularly S5, S6 and S7.

**Method.**
1. **Pattern promotion.** Promote qualifying findings into the standing libraries, in the required categories: business patterns, UX patterns, workflow patterns, entity model, dashboard concepts, navigation concepts, role model, security and governance concepts. Each pattern receives a code, a one-line statement, and a note of origin. Each must satisfy §6.3 re-expression.
2. **Complementarity assessment.** State what the subject has that Rafter lacks, and what Rafter has that the subject lacks. Name the **missing middle** — the layer neither possesses.
3. **Defensibility test (I-24).** For each candidate build item, assess: does it require genuine domain knowledge to specify? Does it accumulate value with use? Does it make existing capability persistent rather than per-invocation? Items failing all three are commodity and should be bought, adopted, or deferred.
4. **Build/adopt/skip recommendation** per layer, with reasoning.
5. **Highest-leverage single change.** Name one narrow, specific, high-yield intervention. A study that cannot name one has not reached a conclusion.
6. **Prioritised backlog**, tagged P0–P2, with foundation items identified as blocking.
7. **Assumption register** — every *(assumption)* made about non-visible components, gathered for validation.

**Outputs.**
- **(required)** Promoted patterns in all eight categories, coded
- **(required)** Complementarity assessment naming the missing middle
- **(required)** Defensibility assessment per candidate
- **(required)** Build / adopt / skip recommendation by layer
- **(required)** The highest-leverage single change, named and justified
- **(required)** Prioritised backlog with blocking foundations marked
- **(required)** Assumption register

**Quality gate.** The backlog identifies which items are foundational and must precede others. A flat backlog fails the gate.

**Failure modes.** Recommending everything. Promoting patterns too concrete to be reusable. Failing to distinguish commodity layers from defensible ones — the most expensive error a study can make, because it directs build effort at work someone else has already commoditised.

---

## 8. The instrument library

The instruments are the transferable method. They are applied across stages and accumulate as the Academy's analytical toolkit.

| Code | Instrument | Question | How to run |
| --- | --- | --- | --- |
| **I-01** | Promise Register | What did it promise? | Extract every promise from the subject's own materials; mark built / partial / unbuildable; carry to S2 for structural cause |
| **I-02** | Intent/Build Delta | What degraded during implementation? | Compare design artifacts to the build element by element. Record every survival and every regression |
| **I-03** | Maturity Assay | How mature, really? | Score on timeline, team, integration debt, configuration posture, test posture, data honesty, documentation. Never on surface polish |
| **I-04** | Conway Reading | What team produced this? | Read duplication, naming drift and missing joins; predict team structure; verify against version history |
| **I-05** | Stated vs Revealed Vision | What is it actually for? | Write both independently; the distance between them is the product's central tension |
| **I-06** | Absence Audit | What can it not represent? | Against a domain reference model, enumerate absent fields per entity by category. Run *before* cataloguing what exists |
| **I-07** | Phantom Entity Census | What exists only as pixels? | Find every concept in the interface with no data behind it. **Output is a validated backlog** — someone judged it necessary and could not build it |
| **I-08** | Orphan Test | Is everything anchored? | For every dated or assignable entity, verify a reference to the domain's organising object. Unanchored entities break the promises that depend on them |
| **I-09** | Lifecycle Completeness | Can things end properly? | Trace each long-lived entity from creation to termination. Flag deletion used as a lifecycle state |
| **I-10** | Vocabulary Control Audit | Is the vocabulary governed? | Find free-text fields that should be enumerations; check whether downstream consumers assume fixed values. Silent exclusion is the signature failure |
| **I-11** | Temporal Model Test | Does it remember? | Test for versioning, effective dating, change attribution, point-in-time reconstruction |
| **I-12** | Workflow Termination Test | Does anything cause anything? | For every workflow, ask what it triggers. A system where all workflows terminate is a store, not an operating system |
| **I-13** | Destructive Action Audit | What can be lost? | Enumerate every irreversible action, its confirmation, its recoverability, its audit trail |
| **I-14** | Trust Boundary Map | Where does data cross? | Map every crossing of an authentication, confidentiality or organisational boundary. Flag every crossing outside the system's own control |
| **I-15** | Decision Support Audit | Does it help anyone decide? | Name five real decisions the target user makes; state the support provided for each. Usually the sharpest single finding in a study |
| **I-16** | Naked Number Test | Is any metric actionable? | For every displayed number, check for a trend, target, threshold or comparison. A number without one is not information |
| **I-17** | Navigation Axis Test | Does navigation match how users think? | Determine whether the axis is entity-first or domain-object-first. Entity-first navigation usually reifies a missing join |
| **I-18** | Design Regression Trace | What was designed and lost? | Compare prototypes to shipped screens; trace each loss to its structural cause |
| **I-19** | Supervision Tier Assignment | How much autonomy? | Assign every capability to T0–T4 and defend each boundary |
| **I-20** | Consequence/Determinacy Allocation | Automate or retain? | Plot work on the two axes. Determinacy decides whether; consequence decides supervision |
| **I-21** | Guardrail Specification | What must be prevented? | For each high-consequence failure mode, specify a blocking control that fails closed and logs attempts |
| **I-22** | Five-Class Classification | What do we do with each element? | KEEP / IMPROVE / REPLACE / REMOVE / NEW, with reason and action |
| **I-23** | Layer Separation | Where does value sit? | Separate record, coordination, reasoning and production layers; assess each independently |
| **I-24** | Defensibility Test | Should we build it? | Three questions: needs domain knowledge to specify? accumulates value? makes capability persistent? All three no = commodity |
| **I-25** | Minority-Correct Pattern Hunt | What did they know? | Find where the subject got something right *once* and did not generalise. Reveals what the team knew but could not systematise — and is usually the correct pattern |

---

## 9. Deliverable specification and instantiation contract

### 9.1 Artifact set

| Artifact | Required at | Location |
| --- | --- | --- |
| **Case study** | All tiers | `docs/academy/case-studies/CS-NNN-<subject>.md` |
| **Pattern promotions** | T2, T3 | Within the case study, S9 section; mirrored to the Pattern Library |
| **Lesson set** | T2, T3 | Within the case study, S8 section; mirrored to the Lesson Library |
| **Assumption register** | All tiers | Within the case study, S9 section |
| **Instrument amendments** | As arising | Proposed against §14 |

### 9.2 Naming and versioning

- Case studies: `CS-NNN`, sequential, permanent. Never renumbered.
- Case studies state the LREF version they instantiate: *"Conducted under LREF-01 v1.0."*
- Where a case study deviates from LREF-01, the deviation is declared in front matter with a reason and raised as a §14 amendment.

### 9.3 Required case-study front matter

Subject · repository or product identifier · study tier · LREF version · analyst · date · **licence position** · evidence base table with volumes · assumption count.

### 9.4 Required structure

A case study contains, in order: front matter · reading guide including the IP advisory · evidence base · executive summary · the nine stages · closing with audience-routing table · method note.

**The executive summary must contain:** a one-paragraph verdict, a numbered findings table with the consequence of each finding for Rafter, a maturity verdict, and a one-line strategic implication. It is written last and read first.

### 9.5 Format standards

- Text-renderable diagrams only, so artifacts diff meaningfully in version control.
- Findings in tables where comparison is intended; prose where argument is intended.
- Verbatim quotation of subject vocabulary, always marked as quotation.
- Assumptions marked inline *(assumption)* and gathered in the register.

---

## 10. Quality gates

A study is complete when all gates pass. Gates are checked by someone other than the analyst at T3.

| # | Gate | Test |
| --- | --- | --- |
| G1 | **Licence cleared** | Position determined and recorded before substantive work |
| G2 | **Promises traced** | Every unbuilt promise has a named structural cause |
| G3 | **Absence catalogued** | Absence Audit run on every entity |
| G4 | **Phantoms censused** | Phantom Entity Census complete and read as a backlog |
| G5 | **Workflows terminate-tested** | Termination Test run on every workflow |
| G6 | **Absent workflows enumerated** | Not only present ones |
| G7 | **Decision support audited** | Five real decisions named with support stated |
| G8 | **Supervision assigned** | Every AI opportunity has a tier and a guardrail |
| G9 | **Sequencing respected** | No leverage recommended before its safety substrate |
| G10 | **All five classes populated** | Including KEEP |
| G11 | **Practice specifics covered** | Jurisdiction, language, forum, matter shape |
| G12 | **Patterns re-expressible** | No pattern satisfiable by copying subject code |
| G13 | **Single highest-leverage change named** | One, specific, justified |
| G14 | **Backlog has foundations** | Blocking items identified |
| G15 | **Assumptions registered** | Every inference about non-visible components |
| G16 | **Teaching assets complete** | All nine S8 output types present |

---

## 11. Analyst anti-patterns

Recorded so they can be recognised in review.

| Anti-pattern | Symptom | Correction |
| --- | --- | --- |
| **The prosecution** | Study reads as an indictment; nothing is kept | Apply §3. Zero KEEP items means the study failed, not the subject |
| **The inventory** | Exhaustive catalogue of what exists; no absence analysis | Run I-06 before cataloguing |
| **The syntax trap** | Findings about code quality | Apply D1. If it evaporates on rewrite, delete it |
| **The colour critique** | UX section discusses appearance | Out of scope per S4 |
| **Happy-path capture** | Workflows without breakdown points | Mark breakdowns explicitly; they are the findings |
| **AI sprinkling** | "AI could help here" with no mechanism | Specify input, output, and the human's role |
| **The flat backlog** | Everything P0 | Identify foundations; sequence |
| **Commodity blindness** | Recommends building what is already commoditised | Run I-24 on every candidate |
| **Assumption laundering** | Inferences about unseen components stated as fact | Mark inline; register |
| **The lone genius read** | Conclusions from one pass, no evidence discipline | Cite artifacts; record verbatim |
| **Summarising at collection** | Vocabulary lost before synthesis | Collect verbatim; summarise once, centrally |
| **Redefining the method** | Study invents its own structure | §1. Instantiate; propose amendments separately |

---

## 12. Accumulation — how studies compound

LREF-01 exists so that the *n*th study is more valuable than the first. Three mechanisms:

**The Pattern Library.** Each study promotes patterns in eight fixed categories. Because categories are fixed, patterns from different subjects are comparable and collidable. **A pattern independently observed in two subjects is promoted to *confirmed*; a pattern contradicted by a second subject is downgraded to *contested* and annotated with the conditions under which each holds.**

**The Lesson Library.** Lessons accumulate by principle, not by subject. When a second study observes the same failure, the lesson is annotated with a second instance and its confidence rises. **Recurrence across independent subjects is the strongest available evidence that a failure is structural rather than incidental.**

**The Instrument Library.** Instruments that repeatedly produce findings are retained; instruments that produce nothing across three studies are retired. New instruments enter through §14. **The instrument set is the Academy's real accumulated capability** — the case studies are its output, but the instruments are what makes the next study fast.

**Cross-study synthesis.** After every third case study, a synthesis pass reconciles the libraries: collides patterns, promotes and downgrades, retires instruments, and updates the reference model that S6 compares against. Without this pass the libraries grow without converging.

---

## 13. Effort model

Indicative for T2. Discovery and domain extraction are consistently underestimated; they carry the study.

| Stage | Share | Note |
| --- | --- | --- |
| S1 Discovery | 15% | Includes licence clearance and evidence gathering |
| S2 Domain extraction | **25%** | Largest single stage. The absence analysis is the work |
| S3 Workflow extraction | 15% | Parallelisable with S2 |
| S4 UX analysis | 15% | Includes the full screen inventory |
| S5 AI opportunity mapping | 10% | Fast if S3 is thorough |
| S6 Gap analysis | 5% | Mechanical once prior stages are complete |
| S7 Product redesign | 5% | Fast; it is synthesis, not discovery |
| S8 Lesson extraction | 5% | Mostly reformatting existing findings |
| S9 Rafter extraction | 5% | The decisions are made by now |

**Parallelisation.** Evidence collection for S2, S3 and S4 runs concurrently across independent readers with disjoint scopes. Synthesis is always serial and always central.

---

## 14. Change control

LREF-01 is a controlled document.

| Change class | Examples | Approval |
| --- | --- | --- |
| **Editorial** | Wording, examples, formatting | Analyst; noted in change log |
| **Instrument** | New instrument; retirement after three barren studies | Academy lead |
| **Structural** | Adding, removing or reordering a stage; changing a required output | **Board** |
| **Doctrinal** | Amending §4 doctrines, §6 IP protocol, or the S5 sequencing rule | **Board** |

Deviations encountered during a study are recorded in that study's front matter and raised as amendment proposals. They are **never** absorbed silently — a methodology that drifts through undocumented local variation has ceased to be one.

---

## Appendix A — Instantiation checklist

Copy into each new case study and work down.

```
PRE-FLIGHT
[ ] Subject scored against §2.2 selection criteria
[ ] Study tier declared (T1/T2/T3)
[ ] Licence position determined and recorded          <- GATING
[ ] Evidence base identified and volumes recorded
[ ] Front matter complete per §9.3

S1 DISCOVERY
[ ] Stated vision recorded verbatim
[ ] Revealed vision derived independently
[ ] Promise Register complete, every promise marked
[ ] Roles enumerated: organisational AND capability layers
[ ] Maturity verdict with evidence table
[ ] Team topology read and verified

S2 DOMAIN EXTRACTION
[ ] Every entity inventoried, fields verbatim
[ ] Enumeration register verbatim
[ ] Relationship map incl. ABSENT required relationships
[ ] Absence Audit run per entity
[ ] Phantom Entity Census complete
[ ] Orphan Test run on all dated/assignable entities
[ ] Lifecycle Completeness run on all long-lived entities
[ ] Vocabulary Control Audit run
[ ] Successor entity set derived
[ ] G2 satisfied: every unbuilt promise has a structural cause

S3 WORKFLOW EXTRACTION
[ ] All workflows reconstructed with actors laned
[ ] Breakdown points marked
[ ] State machines registered
[ ] Validation recorded verbatim
[ ] Termination Test run on every workflow
[ ] ABSENT workflows enumerated and prioritised
[ ] Meta-pattern stated

S4 UX ANALYSIS
[ ] Screen inventory complete with category and state
[ ] Composition ratio computed and read
[ ] Per-screen analysis done
[ ] Prototype comparison and regression trace
[ ] Seven dimensions assessed
[ ] Decision Support Audit: 5 decisions named
[ ] Naked Number Test run
[ ] Scorecard graded

S5 AI OPPORTUNITY MAPPING
[ ] Consequence/determinacy grid plotted
[ ] Eliminate / assist / retain per workflow
[ ] Mechanism specified per opportunity
[ ] V/F ratings assigned
[ ] Agent architecture by tier T0-T4
[ ] Tool surface specified
[ ] Blocking guardrails listed
[ ] Waves sequenced; sequencing rule respected

S6 GAP ANALYSIS
[ ] Comparison frame stated; assumptions marked
[ ] All elements classified into five classes
[ ] All five classes non-empty
[ ] Priorities assigned
[ ] Practice-specific gaps covered
[ ] Integration thesis stated

S7 PRODUCT REDESIGN
[ ] Reframing statement
[ ] Nine-dimension contrast table
[ ] Remains / disappears / AI-native / event-driven /
    conversational / autonomous sections
[ ] Target architecture with core vs edge

S8 LESSON EXTRACTION
[ ] Curriculum thesis
[ ] Modules · Lessons · Exercises · Demonstrations
[ ] Challenges with success criteria
[ ] Discussion questions incl. ethics group
[ ] Reverse-engineering exercises
[ ] Prompt-engineering opportunities
[ ] Architecture discussions

S9 RAFTER EXTRACTION
[ ] Patterns promoted in all 8 categories, coded
[ ] Complementarity assessed; missing middle named
[ ] Defensibility Test run per candidate
[ ] Build / adopt / skip per layer
[ ] Highest-leverage single change named
[ ] Backlog prioritised, foundations marked
[ ] Assumption register complete

CLOSE-OUT
[ ] All 16 quality gates passed
[ ] Executive summary written (last)
[ ] Anti-pattern self-check (§11)
[ ] Deviations raised as §14 amendments
[ ] Libraries updated
```

---

## Appendix B — Worksheet templates

**Promise Register (I-01)**

| # | Promise (verbatim) | Source | Built? | Structural cause if not | Entity/relationship required |
| --- | --- | --- | --- | --- | --- |

**Absence Audit (I-06)** — per entity

| Category | Present | Absent | Consequence of absence |
| --- | --- | --- | --- |

**Phantom Entity Census (I-07)**

| "Entity" | Where it appears | Reality | Requirement it reveals | Backlog priority |
| --- | --- | --- | --- | --- |

**Workflow record (S3)**

| Field | Content |
| --- | --- |
| ID / Name / Actors / Trigger / Steps / Gateways / Breakdown points / Terminal state / What it triggers / Absent branches |  |

**Decision Support Audit (I-15)**

| Decision the user must make | Frequency | Support provided | Support required |
| --- | --- | --- | --- |

**AI Opportunity record (S5)**

| Field | Content |
| --- | --- |
| ID / Workflow / Eliminate / Assist / Retain / Mechanism / Agents / Guardrails / Tier / Value 1-5 / Feasibility 1-5 / Wave |  |

**Gap classification (I-22)**

| # | Element | Class | Reason | Action | Priority |
| --- | --- | --- | --- | --- | --- |

**Pattern promotion (S9)**

| Field | Content |
| --- | --- |
| Code / Category / Statement (one line) / Origin / Re-expression check / Confidence (candidate / confirmed / contested) |  |

**Assumption register (S9)**

| # | Assumption | Stage | Basis | Impact if wrong | Validation route |
| --- | --- | --- | --- | --- | --- |

---

## Appendix C — Prompt library

Reusable prompts for AI-assisted execution. Each is stated so it applies to any subject.

**Collection (parallel readers).** *"Read the following files completely. Extract [domain entities and fields / screens and navigation / workflows and API surface]. Report exact field names, enumerated values and labels **verbatim** with source locations. Record what is conspicuously absent for this domain, explicitly. Return a dense structured inventory. Do not summarise away detail."*

**Absence elicitation.** *"Here is the entity list from a [domain] system. List every field, entity and relationship a real [domain] practice requires that is missing. Organise by category. Do not comment on what is present."*

**Promise tracing.** *"Here are the stated objectives and the entity model. For each objective, identify the entities and relationships required to satisfy it. Mark each satisfiable or unsatisfiable, and name the structural cause of each failure."*

**Phantom detection.** *"Identify every concept referenced in this interface — labels, columns, metrics, headings — that has no backing data. For each, state the requirement it reveals."*

**Termination analysis.** *"For each workflow, state what it causes to happen next. Identify workflows that terminate without triggering anything."*

**Allocation.** *"For each task, place it on consequence (of error) and determinacy (of method). Assign eliminate / assist / automate-with-audit / retain, and a supervision tier T0–T4. Defend each boundary."*

**Adversarial review.** *"Argue that this analysis is wrong. Identify findings unsupported by evidence, inferences stated as fact, and conclusions that would change if a stated assumption were false."*

**Pattern abstraction.** *"Restate this finding as a pattern that applies to any system in this domain. It must be abstract enough that implementing it requires independent design work, and must not describe the subject's specific implementation."*

---

## Appendix D — Stage concordance

For readers of case studies produced before LREF-01 was formalised.

| LREF-01 stage | CS-001 phase(s) as originally published |
| --- | --- |
| S1 Discovery | Phase 1 |
| S2 Domain extraction | Phase 2 |
| S3 Workflow extraction | Phase 3 |
| S4 UX analysis | Phases 4 and 5 (screen inventory folded in) |
| S5 AI opportunity mapping | Phase 6 |
| S6 Gap analysis | Phase 8 |
| S7 Product redesign | Phase 7 (run before gap analysis; permitted under S7) |
| S8 Lesson extraction | Phase 9 |
| S9 Rafter extraction | Phases 8 and 10 combined |

CS-001 conformed to LREF-01 in substance. Its numbering differs because the methodology was abstracted from it retrospectively; it is not required to be renumbered.

---

## Change log

| Version | Date | Change | Approval |
| --- | --- | --- | --- |
| 1.0 | 2026-08 | Initial adoption. Abstracted from CS-001 (CaseAce). Nine stages, 25 instruments, 16 quality gates. | Board directive |
