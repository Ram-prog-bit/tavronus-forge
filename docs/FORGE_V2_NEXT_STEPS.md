# Forge v2 — Next Steps

## Status

- ✅ **Engine Priming completed** — planning docs, agent scaffolds, dependency readiness,
  Vercel/GitHub workflow, and daily ritual are in place on `forge-v2-rebuild`.

## Next recommended task

### Design System Day — and ONLY Design System Day.

Build the visual foundation before any command-center screen.

**In scope:**
- Design tokens (extend `tailwind.config.ts`: add `forge.violet`, status colors).
- Layout primitives (container, panel, grid, stack).
- Typography scale.
- Spacing scale (4px base / 8px grid).
- Core primitives: cards, buttons, panels, badges, status indicators, tabs.
- Empty / loading / error state styles.
- Motion tokens (150–300ms, reduced-motion).

**Exact boundaries (do NOT cross):**
- ❌ No app screen rebuild (no Mission Control, Agent Board, Evidence Vault, Patch Review).
- ❌ No agent orchestration implementation.
- ❌ No real integrations (AI/backend/auth/db/terminal/filesystem/browser/GitHub).
- ❌ No huge dependency installation beyond the documented essentials.
- ❌ No production merge to `master`.
- ❌ No port change (5642 stays).
- ❌ No force push, no history rewrite, no backup deletion.

**Before Design System Day starts:**
1. Confirm branch `forge-v2-rebuild`, clean tree.
2. Confirm the proposed token additions with the user.
3. Load `FORGE_V2_DESIGN_SYSTEM.md` and `FORGE_V2_REALITY_MAP.md`.
4. Plan first; approve scope; then build one area at a time.

## After Design System Day

Proceed through the roadmap in `FORGE_V2_MASTER_BLUEPRINT.md`: Shell/Layout →
Mission Control → Agent Board → Project Memory → Evidence Vault → Patch Review →
Vercel Preview QA → Polish/Responsive → Milestone Snapshot. Real integrations only
after the UI command center is coherent and honesty labels can be flipped truthfully.
