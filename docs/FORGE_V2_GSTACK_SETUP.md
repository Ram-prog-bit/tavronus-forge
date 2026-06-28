# Forge v2 — GStack Setup

> GStack is installed **globally / personal**, in the Claude skills folder — **never**
> team-installed into the Forge repo. Status below is honest and verified.

## Official source

- Repo: https://github.com/garrytan/gstack
- Install command (official):
  ```
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
  ```

## Current status (verified this pass)

| Item | Status |
|---|---|
| Clone | ✅ **Cloned** to `~/.claude/skills/gstack` (i.e. `C:\Users\raghu\.claude\skills\gstack`) |
| Version | `1.58.5.0` (commit `11de390`) |
| Location | **outside** the Forge repo — confirmed absent from `git status` |
| `./setup` (registration) | ⛔ **NOT run** — blocked by missing **Bun** |
| Overall | **STAGED, not activated** |

### Why setup was not run (honest)

GStack's `setup` script **hard-requires Bun** and exits immediately if it's missing:

```
if ! command -v bun >/dev/null 2>&1; then
  echo "Error: bun is required but not installed." >&2
  exit 1
fi
```

`package.json` also declares `"engines": { "bun": ">=1.0.0" }`. **Bun is not installed**
on this machine (see `FORGE_V2_LOCAL_TOOLCHAIN_STATUS.md`). Per the priming rules — "if
Bun is missing and needed for GStack, stop GStack install and document the Bun
requirement" — `./setup` was intentionally **not** executed. The clone was left in place
(the correct, official location) so it is ready to activate the moment Bun is installed.

## Requirements

- Claude Code (host) — present (VS Code extension).
- Git — present (2.50.0).
- **Bun v1.0+** — **MISSING** (setup recommends `1.3.10`).
- Node.js — present (v20.15.0).

## Unblock path (for Ram, when ready)

1. Install Bun (Windows, user-level, no admin):
   `powershell -c "irm bun.sh/install.ps1 | iex"` — official docs:
   https://bun.sh/docs/installation
2. Restart the shell so `bun` is on PATH.
3. Run setup **from Git Bash** (recommended on Windows; the setup script is bash and
   handles MSYS/Git Bash copy-vs-symlink):
   ```
   cd ~/.claude/skills/gstack && ./setup
   ```
4. If PowerShell setup misbehaves, prefer Git Bash or WSL.
5. After any later `git pull` in the GStack folder, **re-run `./setup`** (on Windows it
   copies rather than symlinks, so files go stale until re-run).

> Note: the GStack setup also builds a browser binary and can wire browser/Playwright
> features. We are **not** enabling those during priming — Design System Day needs none
> of it.

## How to update GStack later

```
cd ~/.claude/skills/gstack
git status --short
git pull
./setup     # requires Bun
```

## GStack commands useful for Forge (planning / review / QA / security)

Use these for **discipline before and after** coding — not for shipping:

- `/office-hours` — strategic check-in
- `/plan-ceo-review` — CEO-level plan review
- `/plan-eng-review` — engineering scope review
- `/plan-design-review` — design/UI plan review
- `/design-consultation`, `/design-review` — design critique
- `/review` — code review after changes
- `/qa`, `/qa-only` — QA passes
- `/cso` — security-sensitive review
- `/autoplan` — planning assistance
- `/careful`, `/guard`, `/freeze`, `/unfreeze` — safety modes
- `/learn` — capture learnings

## GStack commands to AVOID until Ram explicitly approves

These exist in the clone but must **not** be used during priming or Design System Day:

- `/ship` — ships/deploys
- `/land-and-deploy` — production deploy flow
- `/setup-browser-cookies` — handles real credentials/cookies
- anything involving production deployment
- anything involving real credentials/cookies
- GStack **team mode** (do not team-install into the Forge repo)

## How GStack should be used in Forge

- **Planning / review / QA / security discipline first.** Use it to pressure-test plans
  and review diffs — not to take actions.
- **No production shipping commands.** No `/ship`, no `/land-and-deploy`.
- **No credential/cookie setup.** No `/setup-browser-cookies`.
- **No app behavior changes during priming.**

## Team install later?

**Not yet.** Only consider a per-repo / team GStack install after Design System Day, or
when Ram explicitly approves. For now GStack stays personal/global only.
