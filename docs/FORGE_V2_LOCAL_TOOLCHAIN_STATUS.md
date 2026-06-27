# Forge v2 — Local Toolchain Status

> Snapshot of the local development toolchain on Ram's machine, taken during CEO Engine
> Priming v2. Honest readiness assessment — no faked availability.

_Environment: Windows 11, primary shell PowerShell, Git Bash available._

## Versions

| Tool | Status | Version / Detail |
|---|---|---|
| Claude Code | ⚠️ partial | Running as the **VS Code native extension** (`~/.claude/` data dir present: backups, ide, projects, sessions…). The standalone **`claude` CLI is NOT on PATH** (Windows or Git Bash). |
| Git | ✅ ready | `git version 2.50.0.windows.1` |
| Node.js | ✅ ready | `v20.15.0` |
| npm | ✅ ready | `10.7.0` |
| Bun | ❌ missing | Not installed (no `~/.bun/bin/bun`, not on PATH). |
| VS Code | ✅ ready | `1.125.1` (stable, x64) |

## Readiness summary

- **App build/dev:** ✅ fully ready (Node 20 + npm 10 + Next 14). `npm run build` passes.
- **Git/GitHub flow:** ✅ ready (Git 2.50, origin linked).
- **VS Code:** ✅ ready (1.125.1). Agents Window availability assessed separately in
  `FORGE_V2_VSCODE_AGENTS_SETUP.md`.
- **Claude Code Agent View (`claude agents`):** ⚠️ requires the **standalone terminal
  CLI**, which is not currently on PATH. The extension works; the CLI command may need
  installing/enabling. See `FORGE_V2_AGENT_VIEW_SETUP.md`.
- **GStack install:** ⛔ **blocked by missing Bun.** GStack's `./setup` flow expects
  Bun v1.0+. See `FORGE_V2_GSTACK_SETUP.md` for the exact status and unblock path.

## Exact blockers

1. **Bun missing** → blocks GStack `./setup`.
   - Bun is required by GStack's setup/runtime per its docs.
   - **Not auto-installed in this pass** (per priming rules: do not run non-GStack remote
     install scripts; stop GStack install if Bun is missing and document it).
2. **Standalone `claude` CLI not on PATH** → `claude agents` Agent View cannot be launched
   from a terminal yet. The VS Code extension is unaffected.

## Official download links (for blockers)

- Bun install: https://bun.sh/docs/installation
- Claude Code overview / CLI: https://code.claude.com/docs/en/overview
- Node.js: https://nodejs.org/en/download
- Git: https://git-scm.com/downloads
- VS Code: https://code.visualstudio.com/download
- VS Code Insiders: https://code.visualstudio.com/insiders

## Unblock path (for Ram, when approved)

- **Bun (Windows, user-level, no admin):** `powershell -c "irm bun.sh/install.ps1 | iex"`
  then restart the shell. Re-run GStack `./setup` afterward.
  - Prefer running GStack `./setup` from **Git Bash or WSL** on Windows if PowerShell
    setup misbehaves.
- **Claude CLI / Agent View:** install/enable the standalone Claude Code CLI per the
  official overview docs, then `claude agents`.

> These steps were intentionally **not executed automatically** this pass — they involve
> a non-GStack remote install script (Bun) and a CLI install, both outside the safe
> auto-action scope. They are documented here so Ram can run them deliberately.
