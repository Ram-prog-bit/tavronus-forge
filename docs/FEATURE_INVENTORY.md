# Tavronus Forge — Feature Inventory

Source-of-truth inventory of what exists **right now**, grounded in the code at
HEAD `8eec620`. Separates *real today* from *mock/local today* from *not real yet*.

---

## 1. Purpose

A single, accurate reference for planning and QA: what's actually built, what's
mock, and what's explicitly future. Keep it honest; update it when behavior changes.

## 2. Real today (genuinely works)

- **Routes:** `/`, `/workspace`, `/about` (+ Next not-found for invalid paths).
- **Boot + start screen** (`BootScreen.tsx`, `StartScreen.tsx`) — boot animation, action tiles, Demo Recent (labelled sample entries), "Local Mock Mode" badge.
- **Landing / about** (`LandingPage.tsx`, `FakeIDEPreview.tsx`) — marketing page with an honest roadmap (real AI shown as an inactive v0.2 item).
- **Workspace shell** (`WorkspaceShell.tsx`) — top bar, menus, command palette, Explorer, editor, Forge AI panel, status/terminal bar.
- **File explorer / VFS UI** — Explorer tree derived from the VFS.
- **localStorage-backed VFS** (`lib/vfs.ts`, `hooks/useVfs.ts`) — content store + persistence; tree built from paths.
- **Tabs** (`hooks/useTabs.ts`, `TabStrip.tsx`) — open/close/activate, dirty tracking, per-tab view state, overflow, unsaved-change confirm.
- **Dirty state + mock save** — Ctrl/Cmd+S persists the open tab to the VFS and clears the dirty dot (localStorage, **not disk**).
- **Forge AI mode selector** (`lib/modes.ts`) — Plan / Prompt / Review / Debug / Checklist.
- **Deterministic mock artifacts** (`hooks/useForgeAI.ts`, `lib/forgeArtifacts.ts`) — editor-aware template generation; same input → same output.
- **OutputCard** (`OutputCard.tsx`) — structured artifact display, framed snippets w/ language label + line-number gutter, whole-card + snippet/prompt copy.
- **ApplyPreview mock patch flow** (`ApplyPreview.tsx`, `lib/forgePatch.ts`) — deterministic template patch, previewed, applied to the **open tab only**, never saved automatically.
- **Forge Session tracker** (`ForgeSessionCard.tsx`) — goal/phase/artifacts, persisted locally.
- **Command palette** — Ctrl/Cmd+K, substring filter, footer hints.
- **Settings popover** — Theme/Mode/Port(5642)/Version + a Shortcuts list.
- **Resizable / collapsible panels** — drag + keyboard resize, double-click reset, persisted widths + open state.
- **Keyboard ergonomics** — Ctrl/Cmd+K, Ctrl/Cmd+S, ⌘⏎/Ctrl+Enter, arrow/Shift+arrow divider resize, Esc.
- **Design system / dark IDE polish** — Passes 2–8 (contrast, depth, micro-interactions, artifacts, panels, keyboard).

## 3. Mock / local today (works, but simulated)

- **Forge AI output** — produced by deterministic local templates, not a model.
- **Patch generation** — template-based content transforms, not a real diff engine.
- **Virtual files** — localStorage records, not files on disk.
- **Save behavior** — writes to the localStorage VFS, not the filesystem.
- **Workspace / project state** — entirely browser-local; nothing synced or server-side.

## 4. Not real today (deliberately absent)

- ❌ Real AI API (no Claude/OpenAI/Anthropic call)
- ❌ Real filesystem access
- ❌ Terminal execution
- ❌ Backend APIs
- ❌ Auth
- ❌ Database
- ❌ Payments
- ❌ Cloud memory
- ❌ Project indexing
- ❌ Multi-user collaboration

## 5. Routes inventory

Only: `/`, `/workspace`, `/about`. **No `/brand` route exists** (verified — there is no `app/brand/page.tsx`).

## 6. Mode inventory

The five real modes (`lib/modes.ts` ids): `plan`, `prompt`, `review`, `debug`, `checklist`.

| Mode | Current purpose | Generates today (mock) | Needed for a real version |
|---|---|---|---|
| **Plan** | Idea → MVP blueprint | Blueprint, file structure, build steps, scope guard | A model + light project context |
| **Prompt** | Copy-paste prompts for AI tools | Claude Code / GPT / Cursor / QA prompt blocks | A model + open-tab context (smallest real wedge) |
| **Review** | Code review | Strengths, issues, fixes, test checklist (from regex analysis of open tab) | Real multi-file code context |
| **Debug** | Error diagnosis | Likely cause, fix plan, areas to inspect, verify steps | Real code + stack-trace context |
| **Checklist** | Idea → day-one tasks | Today / This week / ship criteria / done log | A model (lower leverage) |

## 7. Storage inventory (verified from source)

All browser-local `localStorage` keys (verified in code):

| Key | Source | Purpose |
|---|---|---|
| `tavronus-forge-vfs-v1` | `lib/vfs.ts` | VFS content store |
| `tavronus-forge-session-v1` | `hooks/useForgeAI.ts` | Forge Session |
| `tavronus-forge-sidebar-width-v1` | `components/WorkspaceShell.tsx` | Explorer width |
| `tavronus-forge-ai-panel-width-v1` | `components/WorkspaceShell.tsx` | Forge AI panel width |
| `tavronus-forge-sidebar-open-v1` | `components/WorkspaceShell.tsx` | Explorer open/collapsed |
| `tavronus-forge-ai-panel-open-v1` | `components/WorkspaceShell.tsx` | Forge AI open/collapsed |

## 8. Risk inventory

- Users thinking the mock AI is real (esp. on the marketing `/about` page).
- Mock artifact quality being mistaken for real product value.
- UI density overwhelming beginner users.
- Adding real AI before validating the workflow.
- Overbuilding backend before Prompt mode is proven.

## 9. Future feature queue (future only — not built)

- Optional server-side Prompt mode (first real wedge).
- Context selector (choose what's sent).
- Real diff proposal (model proposes; apply still local/confirmed).
- Project import / indexing.
- Real file write workflow.
- Auth / account system.
- Cloud project memory.
