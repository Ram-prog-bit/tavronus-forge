# Forge v2 — Design System

> This is the visual constitution for Forge v2. The **first implementation day must be
> Design System Day only** — tokens, primitives, typography, spacing, cards, buttons,
> panels, badges, and status styles. No full screens.

## Design direction

Forge v2 should feel:

- **Clean like Linear** — generous spacing, calm hierarchy, nothing shouting.
- **Sharp like Cursor** — precise, technical, fast.
- **Polished like Vercel** — premium dark surfaces, crisp edges.
- **Technical like VS Code** — monospace where it earns its place, dense when needed.
- **Serious like an AI-lab command center** — instruments, not toys.

It must **not** be: fake hacker, random neon, cluttered, vibe-coded, or over-glowing.

## Color system

Premium dark AI-lab. Ratio target: **~90% dark neutral, ~8% electric blue, ~2% violet.**
Violet is a brand aura, used rarely — never the whole UI.

The v1 Tailwind config already ships a compatible `forge` palette. V2 reuses and extends it.

| Token | Hex | Role |
|---|---|---|
| `forge.black` | `#080A0C` | deepest background |
| `forge.obsidian` | `#0D0F12` | app background |
| `forge.gunmetal` | `#161A20` | raised surface |
| `forge.panel` | `#1C2028` | panel/card surface |
| `forge.border` | `#252B35` | hairline borders |
| `forge.blue` | `#2D8EFF` | **primary accent** (cold electric blue) |
| `forge.blue-dim` | `#1A5CB8` | pressed/secondary blue |
| `forge.chrome` | `#C8D0DC` | primary text (chrome/cool white) |
| `forge.silver` | `#8A95A3` | secondary/muted text (steel) |
| `forge.muted` | `#4A5568` | disabled/tertiary text |

**To add for v2 (Design System Day):**

| Token | Suggested | Role |
|---|---|---|
| `forge.violet` | `#7C5CFF` | secondary accent (deep violet) — **rare aura only** |
| `forge.success` | `#3FB950` | status: real / passing / tested |
| `forge.warn` | `#D29922` | status: planned / caution / untested |
| `forge.danger` | `#F85149` | status: error / failing / blocked |
| `forge.mock` | `#8A95A3` | status: mock (neutral steel, never alarming) |

Rules:

- Status colors appear **only when meaningful** — never decorative.
- No glow spam. The v1 `forge-glow` shadows exist; in v2 use glow sparingly and small,
  reserved for primary focus/active states, never as ambient decoration.
- Violet is reserved for brand moments (logo aura, rare highlight), not surfaces.

## Typography hierarchy

Sans: Inter (UI). Mono: JetBrains Mono / Fira Code / Cascadia / Consolas (code, IDs,
metrics, diffs).

| Level | Use | Approx |
|---|---|---|
| Display | hero / mission title | 28–32px, tight, chrome |
| H1 | screen title | 22–24px semibold |
| H2 | panel title | 16–18px semibold |
| H3 | card title | 14–15px medium |
| Body | default text | 14px, silver/chrome |
| Caption | metadata, labels | 12px, silver |
| Mono | code, ids, status codes | 12–13px mono |

Line-height calm (1.4–1.6 body). Avoid all-caps except tiny labels/badges with tracking.

## Spacing scale

Use a 4px base scale: `2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`.
Panels align to an 8px grid. Everything lines up — no eyeballed offsets.

## Panel hierarchy

- **Background** (`forge.obsidian`) → **Panel** (`forge.panel`, 1px `forge.border`) →
  **Card** (slightly raised, subtle inner separation).
- Hairline borders over shadows for structure. Shadows are subtle depth, not glow.
- Radius: panels `12px`, cards `10px`, controls `8px`, badges `6px` (consistent, calm).

## Card system

- Base card: `forge.panel` surface, `1px forge.border`, 16–20px padding.
- Header row (title + status badge), body, optional footer (actions/meta).
- Hover: border lifts to a brighter steel; no scale-jump, no glow burst.

## Button hierarchy

| Variant | Look | Use |
|---|---|---|
| Primary | electric blue fill, chrome text | main action (one per view) |
| Secondary | gunmetal fill, chrome text, border | common actions |
| Ghost | transparent, silver text, hover bg | low-emphasis |
| Danger | danger color (outline/fill) | destructive, gated |
| Icon | square, ghost base | toolbar actions |

States: default / hover / active / focus (blue ring) / disabled (muted). Focus is always
visible and keyboard-accessible.

## Tabs

Underline or pill style, single active accent (blue). Inactive = silver. No more than
one active indicator. Keyboard navigable.

## Badges

Small, 6px radius, 11–12px, optional leading dot. Used for status and honesty labels.
Never decorative.

## Status indicators

A small dot + label system, also used for the **honesty layer**:

| State | Color | Meaning |
|---|---|---|
| Real | success green | wired to real data/behavior |
| Mock | steel | placeholder data, no real backing |
| Planned | warn amber | designed, not built |
| Tested | success green (✓) | verified with evidence |
| Untested | warn amber | built, not verified |
| Error / Blocked | danger red | failing or blocked |

The only permitted "infinite" animation is a tiny pulsing status dot (e.g. live/running).

## Component blueprints

- **Agent cards** — avatar/role glyph, name, model tier badge, status dot, current task,
  last-action timestamp. Calm, instrument-like.
- **Evidence cards** — evidence type, source, timestamp, summary, expandable proof
  (logs/diffs), real/mock label.
- **Patch cards** — scope summary, files touched count, diff preview, approve/reject,
  "one builder at a time" indicator.
- **Log blocks** — monospace, timestamped lines, severity color on the gutter only.
- **Code / diff blocks** — mono, syntax-muted, additions/removals with restrained
  green/red, copy affordance.
- **Empty states** — calm icon + one-line explanation + single primary action. Never a
  blank void, never noisy.
- **Loading states** — skeletons or a subtle progress bar; no spinners that imply work
  that isn't happening (honesty applies to motion too).
- **Error states** — danger accent, plain-language message, recovery action, never a raw
  stack dump in the main UI.

## Responsive rules

- Primary target: desktop command center (wide). Layout is panel/grid based.
- Graceful narrowing: panels stack, navigation collapses, no horizontal scroll traps.
- Minimum sensible width before stacking; touch targets ≥ 40px when narrow.

## Motion rules

- Normal transitions: **150–250ms**. Larger transitions: **max 300ms**.
- Respect `prefers-reduced-motion` — disable non-essential motion.
- **No infinite animations** except tiny status indicators (pulsing dot).
- **No animation that hides truth** — never fake progress, never animate a mock into
  looking real.
- No laggy, template-style, or bouncy motion. Easing is calm (ease-out / standard).

## The rule

> **The first implementation day must be Design System Day only.** Build tokens and
> primitives first. Do not implement command-center screens on Design System Day.
