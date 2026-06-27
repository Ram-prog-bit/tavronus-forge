---
description: Run Design System Day for Forge v2 — tokens and primitives only, no screens.
---

# /forge-design-system-day

The first real build day. **Design System Day ONLY.** No command-center screens.

1. Confirm branch `forge-v2-rebuild` and clean `git status --short`.
2. Load `docs/FORGE_V2_DESIGN_SYSTEM.md` and `docs/FORGE_V2_REALITY_MAP.md`.
3. Propose the token + primitive plan (no screens). Get scope approval.

**In scope:**
- Tokens: extend `tailwind.config.ts` (add `forge.violet` + status colors).
- Layout primitives, typography scale, spacing scale.
- Cards, buttons, panels, badges, tabs, status indicators.
- Empty / loading / error state styles; motion tokens (150–300ms, reduced-motion).

**Out of scope (do NOT do):**
- ❌ App screen rebuilds (Mission Control, Agent Board, Evidence Vault, Patch Review).
- ❌ Agent orchestration, real integrations, large dependency installs.
- ❌ Port change, production merge, force push.

4. Build one area at a time (Frontend Agent). Reuse existing `forge` palette.
5. Patch Guardian reviews the diff. Release/Test runs `npm run build`.
6. Report; update `docs/FORGE_V2_DAILY_MISSION_LOG.md`.
