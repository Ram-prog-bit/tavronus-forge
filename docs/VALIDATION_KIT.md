# Tavronus Forge — Validation Kit

A practical runbook for testing Tavronus Forge with one person at a time. Use it
with `TESTER_FEEDBACK_FORM.md` (what they fill in) and
`VALIDATION_RESULTS_TEMPLATE.md` (how you summarize across testers). Builds on
`VALIDATION_PLAN.md` — this is the hands-on session script.

---

## 1. Purpose

Validate Tavronus Forge **before** any real-AI or backend work. The goal is to
learn whether the cockpit and workflow are genuinely useful as a mock, so we don't
overbuild. If the workflow doesn't land as a mock, a real model won't save it.

## 2. What we are testing

- Product clarity — can a person say what Forge is after a short demo?
- Workflow usefulness — does plan → prompt → review/debug → artifact → copy/apply fit how they build?
- Serious / premium feel — does it read as a real tool, not a toy?
- Mock/local comprehension — do they understand it's mock, and does the honesty build trust?
- Artifact usefulness — would they paste the output into a real AI tool with little editing?
- Mode value — which of Plan / Prompt / Review / Debug / Checklist pulls the most interest?
- Prompt-first hypothesis — is Prompt mode the right first real mode?

## 3. What we are NOT testing yet

- ❌ Real AI quality (no model is called)
- ❌ Real file writes (VFS is localStorage-only)
- ❌ Real terminal execution
- ❌ Auth, database, payments
- ❌ Backend reliability
- ❌ Full-repo indexing

## 4. Tester types

Aim for 5, varied:

1. **Ram (self)** — baseline; catch breaks before others see them.
2. **Beginner coder** — is the cockpit approachable or intimidating?
3. **Technical friend** — does it feel real/credible to an engineer?
4. **Experienced builder** — does the workflow fit a real building habit?
5. **Mentor / startup person** — pressure-test direction, wedge, demand.

## 5. Session setup checklist

- [ ] Repo open locally (`C:\Users\raghu\Tavronus Forge THE REAL ONE`).
- [ ] `npm install` (only if deps aren't installed).
- [ ] `npm run dev` running.
- [ ] Browser at **http://localhost:5642**; confirm the app loads.
- [ ] Confirm the **"Local Mock Mode"** badge (start screen) and **"Local Mock"** badge (Forge AI panel) are visible.
- [ ] `TESTER_FEEDBACK_FORM.md` open and ready to fill.
- [ ] You've decided not to oversell — it's an early local/mock MVP, and you'll say so.

## 6. Tester intro script (say out loud)

> "This is Tavronus Forge — a local AI coding cockpit I've been building. The idea
> is one workspace where you plan a project, generate strong prompts, and review or
> debug the file you're on, with the output structured to paste straight into Claude
> Code, Cursor, or GPT.
>
> Important: right now it's a **local mock** — it doesn't call a real AI model yet,
> and it doesn't touch your real files. What I want to know is whether the *workflow*
> feels useful, not whether the AI is smart, because there's no real AI in it yet.
>
> Be brutally honest — I'd rather hear what's confusing or weak than be told it's
> nice. There are no wrong answers."

Tone: casual but serious. No hype. Make the mock status unmissable up front.

## 7. Guided session flow (~22 min)

| Time | Segment |
|---|---|
| 2 min | Intro script (§6) + confirm they see the mock labels |
| 5 min | You demo the core loop (use `DEMO_SCRIPT.md`) |
| 10 min | Tester drives the 5 guided tasks (§8) — you stay quiet and watch |
| 5 min | Feedback via `TESTER_FEEDBACK_FORM.md` + scoring |

## 8. Guided tasks

Give one at a time. Phrase as goals, not clicks.

**Task 1 — Understand the start screen**
- Do: "Land on the start screen. Tell me what this app is and how you'd get in."
- Observe: do they read it as a serious tool? Do they spot the Local Mock badge?
- Success: they describe a coding/AI workspace and enter the workspace unaided.
- Red flags: confusion about what it is; missing the mock label entirely.

**Task 2 — Generate a build prompt (Prompt mode)**
- Do: "Open a file, switch to Prompt mode, and produce a prompt you'd paste into your AI tool."
- Observe: do they find the mode chips and the composer? Do they read the artifact?
- Success: they generate a Prompt artifact and say they'd paste it (as-is or lightly edited).
- Red flags: can't find how to generate; artifact reads as filler.

**Task 3 — Review or Debug a mock file**
- Do: "Switch to Review (or Debug) on the open file and tell me if the output would help."
- Observe: do they expect deeper, real-code understanding than a mock can give?
- Success: they see structure/value and understand it's templated, not reasoned.
- Red flags: they assume it deeply analyzed the file/repo when it didn't.

**Task 4 — Create a build checklist (Checklist mode)**
- Do: "Use Checklist mode to turn an idea into day-one tasks."
- Observe: is the output actionable to them?
- Success: they'd actually use the checklist as a starting point.
- Red flags: output feels generic/unusable.

**Task 5 — Copy / apply / mock-save flow**
- Do: "Copy an artifact, then use Apply on a code card, accept it, and save with Ctrl/Cmd+S."
- Observe: do they trust Apply? Do they understand it only edits the open tab and isn't a disk write?
- Success: they complete copy → apply → save and correctly describe it as local/mock.
- Red flags: they think Apply wrote to their real files or ran something.

## 9. Observation checklist (watch silently)

- [ ] Where do they hesitate or get lost?
- [ ] Do they notice the mock/local status without you pointing at it?
- [ ] Do they understand the five modes are different tools?
- [ ] Do they trust the generated output — and should they?
- [ ] Does copy/apply feel useful or pointless to them?
- [ ] Does the dense UI feel powerful or overwhelming?
- [ ] Which mode do they gravitate to first?

## 10. Post-session decision rules

- If testers **don't understand the product** → fix **positioning/onboarding** before features.
- If testers **like Prompt mode most** → real **Prompt mode** is the best next build.
- If testers **like Review/Debug most** → plan **code-context / project import** first (those modes need more than open-tab text).
- If testers are **confused by mock status** → improve **labeling/honesty** before any backend.
- If testers find the **UI too dense** → simplify **onboarding** before backend.
- If **artifact quality is weak** → improve **artifact templates** before real AI.

Record every session in `TESTER_FEEDBACK_FORM.md`, then roll up in `VALIDATION_RESULTS_TEMPLATE.md`.
