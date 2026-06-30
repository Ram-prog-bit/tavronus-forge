"use client";

import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   Level 3 — command-system boot-up reveal (tiny, dependency-free).
   As each tagged section scrolls into view it "comes online": the CSS does the
   motion, this component only toggles the .tv-visible class via IntersectionObserver.

   Safety:
   - No-JS safe — the hidden state is gated behind the `tv-js-reveal` class this
     component adds to <html>. Without JS, every section renders fully visible.
   - Honors prefers-reduced-motion — reveals everything immediately, no observer.
   - Reveals once per element, then unobserves; disconnects on unmount.
   No external dependencies. No backend. No fake activity — purely presentational.
   ────────────────────────────────────────────────────────────────────────── */
export default function TavronusReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tv-reveal]"),
    );
    if (items.length === 0) return;

    // Turn on the JS-gated hidden state so the boot-up choreography can play.
    root.classList.add("tv-js-reveal");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("tv-visible"));
      return () => root.classList.remove("tv-js-reveal");
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tv-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("tv-js-reveal");
    };
  }, []);

  return null;
}
