# Forge v2 — VS Code Agents Window Setup

> Reference: https://code.visualstudio.com/docs/agents/agents-window ·
> VS Code download: https://code.visualstudio.com/download ·
> Insiders: https://code.visualstudio.com/insiders

## What it is

The **VS Code Agents Window** is a preview, agent-first surface inside VS Code for
tracking agent sessions and the changes they make. It is **not** a GitHub repo you clone —
it ships with VS Code.

## Local readiness (verified this pass)

- VS Code: ✅ **1.125.1** (stable, x64) installed.
- The Agents Window is a recent/preview feature; on stable it may require a current build
  and possibly **GitHub/Copilot auth** depending on setup. **Status: available-to-try,
  with the caveat below.** Not faked.

## How to open it

- Command Palette (`Ctrl+Shift+P`) → **"Chat: Open Agents Window"**, or
- CLI: `code --agents`

## How it differs from other surfaces

| Surface | What it is |
|---|---|
| **VS Code Agents Window** | VS Code's built-in agent-session tracker (preview). |
| **Claude Code extension panel** | The Claude Code chat/agent UI inside VS Code (what Forge uses today). |
| **`claude agents` (Agent View)** | The Claude Code **terminal** multi-session dashboard (needs the standalone CLI). |

## Known limitations

- Preview feature — behavior and availability vary by VS Code version.
- May require GitHub/Copilot auth for some functionality.
- **Local third-party CLI sessions may not appear** here depending on the exact
  integration — do not assume Claude Code terminal sessions show up automatically.
- It is **not** the Claude Code terminal Agent View and is not interchangeable with it.

## How to use with Tavronus Forge

- Optional. Use it to **observe** agent sessions and changes if it integrates cleanly.
- Keep the **Claude Code extension panel** as the primary working surface for Forge.

## When Ram should use it

- When experimenting with VS Code's native agent tracking, on a current build.

## When to ignore it

- If it requires auth/setup that distracts from the actual mission.
- If Claude Code's own Agent View / extension panel already covers the need.
- **Do not rely on it blindly** during priming or Design System Day.

See `FORGE_V2_VSCODE_AGENTS_TEST_PLAN.md` for a tiny, safe first test.
