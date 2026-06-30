"use client";

import { useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FrozenCoreScene from "./FrozenCoreScene";

/* ──────────────────────────────────────────────────────────────────────────
   Level 7 · Scene 1B — R3F Canvas wrapper.
   Renderer, camera, cold lighting, chamber fog, and a subtle pointer-parallax
   rig. Mounted client-only (dynamic ssr:false). DPR capped; no shadows, no
   postprocessing. A procedural cold environment (set inside the scene) gives
   the crystal its reflections; the lights below add direct shaping + rim.
   ────────────────────────────────────────────────────────────────────────── */

type Props = {
  progressRef: MutableRefObject<number>;
  shardCount: number;
  particleCount: number;
};

/* Gentle parallax — the chamber leans toward the pointer, eased. */
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

export default function FrozenCoreCanvas({ progressRef, shardCount, particleCount }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 6.8], fov: 42, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMappingExposure = 1.05;
      }}
    >
      {/* Chamber atmosphere — distant geometry fades into cold depth. */}
      <fogExp2 attach="fog" args={[0x060b16, 0.062]} />

      {/* Cold lighting rig: low ambient + blue key + frost rim + cyan up-fill. */}
      <ambientLight intensity={0.5} color={0x9fc4ff} />
      <pointLight position={[5, 4, 6]} intensity={65} color={0x2d8eff} distance={45} decay={2} />
      <pointLight position={[-6, -2, -3]} intensity={42} color={0xdcefff} distance={45} decay={2} />
      <pointLight position={[0, -3, 2]} intensity={18} color={0x7cc4ff} distance={30} decay={2} />
      <directionalLight position={[0, 6, 2]} intensity={0.35} color={0xbfe0ff} />

      <ParallaxRig>
        <FrozenCoreScene
          progressRef={progressRef}
          shardCount={shardCount}
          particleCount={particleCount}
        />
      </ParallaxRig>
    </Canvas>
  );
}
