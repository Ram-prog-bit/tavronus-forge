# Forge — Real Integration Roadmap

> Staged path from static/mock preview to real capabilities. One safe capability at a time.
> Each stage is its own approved day. Honesty labels flip only when a thing becomes real.

## Stage 0 — Real Integration Architecture (this day) ✅
- **Builds:** architecture decision + security model + this roadmap (docs only).
- **Must not build:** any code, API, scanner, AI client, secrets.

## Stage 1 — Manifest Foundation Day
- **Builds:** typed static manifest (`lib/project-context/schema.ts`,
  `data/project-context.json`); Mission Control + Project Memory consume it (replace inline
  hardcoded data). `isRuntimeLive = false`.
- **Must not build:** scanner, runtime file reads, AI, secrets, auth, database.
- **Safety:** read-only; deployment-safe (static import); honesty label stays "docs-backed".
- **Commit/deploy:** on a build branch → preview → human-approved merge (same flow as v2).

## Stage 2 — Local Generator Day
- **Builds:** a **manually-run** local script that generates the manifest from allowlisted
  docs. Records `lastUpdated`, `generatedBy`, `sourceDocs`.
- **Must not build:** browser/runtime file access; production reads; whole-drive scan.
- **Safety:** allowlist-only; no path traversal; never reads `.env`/secrets/other projects.

## Stage 3 — Read-Only Project Context UI Day
- **Builds:** Mission Control / Project Memory show "last generated" + source docs from the
  manifest; clearly still static/docs-backed.
- **Must not build:** live runtime reads in production; AI.

## Stage 4 — Evidence Foundation Day
- **Builds:** a local/static evidence record data model (typed); Evidence Vault consumes it.
- **Must not build:** real ingestion, CI/log connectors, screenshots, backend.

## Stage 5 — Read-Only Git Diff Planning/Day
- **Builds:** plan + (later) a **read-only** diff reader (e.g. local dev only). Patch Review
  could show real diffs.
- **Must not build:** patch application, writes, auto-commit, auto-merge.

## Stage 6 — AI Backend Planning Day
- **Builds (docs):** API security design, cost controls, prompt boundaries, prompt-injection
  defenses, key handling. **Only after** context/memory are stable.
- **Must not build:** the live endpoint yet; no keys committed.

## Stage 7 — Real AI Prompt Endpoint Day
- **Builds:** a small, controlled server endpoint that sends a workspace prompt to an AI API
  and returns a response. Keys via environment only (never committed). Rate/cost limits.
- **Must not build:** agent autonomy, patch application, file writes, terminal.

## Stage 8 — Human-Approved Patch Workflow
- **Builds:** apply a reviewed patch **only** with explicit human approval, with rollback.
- **Must not build:** autonomous multi-agent apply; anything bypassing review.

## Global rules across all stages
- One real capability at a time; read-only before read-write.
- No secrets in the repo; keys via env only; `.env*` stays gitignored.
- No production behavior change without preview + human-approved merge.
- Honesty layer: flip a label to "real" only when verified with evidence.
- No force push, no history rewrite, never delete the v1 backup/tag.
- **Real AI is allowed** starting Stage 7 (after Stage 6 security design), behind approval.
- **Patch application is allowed** only at Stage 8, human-approved, with rollback.
