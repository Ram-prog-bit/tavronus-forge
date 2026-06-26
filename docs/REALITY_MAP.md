# Tavronus Forge — Reality Map (Real vs Mock)

This document is the single source of truth for **what is real and what is
mock** in Tavronus Forge. Keep it accurate. If a feature changes from mock to
real, update this file in the same change.

The product's identity depends on being honest about this. "Mock" is not a
weakness to hide — it's a deliberate stance the UI states out loud.

---

## ✅ Real today

These genuinely work and persist:

- **Next.js 14 app** — real App Router app, real routes (`/`, `/workspace`,
  `/about`).
- **Production deployment** — live on Vercel, prerendered/static.
- **Local workspace shell** — top bar, menus, command palette, Explorer, editor,
  Forge AI panel, status/terminal bar — all real, interactive UI.
- **Tabs** — real open/close/activate, dirty-dot tracking, per-tab view state
  (scroll/caret), unsaved-changes confirmation.
- **`localStorage` VFS** — a real virtual file system in the browser
  (`tavronus-forge-vfs-v1`); the Explorer tree is derived from it.
- **Mock file saving** — Ctrl/Cmd+S really persists the open tab's content to the
  VFS and clears the dirty dot; edits survive reload. (It writes to localStorage,
  **not to disk**.)
- **Forge AI UI modes** — Plan · Prompt · Review · Debug · Checklist are real,
  switchable modes that change the panel and the generated output shape.
- **Deterministic artifact generation** — real, editor-aware template logic
  (`lib/forgeArtifacts.ts`) that reads the current editor text and produces
  structured cards. Same input → same output. No model involved.
- **Mock ApplyPreview patch flow** — real preview modal driven by deterministic,
  template-based content transforms (`lib/forgePatch.ts`). Applies to the open
  tab only, only when the output targeted that file; never auto-saves.
- **Resizable / collapsible panels** — real drag + keyboard resize, with widths
  and open/collapsed state persisted to localStorage.
- **Keyboard shortcuts** — real: Ctrl/Cmd+K, Ctrl/Cmd+S, ⌘⏎ / Ctrl+Enter,
  arrow-key divider resize, double-click reset, Esc.

### localStorage keys in use (all browser-local)

| Key | Purpose |
|---|---|
| `tavronus-forge-vfs-v1` | Virtual file system content store |
| `tavronus-forge-session-v1` | Forge Session (goal, phase, artifacts) |
| `tavronus-forge-sidebar-width-v1` | Explorer width |
| `tavronus-forge-ai-panel-width-v1` | Forge AI panel width |
| `tavronus-forge-sidebar-open-v1` | Explorer open/collapsed |
| `tavronus-forge-ai-panel-open-v1` | Forge AI panel open/collapsed |

---

## 🟡 Mock today (deliberately not built)

These are **not** present, by design, for the MVP:

- **No real AI API** — no Claude/OpenAI/any provider call. Output is local templates.
- **No real filesystem access** — nothing reads or writes the user's disk.
- **No terminal / build execution** — the terminal strip is a static status display.
- **No auth** — no accounts, login, or sessions.
- **No database** — no server-side persistence of any kind.
- **No cloud project memory** — nothing is stored or synced off-device.
- **No real codebase indexing** — the assistant only sees the current editor text,
  not a parsed/embedded project.

The "Demo Recent" entries on the start screen are illustrative samples, not real
history — and are labelled as such.

---

## User-facing honesty rules

Non-negotiable. Any future contributor must follow these:

1. **Never imply real AI when it's mock.** Keep the "Local Mock" badge and mock
   language wherever generation happens. Don't dress templates up as a model.
2. **Never imply a real filesystem save.** "Save" persists to localStorage; the UI
   says "mock file" / "mock save". Don't call it "saved to disk".
3. **Always label local/mock behavior clearly.** Mock recents, mock patches, and
   mock terminal output must read as mock at a glance.
4. **If something becomes real, relabel it in the same change** — and update this
   document.

---

## 🔭 Future real version (when/if pursued)

Each of these is a deliberate, scoped step — see `ROADMAP.md`:

- **Optional AI provider integration** — server-side generation behind an env flag;
  **mock stays the default**; explicit Mock ↔ Real toggle; no secrets in the client.
- **Real project import** — bring in an actual folder/repo (read-only first).
- **Real file write layer** — safe, opt-in writes with clear confirmation.
- **Real diff engine** — replace the template patch with a genuine diff/patch.
- **Project memory** — persistent, possibly synced context across sessions.
- **Terminal / build runner** — actually run commands and stream output.

---

## Risks to manage

- **Overbuilding too early** — adding a backend or real AI before the product loop
  is validated. Resist it; validate first (Phase 1).
- **Confusing mock behavior with real behavior** — the biggest reputational risk. A
  user who thinks Forge called a model, or wrote to their disk, when it didn't, is a
  broken-trust event. The honesty rules exist to prevent this.
- **Adding backend before the loop is clear** — server routes, secrets, and rate
  limits are real cost and real surface area; only introduce them once a specific,
  validated need exists.
