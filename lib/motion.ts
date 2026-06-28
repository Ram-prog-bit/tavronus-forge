// Forge v2 motion tokens — durations, easing, and a few reusable variant
// presets. Plain data (no React, no provider, no framer-motion import here) so
// it stays a zero-cost token source. Components opt into framer-motion locally.
//
// Rules (see docs/FORGE_V2_DESIGN_SYSTEM.md):
//   - 150–250ms normal transitions, ≤300ms larger ones.
//   - Respect prefers-reduced-motion (handled globally in globals.css).
//   - No infinite animation except tiny status indicators.
//   - Never animate to imply work that isn't happening.

export const DURATION = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.25,
  slower: 0.3,
} as const;

// Standard/calm easing curve (matches --forge-ease).
export const EASE = [0.4, 0, 0.2, 1] as const;

// Common framer-motion variant presets for opt-in use by individual components.
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASE },
};

export const slideUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.slow, ease: EASE },
};

// True if the user prefers reduced motion (guarded for SSR). Components that add
// motion should check this and fall back to a static render.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
