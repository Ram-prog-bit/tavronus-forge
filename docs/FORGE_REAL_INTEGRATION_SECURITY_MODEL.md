# Forge — Real Integration Security Model

> Threat model and hard policies for making Forge real safely. Applies from the first real
> integration (Project Context Reader) onward. Read before implementing any stage.

## Threat model

| # | Threat | Severity | Mitigation | Blocks v1? |
|---|---|---|---|---|
| 1 | Secret leakage (.env, keys, tokens read/exposed) | **High** | Strict denylist; never read `.env*`/secrets; read-only; static manifest in Stage 1 | Yes if unmitigated |
| 2 | Path traversal (`../` / absolute paths) | **High** | Allowlist of fixed relative paths; reject any dynamic/browser-supplied path | Yes |
| 3 | Overbroad scanning (whole-drive / node_modules) | Medium | Allowlist beats scanning; no recursive root scan; bounded file list | No (avoided by design) |
| 4 | Prod vs runtime filesystem mismatch | Medium | Build-time/static manifest; no runtime FS reads in production | No |
| 5 | Misleading "live memory" claims | Medium | `isRuntimeLive` flag; honesty labels stay "static/docs-backed" until truly live | No |
| 6 | Data freshness (stale manifest) | Low–Med | Show `lastUpdated`/`generatedBy`; regenerate via Stage 2 script | No |
| 7 | User trust erosion | Medium | Never claim real until verified; flip labels only with evidence | No |
| 8 | Deployment breakage | Low | Static import is build-safe; preview before merge | No |
| 9 | API-key risk (when AI connects, Stage 7) | **High** | Keys via env only, never committed; server-side only; rate/cost limits | n/a v1 |
| 10 | Prompt injection (docs → AI later) | **High** | Treat doc content as untrusted; sanitize; never auto-execute model output; no tool access without approval | n/a v1 |

## Secrets policy
- Never read, log, render, or commit secrets. `.env*` and `.vercel` stay gitignored.
- API keys (Stage 7+) live only in environment variables, server-side, never in the client
  bundle, never in the repo.
- Any accidental secret exposure → STOP, rotate, report path safely (never print value).

## Filesystem policy (Project Context Reader)
- **Read-only.** No writes, ever, in the context reader.
- **Allowlist (fixed, relative):** `docs/FORGE_*.md`, `CLAUDE.md`, `package.json`,
  `tailwind.config.ts`, route structure, selected `components/workspace` + `components/ui`
  files, `README`.
- **Denylist (never):** `.env*`, secrets/tokens/keys/credentials, `node_modules`, `.next`,
  `.git` internals, `.vercel`, browser cookies, anything outside the project directory,
  other projects (SOJ / Ziggma / SushiSwap), personal/desktop/downloads files.

## Production / runtime policy
- Stage 1: static manifest only — no runtime filesystem access in production.
- Stage 2: generator runs **locally and manually** — not in CI, not at request time.
- Stage 3+: any read-only API is dev-restricted and allowlisted; default off in production.

## Path-traversal policy
- No browser/user-supplied file paths. No string concatenation into file paths.
- Only fixed, code-defined allowlist entries are readable. Reject `..`, absolute paths, and
  symlinks that escape the project root.

## AI prompt-injection policy (Stage 6–7)
- Treat all doc/file content sent to a model as **untrusted input**.
- The model gets **no tools, no file write, no terminal, no network** by default.
- Never auto-apply model output; route through human-approved patch review (Stage 8).
- Strip/escape instructions embedded in project content; constrain system prompts.

## Approval gates
- Read-only context/memory (Stage 1–4): standard preview + human-approved merge.
- Real diffs (Stage 5): read-only, preview, approval.
- Real AI endpoint (Stage 7): explicit Ram approval + security review (Stage 6) first.
- Patch application (Stage 8): explicit per-change human approval + rollback path.

## Non-negotiables
No secrets in repo · read-only before read-write · allowlist over scanning · honesty flag
on non-live data · no force push · no backup deletion · no production change without
preview + approval.
