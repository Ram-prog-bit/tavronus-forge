# Tavronus AI

**Clean restart foundation.**

Building the next version from a blank, controlled base. This is an intentional reset:
the previous app was preserved in Git and the working tree was cleared back to a minimal,
honest starting point.

- **Status:** blank foundation — no AI, no backend, no database, no auth, no integrations.
- **Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · npm.

## What's here

A single homepage with placeholder sections only (Command Center, Forge Workspace,
Sentinel Security, Atlas Research, Quant Lab). None are wired up — they are labeled
placeholders, not features.

## Quick start

```bash
npm install      # only if node_modules is missing
npm run dev      # starts the dev server on http://localhost:5642
```

Other scripts: `npm run build`, `npm run start` (port 5642), `npm run lint`.

## Restore the previous version

The full pre-reset project is preserved in Git:

- Branch: `backup/pre-reset-tavronus-ai`
- Tag: `pre-reset-tavronus-ai-backup`

```bash
git checkout backup/pre-reset-tavronus-ai
```
