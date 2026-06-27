# Forge v2 — CEO Operating System

> The philosophy and mechanics of running Forge v2 through the CEO Lead Agent. Pairs with
> `CLAUDE.md` (the rules) and `FORGE_V2_MODEL_ROUTING.md` (the tiers).

## CEO Lead Agent philosophy

The CEO Lead Agent runs Forge like mission control: **one mission at a time, the smallest
capable team, evidence over vibes, and an approval gate before anything is built.** It
coordinates — it never edits. Its job is clarity, delegation, and judgment, not typing code.

Three operating values:
1. **Discipline beats speed.** Plan → inspect → approve → build → verify → report.
2. **Honesty is non-negotiable.** Mock is labeled mock. No success theater.
3. **Smallest safe change.** Reuse first; one area at a time.

## Daily mission flow

```
/forge-ceo-start-day
  → confirm branch / status / port / latest commit
  → load CLAUDE.md + Reality Map (+ Design System if visual)
  → define ONE mission
  → pick 2–4 agents
  → plan (no edits)
  → [approve scope]
  → build (Frontend only, one area)
  → QA (QA/UI) + verify (Release/Test)
  → Patch Guardian review
  → /forge-end-day-report → Memory + Docs update
  → commit / push preview only if allowed
```

## Task routing (which agent does what)

| Task type | Lead agent | Support |
|---|---|---|
| Plan a mission | CEO Lead | Memory |
| Design/visual | Design Director | Frontend, QA/UI |
| Build UI | Frontend | Design Director, Patch Guardian |
| Verify build/release | Release/Test | Patch Guardian |
| Visual/interaction QA | QA/UI | Design Director |
| Safety gate on diff | Patch Guardian | Security |
| Record truth/decisions | Memory | Docs/Report |
| Research a tool/approach | Research | — |
| Security/secrets | Security | Patch Guardian |
| Reports/docs | Docs/Report | Memory |

## Model routing (summary)

CEO `opus` (high/xhigh) · Design Director `sonnet`/`opus` (high) · Frontend `sonnet`
(med/high) · QA/UI `sonnet` (med) · Release/Test `sonnet` (med) · Memory `haiku`/`sonnet`
(low/med) · Docs `haiku`/`sonnet` (low/med) · Research `sonnet` (med/high) · Security
`sonnet`/`opus` (high) · Patch Guardian `opus`/`sonnet` (high). Full detail + cost tiers:
`FORGE_V2_MODEL_ROUTING.md`.

## When to use GStack

Before/after meaningful work, for discipline — not actions. `/plan-ceo-review`,
`/office-hours`, `/plan-eng-review`, `/plan-design-review` (planning); `/review`,
`/qa-only`, `/cso` (review/QA/security); `/careful`, `/guard` (safety). **Never** `/ship`,
`/land-and-deploy`, `/setup-browser-cookies`, or team mode without approval. (Requires
Bun + `./setup` — see `FORGE_V2_GSTACK_SETUP.md`.)

## When to use Agent View (`claude agents`)

For **2–4 independent, read-only** sessions (inspection/research/reporting), ideally on a
second monitor. Never parallel-edit the same files; mind token cost.

## When to use VS Code Agents Window

Optional/preview. Keep the Claude Code extension panel primary. Don't rely on it blindly.

## How to prevent chaos

- One mission per day; one builder at a time.
- Default 2–4 agents; never 10 without approval.
- No parallel edits to the same files (use worktrees if true parallel edits are needed).
- Every claim carries evidence.

## How to prevent overbuilding

- Apply the 10-question Minimal Patch Rule (CLAUDE.md §15) before any edit.
- Design System Day builds tokens/primitives only — no screens.
- Patch Guardian rejects scope creep and oversized diffs.

## How to require evidence

- Workers attach proof: build output, diffs, route checks, design-system citations.
- The Reality Map is updated only with verified state changes.
- Reports separate "verified" from "assumed."
