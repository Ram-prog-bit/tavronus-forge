# Forge v2 — Dependency Plan

> Careful, minimal, honest. "Download everything needed" does **not** mean install every
> hype tool. Only safe essentials for the upcoming Design System Day were installed.

## Package manager

**npm** (`package-lock.json` present). All installs use npm to keep the lockfile single.

## Before this pass (baseline)

**dependencies:** `next@14.2.5`, `react@^18`, `react-dom@^18`
**devDependencies:** `@types/node`, `@types/react`, `@types/react-dom`,
`autoprefixer`, `eslint`, `eslint-config-next@14.2.5`, `postcss`,
`tailwindcss@^3.4.1`, `typescript@^5`

Already present and configured:
- ✅ Tailwind CSS (with the `forge` color palette in `tailwind.config.ts`)
- ✅ PostCSS + autoprefixer
- ✅ TypeScript

Missing before this pass: `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`,
`class-variance-authority`, `shadcn/ui`.

## Installed this pass (safe essentials)

| Package | Version | Why | Risk |
|---|---|---|---|
| `clsx` | `^2.1.1` | conditional className composition (the `cn()` util) | minimal, tiny, ubiquitous |
| `tailwind-merge` | `^3.6.0` | safe merging of conflicting Tailwind classes | minimal, pairs with clsx |
| `lucide-react` | `^1.21.0` | consistent, clean icon set for a premium UI | low; tree-shakeable |
| `framer-motion` | `^12.42.0` | restrained, premium motion (150–300ms transitions) | low; respect reduced-motion, no infinite anims |

Install command used:
```
npm install clsx tailwind-merge lucide-react framer-motion
```
Result: `added 6 packages`. Production `npm run build` passes; all 4 routes build.

These four are exactly what Design System Day needs: a `cn()` utility (clsx +
tailwind-merge), icons (lucide-react), and motion (framer-motion). Nothing more.

## Deliberately NOT installed (and why)

| Package / tool | Decision | Reason |
|---|---|---|
| `class-variance-authority` | **later** | only needed once we build variant-based primitives; defer until Design System Day actually needs it |
| `shadcn/ui` | **no (blind install banned)** | do not scaffold blindly; revisit deliberately if/when wanted |
| Graphify | **no** | not yet; planned integration only |
| GStack / ECC | **no** | not yet; planned integration only |
| Ponytail | **no** | not yet |
| Playwright | **no** | not present; needs explicit approval |
| Vercel CLI (global) | **no** | needs explicit approval; Vercel already linked via dashboard |
| MCP servers | **no** | not for engine priming |
| Browser-automation pkgs | **no** | planned/real later only |
| AI SDK / backend pkgs | **no** | no real AI/backend this phase |
| auth / database pkgs | **no** | no real auth/db this phase |

## Security note (honest)

`npm audit` reports **8 vulnerabilities (1 critical, 6 high, 1 moderate)**. These are
**pre-existing**, originating from `next@14.2.5` and `eslint-config-next` — **not** from
the four packages installed this pass. `npm audit fix --force` would upgrade Next to v16
(a breaking change) and is **out of scope** for engine priming. Track a deliberate
Next.js upgrade as a separate, approved task.

## Optional later (when their day comes)

- `class-variance-authority` — for variant-driven primitives (likely Design System Day).
- A test runner / Playwright — for QA automation, with approval.
- Vercel CLI — only if local deploy control is wanted, with approval.

## Rule

If a dependency is missing but clearly essential for the next approved task, install it
with npm and document it here. If unsure, do not install — list it under "optional later."
