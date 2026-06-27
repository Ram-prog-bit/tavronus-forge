# Tavronus Forge — QA Test Matrix

A practical, manual test matrix for the **current local/mock MVP**. Anyone (Ram or
a coding agent) can run it to confirm the app still works. This tests the mock
product — **not** real AI, backend, filesystem, or terminal (none exist).

---

## 1. Purpose

Verify the current shipped behavior of Tavronus Forge route-by-route and
flow-by-flow, and record failures with severity. This is QA of the mock MVP.

## 2. Test environment

- `npm install` (only if deps aren't installed)
- `npm run dev` → **http://localhost:5642**
- Production URL (`https://tavronus-forge-the-real-one.vercel.app`) may be checked separately.
- Browser: any modern Chromium/Firefox.
- Do **not** treat this as real-AI/backend testing — it's local/mock.

## 3–15. Test areas

Use the table in §16 to record each. The areas and what "expected" means:

- **Routes** — `/` (start screen), `/workspace` (cockpit), `/about` (landing). An invalid route (e.g. `/zzz`) must show Next's not-found, not crash the app.
- **Start screen** — app-first entry, brand + tagline, action tiles route into `/workspace`, **Local Mock Mode** badge visible, no real-AI claim.
- **Workspace layout** — Explorer + Editor + Forge AI panel + status/terminal bar render; dark IDE cockpit feel; no clipped/overlapping panels.
- **Tabs** — open file, switch, dirty dot appears on edit, close (with unsaved confirm), active-tab styling, overflow scroll.
- **VFS / localStorage** — seeded mock files appear; edits persist on reload; Ctrl/Cmd+S clears the dirty dot (mock save); **no "saved to disk" claim**.
- **Forge AI modes** — Plan / Prompt / Review / Debug / Checklist switch; composer placeholder updates per mode; Forge Output produces an artifact; **Local Mock** label present.
- **OutputCard** — title/label/body render; framed snippet with language label + line numbers for code; prompt blocks wrap; whole-card Copy and snippet/prompt Copy both work with "Copied" feedback.
- **ApplyPreview** — opens on a code artifact; Current vs After shown; "Local mock patch · edits the open tab only · not saved until ⌘S"; Accept edits open tab (becomes dirty); Cancel/Esc closes.
- **Command palette** — Ctrl/Cmd+K opens; input auto-focuses; selected row highlighted; footer hints; Esc/click closes; no command claims a nonexistent backend (no "Run terminal"/"Deploy").
- **Settings / shortcuts** — popover opens/closes; shows Theme/Mode/Port(5642)/Version + Shortcuts list; shortcuts match real behavior.
- **Resizable / collapsible panels** — drag Explorer + Forge AI dividers; keyboard focus the separator; Arrow resize (correct direction); Shift+Arrow larger step; double-click reset; collapse/reopen; widths + open state persist on reload.
- **Accessibility** — focus-visible rings on controls and dividers; icon-only buttons have aria-labels/titles; modals/popovers closable; no keyboard trap.
- **Production smoke** — `/`, `/workspace`, `/about` load on the production URL; docs-only pushes didn't break the site. Do **not** manually deploy from QA.

## 16. Test table

| ID | Area | Steps | Expected | Status | Notes | Severity if failed |
|---|---|---|---|---|---|---|
| R1 | Route / | Load `/` | Boot → start screen, mock badge | | | |
| R2 | Route /workspace | Load `/workspace` | Cockpit renders, no crash | | | |
| R3 | Route /about | Load `/about` | Landing renders, honest roadmap | | | |
| R4 | Invalid route | Load `/zzz` | Next not-found, app intact | | | |
| S1 | Start screen | Read + enter | Clear identity, tiles route in | | | |
| W1 | Workspace layout | Inspect panels | Explorer/Editor/AI/status all visible | | | |
| T1 | Tabs | Open + switch | Active styling, content correct | | | |
| T2 | Tabs | Edit a file | Dirty dot appears | | | |
| T3 | Tabs | Close dirty tab | Unsaved confirm | | | |
| V1 | VFS | Edit + Ctrl/Cmd+S | Dirty clears (mock save) | | | |
| V2 | VFS | Reload page | Edits persist (localStorage) | | | |
| M1 | Mode Plan | Generate | Blueprint-style artifact | | | |
| M2 | Mode Prompt | Generate | Copy-paste prompt artifact | | | |
| M3 | Mode Review | Generate | Strengths/issues/fixes artifact | | | |
| M4 | Mode Debug | Generate | Cause/fix/verify artifact | | | |
| M5 | Mode Checklist | Generate | Tasks/criteria artifact | | | |
| O1 | OutputCard | Copy whole card | Clipboard has full artifact | | | |
| O2 | OutputCard | Copy snippet/prompt | Clipboard has snippet only | | | |
| O3 | OutputCard | Long code | Gutter + horizontal scroll | | | |
| A1 | ApplyPreview | Apply code card | Preview opens, mock-patch note | | | |
| A2 | ApplyPreview | Accept | Open tab edited + dirty | | | |
| A3 | ApplyPreview | Cancel/Esc | Closes, no change | | | |
| C1 | Palette | Ctrl/Cmd+K | Opens, input focused | | | |
| C2 | Palette | Esc | Closes | | | |
| G1 | Settings | Open popover | Theme/Mode/Port 5642/Version + Shortcuts | | | |
| P1 | Panels | Drag dividers | Resizes within clamp | | | |
| P2 | Panels | Keyboard resize | Arrow/Shift+Arrow correct direction | | | |
| P3 | Panels | Double-click | Resets to default width | | | |
| P4 | Panels | Collapse + reload | Collapsed state persists | | | |
| X1 | A11y | Tab through | Visible focus rings, no trap | | | |
| Z1 | Prod smoke | Load 3 routes | All 200 | | | |

## 17. Severity scale

- **P0 blocker** — build broken, main route crashes, workspace unusable, local VFS data loss, or a severe false claim of real AI/filesystem/terminal.
- **P1 serious** — a core flow (copy/apply/save/generate/resize) broken, broken route link, or unclear mock honesty in core UI.
- **P2 normal** — confusing wording, minor interaction issue, missing label, small overflow/readability issue.
- **P3 polish** — visual refinement, copy preference, non-blocking style.

## 18. Final QA verdict (fill in)

- Commit tested: ______
- Date: ______
- Browser: ______
- Tester: ______
- Pass count: ______  Fail count: ______
- Blockers (P0/P1): ______
- Recommended next fix pass: ______
