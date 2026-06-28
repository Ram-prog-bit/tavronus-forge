---
description: How to run Claude Code Agent View (`claude agents`) safely for Forge — 2-4 independent, read-only background sessions for inspection/research/reporting. No parallel edits to the same files.
---

# /forge-agent-view-session

**Purpose:** Use the Claude Code Agent View dashboard to watch a few independent sessions.

**When to use:** Parallel **inspection / research / reporting** that doesn't edit the same
files.
**When NOT to use:** Parallel **editing** of the same files; or spinning up many sessions.

## Required docs to read
`docs/FORGE_V2_AGENT_VIEW_SETUP.md`, `docs/FORGE_V2_AGENT_VIEW_TEST_PLAN.md`.

## Prerequisite
Requires the standalone `claude` CLI (currently not on PATH — see
`docs/FORGE_V2_LOCAL_TOOLCHAIN_STATUS.md`). Install/enable per
https://code.claude.com/docs/en/agent-view before using.

## Steps
1. Open the dashboard: `claude agents`.
2. Launch **2–4 max** read-only sessions, each a distinct inspection task.
3. Watch the working / needs-input / done states (ideal on a second monitor).
4. Collect each session's report; do not let any session edit shared files.
5. Stop sessions when reports are in.

## Forbidden actions
❌ >4 sessions · ❌ parallel edits to the same files · ❌ implementation across many
sessions during priming · ❌ ignoring token cost.

## Approval rules
Any edit/implementation surfaced by a session goes through normal approval.

## Final report format
**Sessions run** · **Each session's finding** · **Conflicts avoided** · **Next step**.
