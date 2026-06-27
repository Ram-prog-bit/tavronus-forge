---
description: Start a Forge v2 mission day — confirm branch, git status, preview, and load project truth before any work.
---

# /forge-start-day

Run the start-of-day ritual for Tavronus Forge v2. **Do not edit anything in this step.**

1. Confirm branch: `git branch --show-current` (expect `forge-v2-rebuild`).
2. Confirm clean tree: `git status --short`.
3. Confirm latest commit: `git log --oneline -3`.
4. Confirm Vercel preview branch is `forge-v2-rebuild`.
5. Load project truth:
   - `docs/FORGE_V2_MASTER_BLUEPRINT.md`
   - `docs/FORGE_V2_REALITY_MAP.md`
   - `docs/FORGE_V2_DESIGN_SYSTEM.md` (when the mission is visual)
   - `docs/FORGE_V2_DAILY_RITUAL.md`
6. Report the current state and propose **one** mission for today.
7. **Plan only. Require scope approval before any implementation.**

Guardrails: port 5642 unchanged · no real integrations · no SOJ/Ziggma/Sushi · no broad
edits · no production merge.
