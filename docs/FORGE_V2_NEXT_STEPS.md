# Forge v2 — Next Steps

## 🚀 Forge v2 preview MVP — LAUNCHED & LOCKED (2026-06-27)

Production is live (`master` @ `b038e8e`, tag `forge-v2-preview-production`). V1 archived.
**Stop building random mock-UI days.**

### Real-integration track (started)
- ✅ **Real Integration Architecture Day** — chose **Project Context Reader + Docs-Backed
  Memory v1** (Hybrid Project Manifest); see `FORGE_REAL_INTEGRATION_ARCHITECTURE.md`,
  `FORGE_REAL_INTEGRATION_ROADMAP.md`, `FORGE_REAL_INTEGRATION_SECURITY_MODEL.md`.
- ▶ **Next recommended task: Manifest Foundation Day (Stage 1)** — typed static manifest;
  Mission Control + Project Memory consume it (replace inline duplicate data). Read-only,
  no scanner, no AI, no secrets.

Recommended immediate step before more building: a human visual review of production
screenshots. Other eras still available:

1. **Real Integration Architecture** — choose the first real capability (AI backend,
   memory persistence, GitHub/Vercel metadata, evidence ingestion, or patch workflow);
   add auth/database only when needed; build one real capability at a time, behind the
   honesty layer (flip a label only when truly real).
2. **Demo / Screenshots / README** — public polish: README, product story, screenshots,
   demo video, landing refinement.
3. **Maintenance / Dependency Safety** — carefully address the pre-existing npm audit
   advisories, configure ESLint non-interactively, plan dependency upgrades + testing.

## Build-day progress (forge-v2-rebuild)

- ✅ Design System Day (`1485fd9`) · Shell/Layout Day (`91c6eb1`) · Workspace Command
  Surface Day (`7455565`) · Home/About Honesty Polish Day (`ea8bb5c`) · Vercel Preview QA
  Day (docs-only).
- **Verified:** local build green; `/`, `/workspace`, `/about` return HTTP 200 locally;
  production untouched (`master` @ `9681302`). Vercel preview status to be confirmed by Ram
  in the dashboard (CLI unauthenticated).
- **Recommended next:** Evidence Vault Mock Planning Day → Patch Review Mock Planning Day
  → Mission Control / Project Memory Shell Day. All mock/static; no real integrations.

## Status

- ✅ **Engine Priming (pass 1) completed** — planning docs, agent scaffolds, dependency
  readiness, Vercel/GitHub workflow, daily ritual — committed (`8c31e55`).
- ✅ **CEO Engine Priming v2 completed** — committed pass 1; staged GStack; hardened
  `CLAUDE.md`; rebuilt 10 active + 5 dormant agents; expanded to 12 commands; added CEO OS,
  model routing, design-system-day spec, commands index, git/vercel flow, toolchain status,
  setup + test-plan docs; pushed `forge-v2-rebuild` preview branch.

## Immediate follow-ups (optional, for Ram)

1. Review the CEO Priming v2 report (`FORGE_V2_ENGINE_PRIMING_V2.md`).
2. Confirm GStack is staged (`~/.claude/skills/gstack`); install **Bun** then run
   `./setup` to activate it (optional).
3. Optionally run the tiny `claude agents` test (`FORGE_V2_AGENT_VIEW_TEST_PLAN.md`).
4. Commit/push are already done for this pass (preview branch only).

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
