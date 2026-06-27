# Forge v2 — Agent Commands Index

> Every `.claude/commands/*` workflow prompt: what it does, when to use it, and its risk.
> All commands are reusable prompts — none take destructive actions on their own.

| Command | What it does | When to use | Risk |
|---|---|---|---|
| `forge-ceo-start-day` | CEO opens the day: branch/status/port, loads truth, one mission, 2–4 agents, plan before edits | Start of every session | Low (read-only planning) |
| `forge-design-system-day` | Runs Design System Day — tokens/primitives only, no screens | Next build day | Medium (edits, scoped; build-gated) |
| `forge-agent-audit` | Inspection-only audit of repo + agent system | Health/consistency checks | Low (no edits) |
| `forge-gstack-review` | Safe GStack planning/review/QA/security; blocks ship/deploy/cookies | Before/after big work | Low–Med (review only; needs Bun) |
| `forge-release-check` | Build + diff + port/route + forbidden-change checks; recommends commit msg | Before commit | Low (read/build only) |
| `forge-end-day-report` | Verify, review diff, update daily log, next task + commit msg | End of day | Low (docs; commit only if allowed) |
| `forge-agent-view-session` | How to run `claude agents` safely (2–4 read-only sessions) | Parallel inspection | Med (token cost; needs CLI) |
| `forge-vscode-agents-session` | How to open/use VS Code Agents Window | Exploring VS Code agents | Low (exploration) |
| `forge-commit-preview` | Commit reviewed work + push `forge-v2-rebuild` only | After checks pass + Guardian approves | Med (push preview branch) |
| `forge-memory-update` | Update Reality Map + Daily Log + decisions (docs only) | After decisions / EOD | Low (docs only) |
| `forge-patch-guardian-review` | Classify diff risk, scan forbidden changes, approve/reject | Before serious commits | Low (review only) |
| `forge-risk-check` | Sweep the risk register (overbuild, fake AI, contamination, etc.) | Before big pushes / weekly | Low (inspection) |

## Usage notes

- **Start with** `forge-ceo-start-day` every day.
- **Build days** run `forge-design-system-day` (next) then later day-specific flows.
- **Before commit:** `forge-release-check` → `forge-patch-guardian-review` →
  `forge-commit-preview` (only if approved).
- **End of day:** `forge-end-day-report` + `forge-memory-update`.
- The only commands that change anything are `forge-design-system-day` (scoped edits),
  `forge-commit-preview` (commit + preview push), `forge-memory-update` /
  `forge-end-day-report` (docs). All others are read-only.

## Hard limits shared by all commands

Port 5642 unchanged · routes unchanged · no real integrations without approval · no
contamination · no force push · no master push/merge · no production deploy · GStack
shipping/credential commands forbidden.
