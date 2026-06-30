# Level 7 Scene 1C Checkpoint — Postprocessing/HDRI/Dissolve Prototype

**Date:** 2026-06-30

**Branch:** `experiment/tavronus-level7-cinematic`

**Prior checkpoint:** `6d24de8 — wip(level7): Scene 1B cinematic ice prototype (pre-postprocessing)`

---

## 1. Summary

Scene 1C is a **Phase 1 cinematic upgrade** for the Frozen Command Core. On top of the
Scene 1B prototype it adds postprocessing (bloom / depth-of-field / vignette / grain /
subtle chromatic aberration), HDRI-based reflections, a GLSL dissolve shader, a particle
burst shed from the core, scroll-driven camera choreography, and quality/fallback guards.

It is still an **experiment, not a production sign-off.** The final look must be judged in
a real browser/GPU (see the honest caveat below). Stable production remains Level 3.

---

## 2. Asset record

- **Asset:** `studio_small_08_1k.hdr`
- **Source:** Poly Haven
- **Author:** Sergej Majboroda
- **License:** CC0 (Poly Haven universal policy — public domain, no attribution required)
- **Path:** `public/hdri/studio_small_08_1k.hdr`
- **Size:** ~1.44 MB (1,508,872 bytes), 1K `.hdr`, valid `#?RADIANCE`
- **No other assets were downloaded.**

Chosen as a clean, low-contrast studio HDRI so the crystal gets controlled, premium
specular reflections; the cold Tavronus mood is authored with our own lighting, fog,
bloom, and color rather than relying on the HDRI's cast.

---

## 3. Package record

- `@react-three/postprocessing@2.19.1`
- `postprocessing@6.39.2` (transitive)
- Chosen for **React 18 / R3F v8 compatibility** (the v3 line requires React 19 / R3F v9).
- Installed with **no `--force`** and **no `--legacy-peer-deps`** — no peer conflict.

No other packages were added in this checkpoint.

---

## 4. Technical changes

- **`components/level7/FrozenCommandScene.tsx`** — quality tier selection (`high`/`low`),
  WebGL2 probe (gates postprocessing), narrow/low-end detection, burst count; passes
  `quality`, `postFx`, and counts down to the canvas. Reduced-motion / no-WebGL paths
  unchanged.
- **`components/level7/FrozenCoreCanvas.tsx`** — HDRI environment via Drei
  `<Environment files="/hdri/studio_small_08_1k.hdr" background={false}>`, the
  `EffectComposer` (Bloom + Vignette + Noise always; Depth-of-Field + Chromatic Aberration
  high-tier only), opaque canvas (`alpha:false`) to avoid the postprocessing+transparency
  pitfall, the scroll-driven cinematic `CameraRig`, and pointer parallax.
- **`components/level7/FrozenCoreScene.tsx`** — GLSL dissolve injected into the core's
  `MeshPhysicalMaterial` via `onBeforeCompile` (Ashima/simplex-style noise + `uProgress`,
  fragment discard with a glowing cyan edge), **dissolve capped at ~0.62** so it *begins*
  the transformation but does not fully rebuild yet; a particle burst seeded from the core
  surface that emerges with the dissolve and disperses; rings, ice shards, frost field,
  and chamber (floor glow, wall strips, haze) carried over.
- **`package.json` / `package-lock.json`** — the one approved package above.
- **`public/hdri/studio_small_08_1k.hdr`** — the one approved HDRI above.

### Scene 1C feature list
- EffectComposer with Bloom, Vignette, subtle Noise.
- Depth of Field and Chromatic Aberration on high tier only.
- HDRI reflections (Drei `<Environment ... background={false}>`), reflections only.
- GLSL dissolve in `MeshPhysicalMaterial` via `onBeforeCompile`, Ashima/simplex noise.
- Cyan glowing dissolve edge.
- Dissolve capped ~0.62 (starts transformation, does not fully rebuild).
- Particle burst from the core surface.
- Scroll-driven cinematic camera movement + pointer parallax.
- Low/high quality tiers; WebGL2 gate for postprocessing; WebGL1 graceful fallback
  (renders without EffectComposer).
- Reduced-motion / no-WebGL fallback unchanged; error-boundary fallback unchanged.
- Initial First Load JS ≈ flat (~95.8 kB) because the heavy 3D/postprocessing stack stays
  lazy-loaded and the HDRI is a static asset.

---

## 5. Verification

- **Build:** `next build` passes; `/` prerendered as `○ Static`.
- **First Load JS:** `/` = **95.8 kB** (Scene 1B was 95.7 kB — essentially flat;
  three/R3F/drei/postprocessing live in the lazy canvas chunk).
- **Route checks:**
  - `/` = 200
  - `/workspace` = 404
  - `/about` = 404
  - `/hdri/studio_small_08_1k.hdr` = 200
- **npm ls:** intact and deduped — `@react-three/postprocessing@2.19.1`,
  `postprocessing@6.39.2`, `three@0.185.0`, `@react-three/fiber@8.18.0`,
  `@react-three/drei@9.122.0`, `gsap@3.15.0`, `lenis@1.3.25`, `next@14.2.35`.
- **Dev server:** runs on `http://localhost:5642` (port 5642 preserved). Stopped during the
  checkpoint build; may be restarted for review.

---

## 6. Honest caveat

Build and SSR pass, but the **final shader / postprocessing / HDRI appearance must be judged
in a real browser/GPU** via screenshots or a screen recording — it cannot be verified from
a build or HTTP check. If GPU behavior fails (e.g. the dissolve shader does not compile on a
given device), the expected **safe failure mode is the existing CSS frosted-chamber fallback
and error boundary, not a production crash.** Production is unaffected regardless (Level 3 is
the live version; this is experiment-branch only).

---

## 7. Safety confirmations

- Experiment branch only (`experiment/tavronus-level7-cinematic`).
- No production deploy; no merge; no force push; no Vercel settings change; no GitHub
  auto-deploy.
- No backend / auth / API routes / database / env / secrets.
- No fake AI claims or fake activity.
- No Scene 2 (and no dragon / Blender GLB / Spline).
- Level 4 stash (`stash@{0}: wip-level4-local-experiment-before-level7`) untouched.
