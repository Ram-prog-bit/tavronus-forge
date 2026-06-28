# Forge — Real Integration Architecture (Decision)

> Architecture only. **Nothing is implemented today.** This chooses the first real
> capability for Forge and designs it safely. Branch: `forge-real-integration-architecture`.

## Executive summary

Forge v2 is a launched, locked **static/mock command-center preview**. The first real
capability should make the app's own picture of *project truth* real — not call external
AI, not touch secrets, not write files. **Chosen first integration: Project Context Reader
+ Docs-Backed Memory v1**, built as a **Hybrid Project Manifest** (manual typed manifest
now → local generator later → optional read-only API much later). It is read-only,
secret-free, deployment-safe, and directly powers Mission Control + Project Memory with
real data instead of hardcoded duplicates.

## Current production truth

- Production = Forge v2 (`master` @ launch, tag `forge-v2-preview-production`).
- Real today: UI, design system, mock command-center surfaces, docs.
- **Command-center data is hardcoded inline** in `components/workspace/*Preview.tsx`
  (MissionControl phases, ProjectMemory cards, Evidence/Patch records). This duplicates
  truth that also lives in `docs/FORGE_V2_*` and `CLAUDE.md`.
- Still mock/planned: real AI, backend, auth, database, cloud memory, evidence ingestion,
  patch execution, filesystem/terminal/browser automation.

## Candidate decision matrix

Ratings: L = Low, M = Medium, H = High. "First?" = good first integration.

| Candidate | Product value | Safety | Complexity | Secret/API risk | Mission fit | Reversible | First? |
|---|---|---|---|---|---|---|---|
| **Project Context Reader** | H | **H** | L–M | **L** | H | H | ✅ **Yes** |
| Persistent Project Memory | H | M | M | L | H | M | 2nd |
| Read-only Git Diff reader | M–H | M | M | L | M | H | 3rd |
| Evidence ingestion | M | M | M–H | L | M | M | later |
| GitHub metadata reader | M | M | M | **H** (token) | M | H | later |
| Vercel metadata reader | M | M | M | **H** (token) | M | H | later |
| AI backend prompt endpoint | H | **L** | H | **H** (keys/cost) | H | M | later |
| Patch application | H | **L** | H | M | H | **L** | ❌ not first |
| Terminal execution | M | **L** | H | M | M | **L** | ❌ not first |
| Browser automation | M | **L** | H | M | L | **L** | ❌ not first |

### Top 3
1. **Project Context Reader** (chosen)
2. Persistent Project Memory v1 (docs-backed; natural Stage extension)
3. Read-only Git Diff reader (foundation for real Patch Review)

## Chosen first integration: Project Context Reader + Docs-Backed Memory v1

It must:
- Read project docs + selected allowlisted config/code and summarize project truth.
- Power Mission Control / Project Memory with **real** project data (replace inline dupes).
- Stay **read-only** — no file writes, no terminal, no external AI, no secrets, no auth, no
  database on day one.

### Why chosen
Safest possible first step (no keys/auth/secrets), highest mission alignment (Forge is
mission control — it should *know* the project), reduces future AI hallucination (real
context), and removes the current inline-data duplication. Read-only and reversible.

### Rejected (and why, briefly)
- **AI backend / prompt endpoint** — needs keys, cost controls, prompt-injection defense;
  do it only after context/memory are stable.
- **GitHub / Vercel readers** — require tokens (secret risk); defer.
- **Patch application / terminal / browser automation** — high blast radius, low
  reversibility; explicitly not first.

## Recommended architecture — Hybrid Project Manifest (Architecture D)

- **Stage 1 (Manifest Foundation):** a manual, typed manifest checked into the repo
  (`data/project-context.json` + `lib/project-context/schema.ts`). UI consumes it instead
  of hardcoded inline data. **No scanner, no runtime file reads.** Deployment-safe.
- **Stage 2 (Local Generator):** a local, manually-run script generates the manifest from
  **allowlisted** docs. No browser access, no production runtime reads.
- **Stage 3 (Read-only API, optional, much later):** a dev-restricted, allowlisted,
  read-only route — only if truly needed.

Why D: combines the safety of a static manifest (A/C) with a path to real freshness (B),
staged so each step is independently safe and reversible.

## Data model (proposed — not implemented)

`ProjectContextManifest`: `projectName, parentBrand, currentBranch, productionUrl,
localUrl, sacredPort, routes[], modes[], productionStatus, backups, realSystems[],
mockSystems[], plannedSystems[], agentCrew[], evidenceCategories[], patchReviewPolicy,
risks[], nextActions[], sourceDocs[], lastUpdated, confidence, generatedBy, isRuntimeLive`.

`SourceDoc`: `id, title, path, category, trustLevel, lastReviewed, summary`.
`SystemStatus`: `id, name, category, status, truthLabel, summary, riskLevel, source`.
`Risk`: `id, title, severity, status, mitigation, owner`.
`NextAction`: `id, title, phase, reason, blockedBy, approvalRequired`.

`isRuntimeLive` must be **false** for Stage 1–2 so the UI keeps labeling the manifest as
static/docs-backed (honesty layer).

## Allowlist / denylist (summary; full policy in security model doc)

- **Allowed:** `docs/FORGE_*.md`, `CLAUDE.md`, `package.json`, `tailwind.config.ts`,
  route structure, selected `components/workspace` + `components/ui` files, `README`.
- **Never:** `.env*`, secrets/tokens/credentials/keys, `node_modules`, `.next`, `.git`
  internals, `.vercel`, browser cookies, anything outside the project dir, and any other
  project (SOJ / Ziggma / SushiSwap), personal/desktop/downloads files.
- Read-only; allowlist beats scanning; no recursive whole-drive scan; no
  browser-supplied paths; no path traversal; no writes; no terminal from UI.

## Security model (summary; full in security model doc)

Top risks: secret leakage, path traversal, overbroad scanning, prod/runtime filesystem
mismatch, misleading "live memory" claims, prompt injection (if docs later feed AI). All
mitigated by: strict allowlist, read-only, static manifest in Stage 1, `isRuntimeLive`
honesty flag, and no AI in v1.

## UI integration plan (later, not today)

- **Mission Control** ← `currentMission`, `nextActions`, `risks`, phase data.
- **Project Memory** ← `realSystems`, `mockSystems`, `sourceDocs`.
- **Evidence Vault** ← `evidenceCategories` (then real records later).
- **Patch Review** ← `patchReviewPolicy` (then real diffs later).
- Proposed boundaries: `lib/project-context/{schema,manifest,allowlist}.ts`,
  `data/project-context.json`, `scripts/generate-project-context.ts` (Stage 2),
  components consume typed data.

## Open questions
- Do we want per-environment manifests (dev vs prod), or one with `isRuntimeLive`?
- When (if ever) is a runtime read-only API worth the risk vs build-time generation?
- What trust level gates a doc from informing AI prompts later?

## Final recommendation
**ARCHITECTURE READY.** Proceed to **Manifest Foundation Day** (Stage 1): typed static
manifest + have Mission Control / Project Memory consume it, replacing inline duplicate
data. No scanner, no runtime reads, no AI, no secrets.
