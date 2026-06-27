# Tavronus Forge — UI Bug Hunt Report

Focused UI/behavior bug hunt from the Overnight Audit Pass 1.

---

## 1. Purpose

Track UI glitches and behavior issues across the workspace and marketing surfaces.

## 2. Testing method

- **Static component-level inspection** of all UI source (full read of every component/hook/lib this session and across Passes 2–8).
- **Build verification** (`npm run build` passes; routes prerender).
- **Dev smoke** (`npm run dev` on 5642): `/`, `/workspace`, `/about` → 200; invalid route → 404 (Next not-found); no compile errors; honest labels render server-side.
- **Production smoke** (curl): `/`, `/workspace`, `/about` → 200; invalid → 404.
- **Limitation:** no GUI browser in this environment, so live click / drag / keyboard interaction was **not** exercised by hand. Pixel-level rendering and pointer-drag feel are unverified here.

## 3. Areas checked

`/`, `/workspace`, `/about`, `StartScreen`, `BootScreen`, `LandingPage`,
`FakeIDEPreview`, `WorkspaceShell`, Explorer panel, `EditorPane`, `TabStrip`,
`ForgeSessionCard`, `OutputCard`, `ApplyPreview`, command palette, settings popover,
panel resizing, keyboard shortcuts, localStorage/VFS.

## 4. Bug table

| Bug ID | Area | Severity | Description | Evidence | Fixed this pass? | Fix summary | Needs future pass? |
|---|---|---|---|---|---|---|---|
| — | — | — | No P0/P1/P2 UI bugs found. | Build green; routes 200; checker passes for Passes 7–8 | n/a | n/a | n/a |
| N1 | `/about` honesty | P3 | No explicit "mock / no real AI yet" line; relies on roadmap to convey it | `LandingPage.tsx` | No (documented) | Add a small mock-status line (positioning decision) | Optional (Onboarding/Positioning Pass) |
| N2 | Panel persistence | P3 | Open-state persist "skip-guard" ref is a no-op (writes on mount); harmless — stored value always ends correct | `WorkspaceShell.tsx` hydration/persist effects | No (documented) | Tidy the guard or drop it; behavior already correct | Optional |
| N3 | BootScreen copy | P3 | Mild boot theater ("Binding AI command layer…") — intentional brand flavor, not a false claim | `BootScreen.tsx` | No (documented) | Subjective; leave as-is unless testers dislike it | Optional |

No bug rises above P3. N1–N3 are polish/judgment notes, not defects.

## 5. Interaction checklist (verified statically / via smoke; ✅ = code path sound)

- [x] Route loads (`/`, `/workspace`, `/about`) — smoke 200
- [x] Invalid route → not-found — smoke 404
- [x] File open / switch — `useTabs` reducer (checker-verified earlier)
- [x] Dirty state — tracked in `useTabs`; dot in `TabStrip`
- [x] Save (Ctrl/Cmd+S) — `WorkspaceShell.handleSave` → VFS write + `markActiveSaved`
- [x] Generate artifact — `useForgeAI.generate` → `forgeArtifacts`
- [x] Copy whole card / snippet — `OutputCard` (two handlers, shared clipboard helper)
- [x] Apply mock patch — `forgePatch.buildPatch` → `ApplyPreview` → open tab only
- [x] Cancel patch — `ApplyPreview` onCancel / Esc
- [x] Command palette (Ctrl/Cmd+K) — global key handler + dialog
- [x] Settings popover — Theme/Mode/Port/Version + Shortcuts
- [x] Panel collapse / reopen — `sidebarOpen`/`aiPanelOpen` + persisted keys
- [x] Panel resize (drag) — `beginResize` (Pass 7, checker-verified)
- [x] Keyboard resize — `onSeparatorKey` (Pass 8, directions checker-verified)
- [x] Reload persistence — VFS + width + open-state keys
- [ ] **Live pointer-drag / focus-ring feel** — NOT verifiable without a GUI browser

## 6. Known limitations

- No interactive browser: live drag feel, focus-ring appearance, hover transitions, pixel layout, and clipboard side-effects were not visually confirmed.
- Artifact *quality/usefulness* is a product judgment, not a bug-hunt item — defer to validation.

## 7. Recommended next UI fix pass

**None required.** No P0–P2 UI issues exist. The P3 notes (N1–N3) are optional and
best handled inside a future Onboarding/Positioning pass rather than a dedicated UI fix pass.
