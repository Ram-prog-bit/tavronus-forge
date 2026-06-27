---
description: Run Design System Day for Forge v2 — tokens, CSS variables, primitives, typography, spacing, panels, cards, buttons, badges, status styles, motion rules ONLY. No screens, no integrations.
---

# /forge-design-system-day

**Purpose:** The first real build day — establish the visual foundation only.

**When to use:** The next build day after CEO Engine Priming v2.
**When NOT to use:** For any command-center screen, agent board, evidence vault, or patch
review implementation.

## Required docs to read
`docs/FORGE_V2_DESIGN_SYSTEM.md`, `docs/FORGE_V2_DESIGN_SYSTEM_DAY_SPEC.md`,
`docs/FORGE_V2_REALITY_MAP.md`, `CLAUDE.md`.

## Allowed agents
CEO Lead, Design Director, Frontend, QA/UI, Patch Guardian, Release/Test, Docs/Report.

## Allowed work
Design tokens, CSS variables, typography hierarchy, spacing scale, panels, cards, buttons,
badges, status styles, motion rules, layout primitives. Extend `tailwind.config.ts`
(`forge.violet` + status colors). Reuse the existing `forge` palette.

## Forbidden actions
❌ Full screen rebuild · ❌ Agent Board / Evidence Vault / Patch Review implementation ·
❌ backend/auth/db/real AI/filesystem/terminal/browser · ❌ route changes · ❌ port change
· ❌ new heavy deps (shadcn/CVA without approval) · ❌ production merge/deploy.

## Steps
1. CEO confirms branch/status/port; loads design docs.
2. Design Director proposes/approves the token + primitive plan (no screens). Approve scope.
3. Frontend implements one area at a time.
4. QA/UI checks states + routes `/`, `/workspace`, `/about`.
5. Release/Test runs `npm run build`; confirms port/routes.
6. Patch Guardian reviews the diff.
7. Docs/Report writes the report; Memory updates the log + Reality Map.

## Build / test rules
`npm run build` must pass. Routes and port 5642 unchanged.

## Git rules
Commit only if asked; push `forge-v2-rebuild` only if approved. Never `master`/force.

## Approval rules
Scope approved before code. Patch Guardian sign-off before commit.

## Final report format
**Tokens/primitives built** · **Files changed** · **Build** · **QA** · **Guardian verdict**
· **Reality Map deltas** · **Next day**.
