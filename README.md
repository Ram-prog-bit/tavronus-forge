# Tavronus Forge

**Plan. Prompt. Code. Ship.**

A local AI coding cockpit for planning projects, generating prompts, reviewing
code, debugging errors, and managing build artifacts — all from one IDE-like
workspace.

- **Production:** https://tavronus-forge-the-real-one.vercel.app
- **Status:** polished local / **mock** MVP (no real AI, no backend, no real filesystem)
- **By:** Tavronus Labs

---

## Quick start

```bash
npm install
npm run dev
# open http://localhost:5642
```

> **Port 5642 is intentional.** Both `npm run dev` and `npm run start` bind to
> `5642`. Don't change it — tooling, docs, and the in-app status bar all assume it.

Production build check:

```bash
npm run build
```

> Standalone `npm run lint` (`next lint`) opens an interactive ESLint setup
> prompt because no ESLint config is committed. The integrated lint/type-check
> that runs inside `npm run build` is the gate.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| State | React hooks + `localStorage` (no DB, no server state) |
| Deploy | Vercel (static/prerendered) |

No additional runtime dependencies. No icon library, no syntax-highlighting
library, no backend.

---

## Routes

| Route | What it is |
|---|---|
| `/` | App-first **start screen** (boot animation → New File / Open Workspace / Open Mock Project + demo recents) |
| `/workspace` | The **IDE-like cockpit** (Explorer · Editor · Forge AI). Driven by `?mode=` (`file` · `workspace` · `mock-project` · `project`) |
| `/about` | Landing / about page |

---

## Core features

- **App-first start screen** — boot screen, action tiles, and clearly-labelled
  *Demo Recent* sample entries.
- **IDE-like workspace** — top bar with menus + command palette, Explorer tree,
  code editor with virtualized line numbers, Forge AI panel, status/terminal bar.
- **Tabs + mock VFS** — open/close tabs, dirty-dot tracking, and a
  `localStorage`-backed virtual file system (`tavronus-forge-vfs-v1`) that
  persists edits across reloads. **"Save" writes to localStorage, not disk.**
- **Forge AI modes** — Plan · Prompt · Review · Debug · Checklist. Switching a
  mode loads it as the "tool" in the assistant.
- **Artifact output cards** — structured, scannable deliverables with type/label
  hierarchy, framed code snippets, and line-number gutters.
- **Copy workflow** — copy the whole artifact or just the snippet/prompt, with
  local "Copied" feedback.
- **ApplyPreview mock patch flow** — preview a deterministic, template-based
  "patch" before it edits the **open tab only** (and only when the output was
  generated for that file). Nothing is saved until you press Ctrl/Cmd+S.
- **Resizable / collapsible panels** — drag the Explorer and Forge AI dividers,
  with widths persisted to `localStorage`.
- **Keyboard shortcuts** — Ctrl/Cmd+K command palette, Ctrl/Cmd+S mock save,
  ⌘⏎ / Ctrl+Enter to forge output, arrow keys on a focused divider to resize,
  double-click a divider to reset, Esc to close overlays.

---

## Real vs mock (one-line summary)

**Real:** the app, the deploy, the workspace shell, tabs, the `localStorage`
VFS, mock file saving, the Forge AI mode UI, deterministic artifact generation,
the ApplyPreview patch flow, panel resizing, and keyboard shortcuts.

**Mock:** there is **no real AI API**, **no real filesystem**, **no terminal
execution**, **no auth**, **no database**, and **no codebase indexing**.
Artifacts are produced by local templates that read the current editor text —
not by a model. See [`docs/REALITY_MAP.md`](docs/REALITY_MAP.md) for the full map.

---

## Do not confuse with

- **SOJ / Serving Our Justice** — a separate, unrelated project. Not part of this
  repo and must not be referenced, imported, or modified from here.
- **Ziggma prototype** — a separate, unrelated prototype. Also out of scope.

Tavronus Forge is its own product and lives only in this repository.

---

## Documentation

- [`docs/PRODUCT_BRIEF.md`](docs/PRODUCT_BRIEF.md) — what it is, who it's for, the core loop, principles.
- [`docs/REALITY_MAP.md`](docs/REALITY_MAP.md) — real vs mock, honesty rules, the future real version.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — phased plan from mock MVP → optional real AI → real file workflow.
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — colors, typography, depth, interactions, and the "do not do" list.

---

## Next milestones

1. **Validate the product loop** — demo script + manual user testing; decide the
   exact scope of a real-AI mode before building it.
2. **Optional Real AI mode** — server-side generation behind an env flag, with
   **mock remaining the default** and a clear Mock ↔ Real toggle (no client secrets).
3. **Real project / file workflow** — project import, safe read/write, a real
   diff engine, and undo/rollback behind the existing ApplyPreview UX.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full phasing and risk notes.
