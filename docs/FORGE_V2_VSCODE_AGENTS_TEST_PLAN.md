# Forge v2 — VS Code Agents Window Test Plan (tiny, safe)

> A small, low-risk way for Ram to try the VS Code Agents Window and compare it to Claude
> Code's Agent View. Exploration only — no edits.

## Prerequisite

VS Code 1.125.1 is installed. The Agents Window is a preview feature and may require a
current build and possibly GitHub/Copilot auth (see `FORGE_V2_VSCODE_AGENTS_SETUP.md`).

## The test

1. Open the Forge workspace in VS Code (`C:\Users\raghu\Tavronus Forge THE REAL ONE`).
2. Open the Command Palette: `Ctrl+Shift+P`.
3. Run: **"Chat: Open Agents Window"** (or from a terminal: `code --agents`).
4. Confirm the workspace context is the Forge repo.
5. Observe whether sessions/chats are tracked and whether any auth is requested.
6. **Do not start any edits.**
7. Compare to Claude Code's Agent View (`claude agents`) and the Claude Code extension panel.
8. Decide which surface Ram prefers for Forge.

## Rules

- Exploration only — no file edits, no installs, no deploys.
- If it demands auth/setup that distracts from the mission, stop and note it.

## Success criteria

- The Agents Window opens (or a clear reason why it doesn't is recorded).
- Ram can state a preference: VS Code Agents Window vs Claude Code Agent View vs the
  extension panel.

## Notes to capture

- Did it open on the current build?
- Did it require GitHub/Copilot auth?
- Did Claude Code terminal sessions appear, or only VS Code-native ones?
- Verdict: use / ignore for now.
