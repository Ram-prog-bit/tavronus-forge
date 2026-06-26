# Tavronus Forge — Validation Plan

This plan exists to **prevent overbuilding**. Before any real AI, backend, or
secrets, we test whether the current mock cockpit is *useful enough* to justify
that cost. If the workflow doesn't land as a mock, a real model won't save it.

Pair this with `DEMO_SCRIPT.md` (how to show it) and `REAL_AI_ARCHITECTURE.md`
(what we'd build *if* validation passes).

---

## 1. Validation goal

Decide, with evidence, whether the current cockpit and workflow are useful enough
to justify making **one** Forge AI mode real. Output of this plan = a go/no-go
decision plus, if go, *which mode first* and *the smallest real upgrade worth building.*

## 2. What we are validating

- **Concept clarity** — do people understand what Tavronus Forge is within a minute?
- **Workflow usefulness** — does plan → prompt → review/debug → artifact → copy/apply
  map to how they actually build?
- **Copy-ready artifact quality** — is the output something they'd paste into a real
  AI tool with little or no editing?
- **Mode usefulness** — which of Plan / Prompt / Review / Debug / Checklist pulls interest?
- **Whether Prompt mode should become real first** — is it the clearest wedge?
- **Mock/local comprehension** — do users *get* that it's mock, and does the honesty
  build trust rather than disappointment?
- **UI density** — does the dense, monospace cockpit feel *powerful* or *overwhelming*?

## 3. What we are NOT validating yet

Explicitly out of scope for this round:

- ❌ Real AI output quality (no model is called).
- ❌ Real filesystem writes (the VFS is localStorage-only).
- ❌ Production backend reliability (there is no backend).
- ❌ Auth, payments, or database.
- ❌ Large-repo indexing / whole-project context.

Testing any of these now would be measuring something that doesn't exist.

## 4. Target testers

Small and varied beats large and uniform. Aim for **5**:

| # | Tester | Why they matter |
|---|---|---|
| 1 | **Ram (self)** | Baseline; catches obvious breaks before others see it. |
| 2 | **One technical friend** | Judges whether it feels real and credible to an engineer. |
| 3 | **One beginner coder** | Tests whether the cockpit is approachable or intimidating. |
| 4 | **One experienced builder** | Tests workflow fit against a real building habit. |
| 5 | **One mentor / startup person** | Pressure-tests direction, wedge, and demand. |

5 testers is enough to surface the big signals; don't wait to line up more.

## 5. Testing protocol

A ~22-minute session per tester. Keep it tight.

| Time | Segment | What happens |
|---|---|---|
| 2 min | **Intro** | One-sentence framing + "it's local/mock today." No feature dump. |
| 5 min | **Demo** | Run `DEMO_SCRIPT.md` (the 5-minute walkthrough). |
| 10 min | **Guided task** | Tester drives; you watch and stay quiet (see §6). |
| 5 min | **Feedback** | Ask the `DEMO_SCRIPT.md` questions; capture exact words. |
| — | **Notes** | Record manually in the §9 log immediately after, while fresh. |

Rules: don't rescue the tester too early; silence is data. Note every moment of
confusion and every "oh, nice."

## 6. Guided tasks

Give the tester these one at a time. Phrase them as goals, not clicks.

1. **Create a build prompt** — "You want to add a feature to the open file. Use the
   tool to produce a prompt you'd paste into your AI coding tool."
2. **Review a code snippet** — "Switch to Review mode and get a read on the open file.
   Tell me if the output would actually help you."
3. **Debug a fake issue** — "Pretend this file throws an error. Use Debug mode to get a
   cause + fix plan."
4. **Create a checklist** — "Turn an idea into day-one tasks using Checklist mode."
5. **Apply a mock patch** — "Use ApplyPreview to apply a change to the open tab, then
   save it. Tell me whether you trusted what it was about to do."

After each: "Was that useful? Would you do it this way for real?"

## 7. Scoring rubric

Score each tester 1–5 (1 = poor, 5 = excellent) unless noted:

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| **Understands product** | "No idea what this is" | "Roughly gets it" | "Nailed it in one line" |
| **Trusts mock honesty** | Felt misled | Neutral | "Appreciated the honesty" |
| **Finds UI usable** | Overwhelmed/lost | Manageable | "Felt powerful and clear" |
| **Finds artifacts useful** | "Just formatting" | "Okay-ish" | "I'd paste this as-is" |
| **Would use Prompt mode** | No | Maybe | "Yes, regularly" |
| **Wants real AI version** | No interest | Curious | "Tell me when it's live" |
| **Confusion level** *(1=high, 5=low)* | Constantly confused | Some friction | Smooth throughout |
| **Perceived seriousness / premium feel** | Looks like a toy | Decent | "Feels like a real tool" |

Average per tester and per dimension. Watch the *spread*, not just the mean.

## 8. Pass/fail thresholds

Practical gates that turn scores into decisions:

- **If people don't understand the product** (low "Understands product") →
  fix **positioning / docs / demo framing** before anything else. Do not build.
- **If people dislike artifact quality** (low "Finds artifacts useful") →
  improve **prompt/artifact structure and copy** *before* real AI. A real model on a
  bad artifact shape still produces a bad artifact.
- **If Prompt mode gets the strongest interest** → make **Prompt mode real first**
  (see `REAL_AI_ARCHITECTURE.md`).
- **If Review / Debug get the strongest interest** → plan **real code context / import
  first**, because those modes are only as good as the context they see — don't make
  them "real" on open-tab text alone.
- **If users are confused by mock/local status** → improve **labeling and honesty cues**
  before any backend. Trust is the product's foundation.

**Overall go/no-go:** proceed to real-AI planning only if a clear majority understand
the product, trust the honesty, and at least one mode draws genuine "I'd use this."

## 9. Feedback log template

Copy one block per tester.

```
### Tester: __________   Type: (self / tech friend / beginner / builder / mentor)   Date: ____

Scores (1–5):
- Understands product:        _
- Trusts mock honesty:        _
- Finds UI usable:            _
- Finds artifacts useful:     _
- Would use Prompt mode:      _
- Wants real AI version:      _
- Confusion level (1 hi–5 lo):_
- Perceived premium feel:     _

Strongest mode interest: (Plan / Prompt / Review / Debug / Checklist)
Would paste prompt as-is? (yes / edit first / no)
Top confusion moment: ______________________________________________
Best "oh, nice" moment: ____________________________________________
Would they use it? (yes / later / no) — why: _______________________
Exact quote worth keeping: "________________________________________"
```

Roll all testers into one summary table when done.

## 10. Decision checklist

Answer these explicitly at the end of the round:

- [ ] **Is the product concept clear?** (Did most testers get it fast?)
- [ ] **Is the mock version useful enough** to justify real-AI cost?
- [ ] **Which mode should become real first?** (Prompt is the hypothesis — confirm or refute.)
- [ ] **What is the smallest real-AI upgrade worth building?** (One mode, server route, mock default.)
- [ ] **What should NOT be built yet?** (Reaffirm: no auth, DB, file writes, terminal, indexing.)

Only after this checklist is filled does `REAL_AI_ARCHITECTURE.md` Phase B become eligible.
