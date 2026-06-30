"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

/* ──────────────────────────────────────────────────────────────────────────
   Level 7 · Scene 1 — Frozen Command Core (orchestrator)
   Owns the full-bleed opening section: HUD text overlay (plain DOM, server
   rendered so it survives no-JS / no-WebGL), the GSAP ScrollTrigger that maps
   scroll → a transformation value, and the client-only R3F canvas mount.

   Honesty: nothing here is wired to a backend, agent, or model. The
   "transformation" gauge is literally the scroll position — a preview of the
   planned dissipate-and-rebuild sequence, not live system activity.
   ────────────────────────────────────────────────────────────────────────── */

// Client-only — three/R3F must never run on the server.
const FrozenCoreCanvas = dynamic(() => import("./FrozenCoreCanvas"), {
  ssr: false,
});

/* If the WebGL context throws at runtime, fall back silently to the CSS
   frosted chamber + text (which are always rendered behind the canvas). */
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function detectGL() {
  try {
    const canvas = document.createElement("canvas");
    const webgl2 = !!canvas.getContext("webgl2");
    const webgl =
      webgl2 || !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    return { webgl, webgl2 };
  } catch {
    return { webgl: false, webgl2: false };
  }
}

export default function FrozenCommandScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0); // read by R3F useFrame; never triggers re-render

  const [showCanvas, setShowCanvas] = useState(false);
  const [interactive, setInteractive] = useState(true); // tall + scroll-driven
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [postFx, setPostFx] = useState(true);
  const [counts, setCounts] = useState({ shardCount: 30, particleCount: 440, burstCount: 560 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;
    const { webgl, webgl2 } = detectGL();

    // Low tier on small screens or modest hardware; postprocessing needs WebGL2.
    const low =
      narrow ||
      (navigator.hardwareConcurrency || 8) <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8) <= 4;

    setQuality(low ? "low" : "high");
    setPostFx(webgl2);
    setCounts(
      low
        ? { shardCount: 16, particleCount: 180, burstCount: 260 }
        : { shardCount: 30, particleCount: 440, burstCount: 560 },
    );

    // Reduced motion or no WebGL → static frosted chamber, content revealed,
    // no forced scroll. (Canvas + ScrollTrigger are simply never set up.)
    if (reduceMotion || !webgl) {
      setInteractive(false);
      progressRef.current = 0;
      return;
    }

    setShowCanvas(true);

    let cleanup = () => {};
    let active = true;

    // GSAP is loaded lazily so it stays out of the route's initial bundle.
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (!active || !sectionRef.current) return;

      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          section.style.setProperty("--scene-progress", p.toFixed(4));
          if (gaugeRef.current) {
            gaugeRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
          }
        },
      });

      cleanup = () => trigger.kill();
    })();

    return () => {
      active = false;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`l7-scene ${interactive ? "l7-scene--tall" : "l7-scene--static"}`}
      aria-label="Tavronus AI — Frozen Command Core"
    >
      {/* Sticky stage: holds the frosted chamber, the canvas, and the overlay. */}
      <div className="l7-stage">
        {/* Layer 0 — CSS frosted ice chamber (always present; the fallback). */}
        <div aria-hidden className="l7-chamber" />
        <div aria-hidden className="l7-chamber-core" />
        <div aria-hidden className="l7-grid" />

        {/* Layer 1 — WebGL core, composited over the chamber. */}
        {showCanvas && (
          <div aria-hidden className="l7-canvas">
            <CanvasBoundary>
              <FrozenCoreCanvas
                progressRef={progressRef}
                quality={quality}
                postFx={postFx}
                shardCount={counts.shardCount}
                particleCount={counts.particleCount}
                burstCount={counts.burstCount}
              />
            </CanvasBoundary>
          </div>
        )}

        {/* Layer 2 — HUD overlay (real, readable content). Headline sits in the
            lower third so the raised core stays clear in the upper-center. */}
        <div className="l7-overlay">
          {/* Instrument frame */}
          <span aria-hidden className="l7-bracket l7-bracket--tl" />
          <span aria-hidden className="l7-bracket l7-bracket--tr" />
          <span aria-hidden className="l7-bracket l7-bracket--bl" />
          <span aria-hidden className="l7-bracket l7-bracket--br" />

          <div className="l7-hud l7-hud--top">
            <span className="l7-kicker">TAVRONUS // FROZEN COMMAND CORE</span>
            <span className="l7-kicker l7-kicker--dim">SCENE 01</span>
          </div>

          {/* Spacer keeps the core's upper-centre region uncovered. */}
          <div className="l7-spacer" aria-hidden />

          <div className="l7-lower">
            <span aria-hidden className="l7-scrim" />

            <div className="l7-headline">
              <p className="l7-eyebrow">Cinematic prototype</p>
              <h1 className="l7-title">Tavronus AI</h1>
              <p className="l7-subtitle">
                A cinematic prototype for a next-generation AI command system.
              </p>
              <p className="l7-status">
                <span className="l7-status-dot" aria-hidden />
                Systems rebuilding · No external AI connected yet
              </p>
            </div>

            <div className="l7-hud l7-hud--bottom">
              <div className="l7-gauge" role="img" aria-label="Scroll transformation preview">
                <span className="l7-gauge-label">Transformation</span>
                <span className="l7-gauge-value">
                  <span ref={gaugeRef}>000</span>%
                </span>
              </div>
              <div className="l7-scrollcue" aria-hidden>
                <span className="l7-scrollcue-text">Scroll to initiate transformation</span>
                <span className="l7-scrollcue-track">
                  <span className="l7-scrollcue-dot" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
