# Forge v2 — Design System Day Spec

> The build spec for the **next** real coding day. Design System Day builds the visual
> foundation **only**. No command-center screens. This is the single most important doc
> for the next session.

## Objective

Establish a clean, premium, reusable design foundation for Forge v2 — tokens, CSS
variables, typography, spacing, and core primitives — so every future screen is assembled
from a consistent system rather than ad-hoc styling.

## Scope (allowed)

- **Design tokens** in `tailwind.config.ts` — extend the existing `forge` palette:
  add `forge.violet` (deep violet aura) and status colors (`success`, `warn`, `danger`,
  `mock`).
- **CSS variables** in `app/globals.css` for tokens that benefit from runtime theming.
- **Typography hierarchy** — display / h1 / h2 / h3 / body / caption / mono.
- **Spacing scale** — 4px base, 8px grid utilities/conventions.
- **Layout primitives** — container, panel, grid, stack (as components or utility patterns).
- **Core components** — cards, buttons (primary/secondary/ghost/danger/icon), panels,
  badges, tabs, status indicators.
- **State styles** — empty / loading / error.
- **Motion rules/tokens** — 150–250ms normal, ≤300ms larger, reduced-motion respected.

## Out of scope (forbidden this day)

- ❌ Full screen rebuilds (Mission Control, Agent Board, Project Memory, Evidence Vault,
  Patch Review, Deployment Status).
- ❌ Agent Board / Evidence Vault / Patch Review **implementation**.
- ❌ Real integrations: backend, auth, database, AI API, filesystem, terminal, browser.
- ❌ Route changes; ❌ port change (5642 stays).
- ❌ Heavy new deps (shadcn, CVA) without explicit approval.
- ❌ Production deploy / master merge / force push.

## Likely files involved

- `tailwind.config.ts` (token extensions)
- `app/globals.css` (CSS variables, base styles)
- `components/` (new primitive components — small, focused)
- possibly a new `components/ui/` folder for primitives (reuse existing patterns first)
- possibly `lib/` helper for a `cn()` utility (clsx + tailwind-merge — already installed)

## Forbidden files / changes

- `package.json` scripts (port 5642 must not change).
- `app/page.tsx`, `app/workspace/page.tsx`, `app/about/page.tsx` — **no behavior/route
  changes** (light token adoption only if explicitly in scope and approved).
- Anything implying a real integration.

## Design tokens to add

| Token | Suggested | Role |
|---|---|---|
| `forge.violet` | `#7C5CFF` | secondary accent — rare brand aura only |
| `forge.success` | `#3FB950` | real / passing / tested |
| `forge.warn` | `#D29922` | planned / caution / untested |
| `forge.danger` | `#F85149` | error / failing / blocked |
| `forge.mock` | `#8A95A3` | mock (neutral steel) |

(Existing `forge` palette — black/obsidian/gunmetal/panel/border/blue/blue-dim/chrome/
silver/muted — is reused as-is.)

## Color rules

- Ratio ~90% dark neutral, ~8% electric blue, ~2% violet aura.
- Status colors only when meaningful. No glow spam; glow is small and reserved for
  primary focus/active states.
- Violet never becomes a surface color.

## Typography rules

- Sans = Inter; Mono = JetBrains Mono / Fira Code / Cascadia / Consolas.
- Hierarchy: Display 28–32 · H1 22–24 · H2 16–18 · H3 14–15 · Body 14 · Caption 12 · Mono 12–13.
- Calm line-height (1.4–1.6 body). All-caps only for tiny tracked labels.

## Spacing rules

- 4px base scale: 2/4/8/12/16/20/24/32/40/48/64. Panels align to 8px grid. No eyeballed offsets.

## Component primitive rules

- Radii: panels 12, cards 10, controls 8, badges 6.
- Hairline borders (`forge.border`) over heavy shadows. Subtle depth, not glow.
- One primary button per view. Always-visible focus ring (blue).
- Badges/status: small, optional leading dot; used for honesty labels (real/mock/planned/
  tested/untested).

## Motion rules

- 150–250ms normal; ≤300ms larger; calm easing.
- Respect `prefers-reduced-motion`.
- No infinite animation except a tiny status pulse. No motion that fakes progress.

## Agent routing for the day

CEO Lead (plan/approve) · Design Director (define/approve tokens + primitives) · Frontend
(implement, one area at a time) · QA/UI (states + routes + a11y basics) · Release/Test
(`npm run build`, port/routes) · Patch Guardian (diff review) · Docs/Report (report) +
Memory (log + Reality Map). Models: balanced preset (`FORGE_V2_MODEL_ROUTING.md`).

## Build / check process

1. CEO confirms branch/status/port; loads design docs.
2. Design Director approves the token + primitive plan.
3. Frontend implements one primitive group at a time.
4. After each group: `npm run build`; QA/UI checks states + routes.
5. Patch Guardian reviews the diff; reject scope creep.
6. Confirm port 5642 + routes unchanged.
7. Docs/Report writes the report; Memory updates the log + Reality Map.

## Final report format

**Tokens added** · **Primitives built** · **Files changed** · **Build result** · **QA
findings** · **Guardian verdict** · **Honesty/Reality Map deltas** · **Next day**
(e.g. Shell/Layout Day).
