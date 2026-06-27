---
description: How to open and use the VS Code Agents Window with Forge — optional/preview surface. Explains how it differs from the Claude Code panel and `claude agents`, and when to use or ignore it.
---

# /forge-vscode-agents-session

**Purpose:** Try VS Code's native Agents Window to track agent sessions/changes.

**When to use:** Experimenting with VS Code's built-in agent tracking on a current build.
**When NOT to use:** When it adds auth/setup friction with no benefit; do not rely on it
blindly.

## Required docs to read
`docs/FORGE_V2_VSCODE_AGENTS_SETUP.md`, `docs/FORGE_V2_VSCODE_AGENTS_TEST_PLAN.md`.

## Steps
1. Command Palette (`Ctrl+Shift+P`) → **"Chat: Open Agents Window"** (or `code --agents`).
2. Confirm the Forge workspace is selected.
3. Observe sessions/changes; do not start edits in this step.
4. Compare to the Claude Code extension panel and `claude agents`.
5. Decide which surface Ram prefers for Forge.

## Differences
- **VS Code Agents Window** = VS Code's native preview tracker.
- **Claude Code extension panel** = the primary Forge working surface.
- **`claude agents`** = Claude Code's terminal multi-session dashboard.

## Known limitations
Preview feature; may need GitHub/Copilot auth; local third-party CLI sessions may not
appear. Not interchangeable with Claude Code Agent View.

## Forbidden actions
No edits/installs/deploys in this exploration step.

## Final report format
**Opened?** · **Sessions visible?** · **Auth needed?** · **Comparison** · **Preference**.
