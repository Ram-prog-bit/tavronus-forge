---
description: End a Forge v2 mission day — verify, review diff, log, and prepare a clear commit (no push unless approved).
---

# /forge-end-day-report

Run the end-of-day ritual.

1. Run build/test/checks (`npm run build`); record results.
2. Review the UI visually (preview URL if provided) against `FORGE_V2_DESIGN_SYSTEM.md`.
3. Review `git diff` and `git diff --stat`.
4. Confirm no forbidden changes: port 5642, no integrations, no contamination, no secrets.
5. Update `docs/FORGE_V2_DAILY_MISSION_LOG.md` with: mission, completed, evidence,
   blockers, approvals needed, honesty changes, next mission.
6. Propose a clear conventional commit message (e.g. `docs:` / `style:` / `feat:`).
   **Do not commit unless the user explicitly asked.**
7. **Do not push** unless the user explicitly approved pushing the preview branch.
8. Save the final report.
