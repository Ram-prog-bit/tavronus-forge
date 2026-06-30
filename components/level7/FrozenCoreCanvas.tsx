"use client";

import { Suspense, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";
import FrozenCoreScene from "./FrozenCoreScene";

/* ──────────────────────────────────────────────────────────────────────────
   Level 7 · Scene 1C — R3F Canvas wrapper.
   Opaque cinematic render: HDRI image-based lighting (studio_small_08, CC0,
   self-hosted), a cold direct-light rig, fog, a scroll-driven camera dolly,
   and an EffectComposer (bloom + depth-of-field + vignette + grain + subtle
   chromatic aberration). Quality is tiered — the heavy effects only run on
   "high". Mounted client-only (dynamic ssr:false).
   ────────────────────────────────────────────────────────────────────────── */

type Quality = "high" | "low";

type Props = {
  progressRef: MutableRefObject<number>;
  quality: Quality;
  postFx: boolean;
  shardCount: number;
  particleCount: number;
  burstCount: number;
};

/* Pointer parallax — the chamber leans toward the cursor. */
function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    const k = Math.min(1, delta * 2.5);
    group.current.rotation.y += (state.pointer.x * 0.16 - group.current.rotation.y) * k;
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

/* Scroll-driven cinematic camera — establishes wide, pushes in through the
   transformation, drifts up and orbits a touch. Eased; reads progressRef. */
function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.62, 0), []);
  useFrame((_, delta) => {
    const p = Math.min(1, Math.max(0, progressRef.current));
    const z = 7.3 - Math.sin(p * Math.PI) * 1.7; // push in at mid-scroll
    const y = 0.25 + p * 0.55;
    const x = Math.sin(p * Math.PI * 0.6) * 0.55; // slight orbit
    const k = Math.min(1, delta * 2);
    camera.position.x += (x - camera.position.x) * k;
    camera.position.y += (y - camera.position.y) * k;
    camera.position.z += (z - camera.position.z) * k;
    camera.lookAt(target);
  });
  return null;
}

export default function FrozenCoreCanvas({
  progressRef,
  quality,
  postFx,
  shardCount,
  particleCount,
  burstCount,
}: Props) {
  const high = quality === "high";
  const chromaOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);

  // Built as an array so the heavy passes (DoF, chromatic aberration) can be
  // dropped entirely on the low tier without leaving falsy JSX children.
  const effects: JSX.Element[] = [];
  effects.push(
    <Bloom
      key="bloom"
      intensity={high ? 0.9 : 0.6}
      luminanceThreshold={0.55}
      luminanceSmoothing={0.3}
      mipmapBlur
    />,
  );
  if (high) {
    effects.push(
      <DepthOfField key="dof" focusDistance={0.012} focalLength={0.05} bokehScale={2.4} />,
    );
  }
  effects.push(<Vignette key="vignette" offset={0.32} darkness={0.72} />);
  if (high) {
    effects.push(
      <ChromaticAberration
        key="chroma"
        offset={chromaOffset}
        radialModulation={false}
        modulationOffset={0}
      />,
    );
  }
  effects.push(<Noise key="noise" premultiply opacity={0.06} />);

  return (
    <Canvas
      dpr={high ? [1, 1.5] : [1, 1.25]}
      gl={{ alpha: false, antialias: !postFx, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.25, 7.3], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ gl }) => gl.setClearColor(0x060b16, 1)}
    >
      <fogExp2 attach="fog" args={[0x060b16, 0.058]} />

      <ambientLight intensity={0.5} color={0x9fc4ff} />
      <pointLight position={[5, 4, 6]} intensity={65} color={0x2d8eff} distance={45} decay={2} />
      <pointLight position={[-6, -2, -3]} intensity={42} color={0xdcefff} distance={45} decay={2} />
      <pointLight position={[0, -3, 2]} intensity={18} color={0x7cc4ff} distance={30} decay={2} />
      <directionalLight position={[0, 6, 2]} intensity={0.35} color={0xbfe0ff} />

      {/* HDRI image-based lighting — reflections only, not a visible background. */}
      <Suspense fallback={null}>
        <Environment files="/hdri/studio_small_08_1k.hdr" background={false} />
      </Suspense>

      <ParallaxRig>
        <FrozenCoreScene
          progressRef={progressRef}
          shardCount={shardCount}
          particleCount={particleCount}
          burstCount={burstCount}
        />
      </ParallaxRig>

      <CameraRig progressRef={progressRef} />

      {postFx && (
        <EffectComposer multisampling={high ? 4 : 0}>{effects}</EffectComposer>
      )}
    </Canvas>
  );
}
