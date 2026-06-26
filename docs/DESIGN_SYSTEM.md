# Tavronus Forge — Design System

Captured from UI Polish Passes 2–8. This is the visual + interaction contract.
New work **inherits** this system; it does not re-invent it.

---

## Brand vibe

**Obsidian, gunmetal, chrome, electric blue.** A premium AI-lab / IDE cockpit:
dark, dense, serious, calm. One accent color (electric blue) used sparingly for
meaning, never for decoration. Think "professional tool," not "gamer RGB."

---

## Color tokens

Defined in `tailwind.config.ts` under `colors.forge`:

| Token | Hex / value | Role |
|---|---|---|
| `forge-black` | `#080A0C` | App background, deepest surface |
| `forge-obsidian` | `#0D0F12` | Panels, recessed surfaces, active-tab tone |
| `forge-gunmetal` | `#161A20` | Raised surfaces, popovers, modals |
| `forge-panel` | `#1C2028` | Card / panel fills (usually at low opacity) |
| `forge-border` | `#252B35` | Default borders / seams |
| `forge-blue` | `#2D8EFF` | The accent — active state, focus, links, emphasis |
| `forge-blue-dim` | `#1A5CB8` | Accent gradient end / pressed accent |
| `forge-blue-glow` | `rgba(45,142,255,0.15)` | Subtle accent glow |
| `forge-chrome` | `#C8D0DC` | Primary text |
| `forge-silver` | `#8A95A3` | Secondary text |
| `forge-muted` | `#4A5568` | Tertiary / disabled / labels |

Most surfaces and borders are applied at **fractional opacity**
(`border-forge-border/30`, `bg-forge-obsidian/50`) to keep the palette layered
and soft rather than flat blocks of color.

---

## Typography

- **Sans:** Inter — UI chrome, headings.
- **Mono:** JetBrains Mono (`.forge-mono`) — code, labels, data, most IDE text.
  Mono-forward is part of the identity.
- **Density:** small sizes (`text-[9px]`–`text-[13px]` dominate). Information
  density over whitespace. Uppercase + wide tracking for section labels.

---

## Contrast tiers (from Pass 2)

Three deliberate tiers — the system's biggest readability fix:

- **Primary** (~80–90% — `forge-chrome`) — titles, active values, the thing you read.
- **Secondary** (~55–65% — `forge-silver`) — supporting text, body lines.
- **Muted** (~40–50% — `forge-muted`) — labels, hints, disabled, decoration.

Never let primary content sit at muted opacity. Tiers exist so the eye lands on
the right thing first.

---

## Depth / elevation (from Pass 3)

Restrained, black-shadow based — no colored glows for structure. Utilities in
`app/globals.css`:

- `.forge-topbar-depth` — soft downward shadow under the top bar.
- `.forge-editor-recessed` — inset side shadows so the editor reads as *recessed*
  and side panels as *raised*.
- `.forge-card-raised` — output cards lifted off the panel (drop shadow + a 4%
  blue inner hairline).

Layering tone: `forge-black` (deepest) → `obsidian` (panels) → `gunmetal`
(raised/popovers). Elevation is communicated by tone + subtle shadow, not borders alone.

---

## Border system

- Default seam: `border-forge-border` at ~30–45% opacity.
- Accent border (active/selected): `border-forge-blue` at ~25–70%.
- Left-accent rails (`border-l-2 border-forge-blue/…`) mark active rows
  (Explorer file, command-palette selection, session card).
- Borders are thin and low-contrast; they suggest separation, they don't draw boxes.

---

## Active / selected states

- **Active tab** — obsidian tone + a 2px blue top hairline + a 1px obsidian
  bottom-cut that merges it into the editor (the "structural merge" from Pass 4).
- **Active mode chip** — blue border + `bg-forge-blue/15` + blue text + faint glow.
- **Selected palette row / active file** — `bg-forge-blue/12` + left blue accent rail.
- **Dirty tab** — a glowing blue dot (replaces the file icon while dirty).

---

## Micro-interactions (from Pass 4)

