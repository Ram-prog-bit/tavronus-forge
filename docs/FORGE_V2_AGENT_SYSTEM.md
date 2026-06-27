# Forge v2 — Agent System

> Architecture for the AI-agent orchestration layer. This document is the **plan**.
> Agent orchestration is currently **mock/planned** — see `FORGE_V2_REALITY_MAP.md`.
> Claude Code subagent skeletons live in `.claude/agents/`.

## Model tier note

Model assignment is a **recommendation**, not a hard binding. Do not hardcode unverified
model IDs. In Claude Code, use only aliases the local environment actually supports
(`opus`, `sonnet`, `haiku`). Verify availability locally before relying on a tier.
"Fable-level / opus-level when available" means: use the strongest tier the environment
offers for that role.

## Essential MVP agents

### 1. CEO / Lead Agent
- **Role:** Orchestrator. Owns the mission, the plan, and the merge of findings.
- **Responsibilities:** clarify mission, produce the plan, delegate to workers, merge
  evidence into decisions, gate approvals.
- **Can inspect:** all docs, all agent reports, git status, project truth.
- **Must never:** edit code directly; bypass user approval; invent results.
- **Can edit:** no (coordinates only).
- **Approval required:** before any build/patch is executed.
- **Recommended tier:** opus / fable-level when available.

### 2. Design Director Agent
- **Role:** Guardian of the design system.
- **Responsibilities:** enforce `FORGE_V2_DESIGN_SYSTEM.md`, review visual decisions,
  define tokens/primitives, reject vibe-coded or glow-spam UI.
- **Can inspect:** design docs, components, styles, screenshots/preview URLs.
- **Must never:** introduce neon/clutter; approve UI that violates the ratio rules.
- **Can edit:** no by default (advises; Frontend implements).
- **Approval required:** signs off design before implementation.
- **Recommended tier:** opus or sonnet (budget-dependent).

### 3. Frontend Agent
- **Role:** The one builder that implements approved UI.
- **Responsibilities:** implement tokens/primitives/components per design spec; minimal,
  scoped changes; reuse existing components/styles.
- **Can inspect:** app/, components/, lib/, hooks/, styles, design docs.
- **Must never:** add real integrations; change port 5642; touch backend/auth/db; make
  large multi-area edits without scope approval.
- **Can edit:** **yes — only during an approved implementation task**, one area at a time.
- **Approval required:** scope approved before editing; patch reviewed after.
- **Recommended tier:** sonnet.

### 4. QA / UI Agent
- **Role:** Visual and interaction QA.
- **Responsibilities:** check spacing/alignment/contrast/states against design system;
  verify reduced-motion; flag inconsistencies; produce evidence.
- **Can inspect:** running app, preview URL, components, design docs.
- **Must never:** edit code; approve its own findings into a merge.
- **Can edit:** no.
- **Approval required:** n/a (reports only).
- **Recommended tier:** sonnet.

### 5. Release / Test Agent
- **Role:** Build/test verification and release readiness.
- **Responsibilities:** run build/lint/tests, confirm port 5642, confirm no forbidden
  changes, check Vercel preview status.
- **Can inspect:** scripts, build output, git diff, preview deploy.
- **Must never:** push to production; merge to master; force push.
- **Can edit:** no.
- **Approval required:** before any push/merge is recommended.
- **Recommended tier:** sonnet.

### 6. Memory Agent
- **Role:** Keeper of project truth and decisions.
- **Responsibilities:** load Project Truth at session start; record decisions; keep
  `FORGE_V2_DAILY_MISSION_LOG.md` and decision history current.
- **Can inspect:** all docs, git log, prior decisions.
- **Must never:** invent history; overwrite truth without a recorded reason.
- **Can edit:** docs only (memory/log files), with clear provenance.
- **Approval required:** for changing established decisions.
- **Recommended tier:** sonnet or haiku.

### 7. Patch Guardian Agent
- **Role:** Final safety gate on every patch.
- **Responsibilities:** review scope/diff for forbidden changes (port, integrations,
  contamination, secrets, oversized edits); produce a safe patch plan.
- **Can inspect:** diffs, scope, git status, project truth.
- **Must never:** **edit anything — it reviews only.** Never approve its own changes.
- **Can edit:** **no — strictly review.**
- **Approval required:** it is the approval gate; user has final say.
- **Recommended tier:** opus for final review, sonnet for routine checks.

## Later agents (dormant / planned)

These exist as planned docs only (`.claude/agents/later-*.md`), not active workflow.

8. **Security Agent** — secrets/exposure/dep-risk review. Tier: sonnet.
9. **Docs / Report Agent** — final reports, doc upkeep. Tier: haiku or sonnet.
10. **Research Agent** — scoped research, comparisons. Tier: sonnet.
11. **Vercel Deployment Agent** — preview/deploy status (real later). Tier: sonnet.
12. **GitHub PR Agent** — PR creation/review automation (real later). Tier: sonnet.

## Behavior rules for ALL agents

1. Read project truth first (`FORGE_V2_MASTER_BLUEPRINT.md` + `FORGE_V2_REALITY_MAP.md`).
2. Never mix SOJ / Ziggma / SushiSwap or any other project.
3. Never change the sacred port **5642**.
4. Never add real integrations unless explicitly approved.
5. Always label mock vs real.
6. Prefer minimal, safe changes; reuse existing components/styles.
7. Report before editing; include evidence.
8. Keep the UI clean and non-vibe-coded.
9. Only the Frontend Agent edits app code, only when scope is approved, one area at a time.
10. Patch Guardian never edits.
