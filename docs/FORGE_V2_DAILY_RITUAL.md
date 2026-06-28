# Forge v2 — Daily Ritual

> The repeatable rhythm for every Forge v2 build day. Discipline in, quality out.

## Start-of-day checklist

1. Confirm branch (`git branch --show-current` → `forge-v2-rebuild`).
2. Confirm git status clean (`git status --short`).
3. Confirm latest commit (`git log --oneline -3`).
4. Confirm Vercel preview branch is `forge-v2-rebuild`.
5. Load `docs/FORGE_V2_REALITY_MAP.md`.
6. Load `docs/FORGE_V2_DESIGN_SYSTEM.md` (for visual missions).
7. Choose **one** mission.
8. Plan before editing.
9. Assign agents (CEO plans, workers inspect, Frontend builds, Patch Guardian gates).
10. Approve scope before any code.

## Mid-day check

1. Still on `forge-v2-rebuild`? Still one mission?
2. Scope unchanged, or did it creep? (If it crept, re-approve or stop.)
3. Still ≤4 agents? No parallel edits to the same files?
4. Build still green after the latest change?
5. Honesty labels still accurate for anything touched?
6. Any blocker to surface to Ram now rather than at end of day?

## End-of-day checklist

1. Run build/test/checks (`npm run build`).
2. Review the UI visually (preview URL if provided).
3. Review `git diff` and `git diff --stat`.
4. Confirm no forbidden changes (port 5642, integrations, contamination, secrets).
5. Update `docs/FORGE_V2_DAILY_MISSION_LOG.md`.
6. Commit with a clear conventional message (only if the user asked).
7. Push the preview branch (only if approved).
8. Save the final report.

## Future day categories

Run one category per day, in roadmap order:

- **Design System Day** — tokens, primitives, typography, spacing, cards, buttons,
  panels, badges, status styles. (First real build day.)
- **Shell / Layout Day** — app frame, navigation, panel system.
- **Mission Control Day** — overview screen (mock data).
- **Agent Board Day** — agent cards + status (mock).
- **Project Memory Day** — memory surface (mock).
- **Evidence Vault Day** — evidence cards (mock).
- **Patch Review Day** — diff + approval UI (mock).
- **Vercel Preview QA Day** — preview deploy review loop.
- **Polish / Responsive Day** — refinement, breakpoints, motion polish.
- **Milestone Snapshot Day** — tag a stable v2 checkpoint.

## Invariants every day

Port **5642** unchanged · no real integrations without approval · no SOJ/Ziggma/Sushi ·
one builder at a time · evidence for every claim · honesty labels accurate · no force
push · no production merge without approval · backup branch never deleted.
