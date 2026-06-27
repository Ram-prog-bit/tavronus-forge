# Forge v2 — Agent System

> Complete roster of Forge v2 subagents (files in `.claude/agents/`). 10 active +
> 5 dormant. Model/effort are recommendations — verify aliases locally; set effort at
> runtime if frontmatter `effort` isn't supported. Pairs with `FORGE_V2_MODEL_ROUTING.md`.

## Active agents (10)

| Agent (file) | Model | Effort | Can edit? | Edits what | Approval gate |
|---|---|---|---|---|---|
| `forge-ceo-lead-agent` | opus | high/xhigh | No | — | Approves implementation |
| `forge-design-director-agent` | sonnet (opus critical) | high | No | — | Signs off design |
| `forge-frontend-agent` | sonnet | med/high | **Yes** | app/UI code, **approved scope only** | After scope approval |
| `forge-qa-ui-agent` | sonnet | medium | No | — | Reports only |
| `forge-release-test-agent` | sonnet | medium | No | — | Before push/merge |
| `forge-memory-agent` | haiku/sonnet | low/med | Docs only | memory/log docs | For changing decisions |
| `forge-patch-guardian-agent` | opus (sonnet routine) | high | **Never** | — | The gate itself |
| `forge-research-agent` | sonnet | med/high | No | — | Before installs/integrations |
| `forge-security-agent` | sonnet (opus critical) | high | No | — | Escalates exposure |
| `forge-docs-report-agent` | haiku/sonnet | low/med | Docs only | docs/reports | Flags missing evidence |

### Responsibilities (active)

- **CEO Lead** — clarify mission, plan, pick 2–4 agents, merge findings, gate approvals. Coordinates only.
- **Design Director** — enforce the design system; approve tokens/primitives; block vibe-coded/over-glow UI.
- **Frontend** — the one builder; implement approved UI minimally, one area at a time; reuse patterns.
- **QA/UI** — test routes/layout/responsiveness/states/a11y basics; evidence; report only.
- **Release/Test** — build/lint, diff, port/route checks, Vercel readiness; recommend commit msg.
- **Memory** — keep Reality Map + Daily Log + decisions current with provenance.
- **Patch Guardian** — review diffs for risk/forbidden changes/rollback; approve or reject; never edits.
- **Research** — bounded research; cite official sources; separate hype from fact; vet tools pre-install.
- **Security** — secrets/exposure/dependency-risk review; never prints secrets; never invents issues.
- **Docs/Report** — final reports; readable, honest docs.

## Dormant agents (5) — planned, not active

| Agent (file) | Planned model | Activation |
|---|---|---|
| `later-forge-vercel-deployment-agent` | sonnet | Explicit approval; never deploys prod |
| `later-forge-github-pr-agent` | sonnet | Explicit approval; no push/merge w/o approval |
| `later-forge-browser-qa-agent` | sonnet | Approval + tooling (no Playwright now) |
| `later-forge-code-map-agent` | sonnet | Approval + tooling (no Graphify/ECC now) |
| `later-forge-integration-agent` | sonnet/opus | Per-integration approval (no real backend/auth/db/AI now) |

Dormant agents are **documentation only** until Ram activates them. They are never part of
the default 2–4 agent roster.

## Permissions model

- Only **Frontend** edits app code, and only within an approved scope, one area at a time.
- **Memory** and **Docs/Report** may edit docs only.
- **Patch Guardian** never edits — it reviews.
- All others are inspect/report only.
- No agent may: change port 5642, change routes, add real integrations, install tools, push
  to `master`, force push, deploy production, or reference SOJ/Ziggma/SushiSwap.

## Shared output discipline

Every agent returns: **what it did/found · evidence · honesty labels (where relevant) ·
risks · recommended next step / escalation.** Claims without evidence are not accepted.

## Default rosters

- **Generic mission:** CEO + 1–3 workers (2–4 total).
- **Design System Day:** CEO, Design Director, Frontend, QA/UI, Patch Guardian,
  Release/Test, Docs/Report (Memory supports).
