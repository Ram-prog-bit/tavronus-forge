# Forge v2 — CEO Engine Priming v2

> The second, deeper priming pass. Committed the first pass, staged GStack, hardened the
> CEO operating system, rebuilt the agent roster, expanded commands and docs, and pushed
> the preview branch. **Still engine priming — not the rebuild.**

_Date: 2026-06-27. Branch: `forge-v2-rebuild`._

## What this pass did

1. **Committed pass-1 priming** — `chore: prime forge v2 engine and agent workflow`
   (commit `8c31e55`). Build verified green first.
2. **Checked the local toolchain** → `docs/FORGE_V2_LOCAL_TOOLCHAIN_STATUS.md`.
3. **Staged GStack** at `~/.claude/skills/gstack` (v1.58.5.0). `./setup` deferred — Bun
   is missing (hard requirement). → `docs/FORGE_V2_GSTACK_SETUP.md`.
4. **Documented Agent View + VS Code Agents** readiness and test plans.
5. **Hardened `CLAUDE.md`** into a 24-section CEO operating manual.
6. **Rebuilt the agent roster**: 10 active `forge-*` agents + 5 dormant `later-forge-*`
   agents, each with model + effort guidance.
7. **Expanded commands** to 12 reusable workflow prompts.
8. **Expanded docs** (CEO OS, model routing, design-system day spec, commands index,
   git/vercel flow, risk register, test plans, updates to existing docs).
9. **Committed + pushed** `forge-v2-rebuild` (preview branch only).

## What was committed

- Pass 1: `8c31e55` (docs/agents/commands/deps from the first priming).
- Pass 2: `chore: harden forge v2 ceo agent workflow` (this pass — see final report for hash).

## What was installed / staged

- **Installed (repo deps):** none new this pass (the 4 UI deps came in pass 1).
- **Staged (global, outside repo):** GStack v1.58.5.0 at `~/.claude/skills/gstack`.
  `./setup` **not run** (Bun missing).

## What was updated

- `CLAUDE.md` (CEO operating system).
- All `.claude/agents/*` (renamed/rebuilt to `forge-*` + `later-forge-*`).
- All `.claude/commands/*` (upgraded + expanded to 12).
- Docs: agent system, daily ritual, reality map, dependency plan, risk register,
  next steps; plus new CEO OS, model routing, design-system-day spec, commands index,
  git/vercel flow, toolchain status, GStack/Agent-View/VS-Code setup + test plans.

## What remains forbidden

App UI rebuild · screen redesign · behavior/route/port changes · real backend/auth/db/AI/
filesystem/terminal/browser · payments · random MCP servers · ECC/Graphify/Ponytail/
Playwright/browser-automation/AI-SDK/auth-db installs · production deploy · master merge ·
force push · history rewrite · backup deletion · SOJ/Ziggma/SushiSwap contamination ·
GStack team mode / `/ship` / `/land-and-deploy` / `/setup-browser-cookies`.

## What is next

**Design System Day only.** See `docs/FORGE_V2_DESIGN_SYSTEM_DAY_SPEC.md` and
`docs/FORGE_V2_NEXT_STEPS.md`. Optional: install Bun to activate GStack; optionally test
`claude agents` with the tiny safe plan.
