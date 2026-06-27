# Forge v2 — Agent View Test Plan (tiny, safe)

> A small, low-risk way for Ram to see "multiple agents working" via Claude Code Agent
> View — **without** risking the repo. Inspection only. No edits.

## Prerequisite

`claude agents` requires the standalone Claude Code terminal CLI, which is **not currently
on PATH** (see `FORGE_V2_LOCAL_TOOLCHAIN_STATUS.md`). Install/enable per
https://code.claude.com/docs/en/agent-view first.

## The test (≤2 read-only sessions)

1. Open the dashboard:
   ```
   claude agents
   ```
2. Create **session 1** (inspection only):
   > "Inspect `docs/FORGE_V2_DESIGN_SYSTEM_DAY_SPEC.md` and report whether the scope is
   > safe and self-consistent. **Do not edit anything.**"
3. Create **session 2** (inspection only):
   > "Inspect `.claude/agents` and report whether model/effort routing is consistent with
   > `docs/FORGE_V2_MODEL_ROUTING.md`. **Do not edit anything.**"
4. Watch the dashboard: see each session's working / needs-input / done state.
5. Read both reports.
6. **Stop after the reports.** Do not launch any code-editing session.

## Rules

- Max 2 sessions for the test (≤4 ever).
- Both sessions are **read-only**; neither edits files.
- No parallel edits to the same files, now or later.
- Mind token cost — close sessions when done.

## Success criteria

- Both sessions appear on the dashboard and complete.
- Two written reports returned.
- Repo unchanged (`git status --short` clean afterward).

## What this proves

Ram sees genuine multi-session orchestration safely, and gets two useful inspections of
the priming work as a bonus.
