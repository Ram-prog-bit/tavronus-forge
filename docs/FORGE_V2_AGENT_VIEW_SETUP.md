# Forge v2 — Claude Code Agent View Setup

> Reference: https://code.claude.com/docs/en/agent-view ·
> Parallel agents: https://code.claude.com/docs/en/agents ·
> Subagents: https://code.claude.com/docs/en/sub-agents

## What Agent View is

A dashboard for **dispatching and managing multiple Claude Code sessions from one
screen**. It shows which sessions are working, which need input, and which are completed.
Best used as a **second-monitor command dashboard**.

It is **not** the same as:
- **Subagents** (`.claude/agents/*`) — specialized roles invoked within a session.
- **Agent Teams** — a different coordination concept.

## Local readiness (verified this pass)

- VS Code: ✅ 1.125.1 present.
- Claude Code: running as the **VS Code native extension**.
- Standalone **`claude` CLI: NOT on PATH** → `claude agents` cannot be launched from a
  terminal yet. **Status: ⚠️ likely-available-after-CLI-install.** Not faked.

## How to open it

```
claude agents
```

Requires the standalone Claude Code terminal CLI. If `claude` is not found, install/enable
the CLI per https://code.claude.com/docs/en/overview, then retry.

## Recommended second-monitor layout

- Main monitor: focused Claude Code chat (implementation).
- Second monitor: Agent View dashboard watching 2–4 **independent** sessions.
- Glance at the dashboard for "needs input / done"; do focused work on the main screen.

## When to use it

- Watching **independent, read-only** background sessions (inspection, research, reporting).
- Running a few separate investigations that don't touch the same files.

## When NOT to use it

- ❌ Do **not** let multiple agents **edit the same files at the same time** (collisions).
- ❌ Do **not** spin up 10 sessions — it multiplies token/quota usage.
- ❌ Do **not** start implementation tasks across many parallel sessions during priming.

## Token / cost warning

Each session runs separately and consumes quota independently. More sessions = more cost.
Keep it to **2–4** sessions and prefer inspection/reporting work.

## Recommended Forge usage

- **Agent View** → inspection / research / reporting (parallel, read-only).
- **Normal Claude Code chat** → focused implementation (one editor of record).
- **Git worktrees (later)** → when genuinely parallel **edits** are needed, isolate them
  per worktree rather than editing the same files concurrently.

See `FORGE_V2_AGENT_VIEW_TEST_PLAN.md` for a tiny, safe first test.