- `.forge-press` — fast (120–130ms) transitions on transform/bg/color/border/shadow;
  a 0.5px `translateY` on `:active`. Subtle, premium press feedback.
- Global keyboard focus ring — `box-shadow: 0 0 0 1.5px rgba(45,142,255,0.5)` on
  `button`, `[role="tab"]`, `[role="menuitem"]` `:focus-visible`.
- Rules: transitions 100–180ms; transforms ≤ ~0.5px; **no flashy glow, no bounce,
  no layout-animating properties**.

---

## File icons (from Pass 3)

- Lightweight **monogram glyphs**, not an icon library: `tsx/jsx → ◇`, `ts → TS`,
  `js → JS`, `json → {}`, `css → #`, `md → M`, `py → PY`, default `•`.
- Tinted per type via `getFileColor`. Deliberately simple; **no icon-library dependency.**

---

## Output card principles (Passes 5–6)

- Cards are **structured deliverables**: accent bar + uppercase title + a type
  `label` badge; body bullets with a blue `›` marker.
- **Snippets are framed and content-aware:** a header with an inferred type/language
  label (`TS`/`TSX`/`PYTHON`/`TREE`/`Prompt`) + a dedicated copy button.
- **Code** gets a line-number gutter and horizontal scroll (`whitespace-pre`);
  **prompts** wrap (`whitespace-pre-wrap`) and skip numbering.
- **Copy is layered:** whole-card copy *and* snippet/prompt copy, each with local
  "Copied" feedback. No syntax-highlighting library.

---

## Command palette principles (Pass 4)

- Elevated gunmetal surface, layered shadow, faint blue ring.
- Selected row: `bg-forge-blue/12` + left blue accent + blue-tinted hint.
- Search input with a blue focus underline; a footer hint row
  (`↑↓ navigate · ↵ run · esc dismiss`).
- Behavior is fixed: Ctrl/Cmd+K toggles, Esc dismisses, substring filter only —
  **no fuzzy search, no new commands** without intent.

---

## Panel resizing principles (Passes 7–8)

- Explorer + Forge AI panels are drag- and keyboard-resizable via `role="separator"`
  handles (`.forge-resize-handle` — a 5px transparent strip with a 1px blue line on
  hover/drag, brighter on `:focus-visible`).
- Widths and open/collapsed state persist to dedicated localStorage keys.
- Constraints: Explorer 180–320px (default 224), Forge AI 320–560px (default 384);
  drag/keyboard share the same clamp + a viewport-aware max so the editor stays usable.
- Arrow keys nudge (16px / Shift 48px); double-click resets to default. Defaults match
  the original `w-56`/`w-96` so SSR/first paint never mismatch.

---

## Accessibility principles

- `role`/`aria` on real semantic elements: tabs (`role="tab"` + roving tabindex),
  menus (`role="menu"`/`menuitem`), dialogs (`aria-modal`), separators
  (`role="separator"` + `aria-orientation` + `aria-value*`).
- Visible `:focus-visible` indicators everywhere; never remove a focus ring without
  replacing it.
- Don't trap focus; don't break tab order.
- Known honest gaps (documented, not hidden): no live-region width announcement on
  resize; resize handles are mouse/keyboard only (no touch drag).

---

## "Do not do" list

- ❌ **No neon spam.** One accent (electric blue), used for meaning. No glow walls.
- ❌ **No childish gradients.** Surfaces are tonal; the only gradient is the primary
  button's blue→blue-dim.
- ❌ **No fake hacker cringe.** No matrix rain, no fake "hacking…" theatrics, no
  emoji-as-UI. Serious tool, calm voice.
- ❌ **No unlabelled mock behavior.** Mock = labelled mock (see `REALITY_MAP.md`).
- ❌ **No random UI rewrites.** Enhance the existing system; don't re-theme,
  re-layout, or swap patterns without a clear, reviewed reason.
- ❌ **No new dependencies for cosmetics** — no icon libraries, no
  syntax-highlighting libraries, no animation libraries.
