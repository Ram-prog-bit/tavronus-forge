# CLAUDE.md — Tavronus Forge

Project memory for Claude Code sessions. Read this first.

## What this is
**Tavronus Forge** — *mission control for AI coding agents.* A local-first AI development
command center (memory + evidence + safe patches + clean UI discipline). Parent brand:
Tavronus AI / Tavronus Labs.

## Status: V2 engine primed (not launched)
- V1 is preserved as the museum/fallback. V2 is a from-first-principles rebuild.
- Active branch: **`forge-v2-rebuild`**. Production: `master`. Fallback: `backup/forge-v1-final`.
- V1 snapshot: tag `forge-v1-final-snapshot`, commit `9681302`.
- **Next real task: Design System Day ONLY** (tokens + primitives, no screens).

## Hard rules
- Sacred port **5642** — never change it (`dev`/`start` scripts).
- No real AI/backend/auth/database/filesystem/terminal/browser integrations without
  explicit approval — everything agent-orchestration is currently **mock/planned**.
- Never delete the backup branch, rewrite history, force push, or merge to production
  without approval.
- Never mix SOJ / Ziggma / SushiSwap or any other project into this repo.
- Label every UI area: real / mock / planned / tested / untested (honesty layer).
- One builder edits at a time; plan and get scope approval before editing.

## Stack
Next.js 14.2.5 · React 18 · App Router · TypeScript · Tailwind 3.4 (`forge` palette) · npm.
UI deps: clsx, tailwind-merge, lucide-react, framer-motion.
Routes: `/`, `/workspace`, `/about`. Dev: http://localhost:5642.

## Read these for full context (docs/)
- `FORGE_V2_MASTER_BLUEPRINT.md` — product definition, pillars, roadmap
- `FORGE_V2_REALITY_MAP.md` — real vs mock (the honesty source of truth)
- `FORGE_V2_DESIGN_SYSTEM.md` — visual constitution
- `FORGE_V2_AGENT_SYSTEM.md` — agent roles (`.claude/agents/`)
- `FORGE_V2_WORKFLOW.md` / `FORGE_V2_DAILY_RITUAL.md` — how to work
- `FORGE_V2_VERCEL_GITHUB_FLOW.md` — branch/deploy safety
- `FORGE_V2_NEXT_STEPS.md` — exactly what to do next

## Commands
`npm run dev` (port 5642) · `npm run build` · `npm run lint`
Claude workflows: `.claude/commands/forge-start-day.md`, `forge-design-system-day.md`,
`forge-agent-audit.md`, `forge-release-check.md`, `forge-end-day-report.md`.
