# Tavronus Forge — v1 Final State Snapshot

> **This is the preserved Tavronus Forge v1 fallback snapshot before the Forge v2 rebuild.**

This document captures the complete known state of Tavronus Forge v1 at the moment
of backup. It exists so that v1 can always be restored as a fallback, no matter
what happens during the v2 rebuild.

---

## 1. Project name and purpose
- **Name:** Tavronus Forge
- **Purpose:** AI coding command-center / Cursor-style workspace prototype.
  A local, mock-driven MVP that demonstrates a "plan → prompt → code → ship"
  cockpit for AI-assisted coding.

## 2. Current local path
```
C:\Users\raghu\Tavronus Forge THE REAL ONE
```

## 3. Current GitHub repo / remote
- **Repo:** `Ram-prog-bit/tavronus-forge`
- **origin (fetch):** https://github.com/Ram-prog-bit/tavronus-forge.git
- **origin (push):**  https://github.com/Ram-prog-bit/tavronus-forge.git

## 4. Current branch
- `master` (at time of snapshot)

## 5. Current commit hash
- **Full:** `41b98175473e04ab51c5cb494fb84c9a45fa5a02`
- **Short:** `41b9817`
- **Message:** `docs: add forge validation kit and full QA audit`
- **Date:** Sat Jun 27 2026 15:30:12 -0500

## 6. Local dev URL and sacred port
- **Local dev URL:** http://localhost:5642
- **Sacred port:** `5642` (must never change)
- Confirmed in `package.json`:
  - `dev`: `next dev -p 5642`
  - `start`: `next start -p 5642`

## 7. Current routes
- `/`           → `app/page.tsx` (landing)
- `/workspace`  → `app/workspace/page.tsx` (the cockpit)
- `/about`      → `app/about/page.tsx`

## 8. Current modes
Defined in `lib/modes.ts`:
- **Plan** — Turn an idea into a clean MVP blueprint.
- **Prompt** — Generate copy-paste prompts for any AI coding tool.
- **Review** — Paste code and get a full review with issues and fixes.
- **Debug** — Paste an error and get cause, fix steps, and verification.
- **Checklist** — Turn a product idea into day-one tasks and done criteria.

## 9. Current known mock / local limitations
- All "AI" output is generated locally from mock templates — **no external AI is called**.
- The filesystem is a virtual file system (VFS) in memory only — **no real disk writes**.
- "Apply to File" patches edit the open tab in the local VFS only; nothing is written to disk.
- No terminal execution, no backend, no auth, no database, no payments.
- Files start from `lib/mockFiles.ts` seed data.

## 10. What is real in v1
- A working Next.js 14 (App Router) frontend.
- Real, functional UI/UX cockpit: tabs, editor pane, mode switching, output cards,
  apply-preview flow, boot/start/landing screens.
- A real in-memory virtual file system (`lib/vfs.ts`, `hooks/useVfs.ts`).
- Real tab management (`hooks/useTabs.ts`).
- Real local artifact/patch generation logic (`lib/forgeArtifacts.ts`, `lib/forgePatch.ts`).
- Honest "Local Mock" / "no external AI" labels across the UI.

## 11. What is not real yet
- Real AI / LLM calls.
- Backend / API server.
- Authentication.
- Database / persistence beyond the in-memory session.
- Real filesystem access.
- Terminal / command execution.
- Payments.
- "Forge Protocols" (a planned, clearly-labeled future workflow concept — not active).

## 12. Important files / components
**App routes**
- `app/page.tsx`, `app/workspace/page.tsx`, `app/about/page.tsx`, `app/layout.tsx`, `app/globals.css`

**Components**
- `components/WorkspaceShell.tsx`
- `components/StartScreen.tsx`
- `components/BootScreen.tsx`
- `components/LandingPage.tsx`
- `components/OutputCard.tsx`
- `components/FakeIDEPreview.tsx`
- `components/workspace/TabStrip.tsx`
- `components/workspace/EditorPane.tsx`
- `components/workspace/ForgeSessionCard.tsx`
- `components/workspace/ApplyPreview.tsx`

**Hooks**
- `hooks/useForgeAI.ts`
- `hooks/useTabs.ts`
- `hooks/useVfs.ts`

**Lib / data**
- `lib/modes.ts`
- `lib/mockFiles.ts`
- `lib/forgeArtifacts.ts`
- `lib/forgePatch.ts`
- `lib/vfs.ts`

## 13. Package scripts
From `package.json` (`tavronus-forge` v0.1.0):
```json
"scripts": {
  "dev":   "next dev -p 5642",
  "build": "next build",
  "start": "next start -p 5642",
  "lint":  "next lint"
}
```
Key dependencies: `next@14.2.5`, `react@^18`, `react-dom@^18`, `tailwindcss@^3.4.1`, `typescript@^5`.

## 14. Current git status before backup
Branch: `master` · HEAD: `41b9817`

Uncommitted (modified) files at snapshot time — all are **honest mock-labeling UI
copy/style tweaks only**, no behavior changes:
- `app/globals.css` — adds `.forge-planned-tag` style for muted "planned" tags.
- `components/LandingPage.tsx` — adds honest "Local mock today" status line + planned "Forge Protocols" roadmap nod.
- `components/StartScreen.tsx` — adds "Plan. Prompt. Code. Ship." tagline.
- `components/WorkspaceShell.tsx` — adds "Generated locally from mock templates" note.
- `components/workspace/ApplyPreview.tsx` — adds "Local Mock" badge to the apply-to-file preview.

## 15. Known safety rules
- **No SOJ / Serving Our Justice contamination.**
- **No Ziggma contamination.**
- **No SushiSwap contamination.**
- **No real AI / backend / auth / database / filesystem / terminal yet.**
- Do not mix this project with any other repo/project.
- Do not change the sacred port `5642`.

## 16. Snapshot statement
**This is the preserved Tavronus Forge v1 fallback snapshot before the Forge v2 rebuild.**

- Backup branch: `backup/forge-v1-final`
- Backup tag: `forge-v1-final-snapshot`
