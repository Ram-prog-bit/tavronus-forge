---
description: Audit the Forge v2 agent system and project state without editing anything.
---

# /forge-agent-audit

Read-only audit. **Do not edit.**

1. Confirm branch and `git status --short`.
2. Load `docs/FORGE_V2_AGENT_SYSTEM.md` and `docs/FORGE_V2_REALITY_MAP.md`.
3. List active MVP agents (`.claude/agents/*-agent.md`, excluding `later-*`) and confirm
   each has: role, never-do rules, edit permission, model tier note.
4. Confirm dormant later-agents remain dormant.
5. Confirm guardrails are intact across agents: port 5642, no real integrations, no
   contamination, Patch Guardian is review-only, only Frontend Agent edits.
6. Report findings with evidence. Recommend the smallest safe fix for any gap — do not
   apply it without approval.
