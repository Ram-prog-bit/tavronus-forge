"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
   Level 7 · Scene 1B — Frozen Command Core (cinematic ice pass)
   Procedural only — no models, no downloaded textures, no postprocessing.
   A faceted ice-crystal core reflecting a cold procedural environment, jagged
   ice shards, a blue-white containment field, and an enclosing reactor chamber
   (floor glow, wall light-strips, drifting haze). Two animation layers driven
   from useFrame: idle cinematic motion + a scroll-driven "dissipation" read
   from progressRef (0 → 1). No React state changes per frame.
   ────────────────────────────────────────────────────────────────────────── */

type Props = {
  progressRef: MutableRefObject<number>;
  shardCount: number;
  particleCount: number;
};

const FROST = "#eaf6ff";
const ICE = "#bfe6ff";
const CYAN = "#7cc4ff";
const STEEL = "#cfe2f5";
const CORE_BLUE = "#2d8eff";

/* Soft round sprite — a tiny radial gradient. Reused for glow, particles,
   floor pad, and haze. */
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, "rgba(198,232,255,0.8)");
  g.addColorStop(0.55, "rgba(120,170,235,0.28)");
  g.addColorStop(1, "rgba(120,170,235,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/* Cold equirectangular "studio" — gives the crystal real specular highlights
   and reflections without an external HDRI. A couple of bright bands read as
   cold key/rim lights raking across the facets. */
function makeEnvTexture() {
  const w = 256;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#0a1422");
  g.addColorStop(0.32, "#16314f");
  g.addColorStop(0.5, "#244a72");
  g.addColorStop(0.66, "#0c1830");
  g.addColorStop(1, "#05080f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(214,236,255,0.92)"; // cold key band
  ctx.fillRect(0, h * 0.15, w, h * 0.05);
  ctx.fillStyle = "rgba(96,156,224,0.5)"; // rim band
  ctx.fillRect(0, h * 0.46, w, h * 0.03);
  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* Vertical light-strip gradient for the chamber walls. */
function makeStripTexture() {
  const w = 8;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "rgba(124,196,255,0)");
  g.addColorStop(0.5, "rgba(170,214,255,0.85)");
  g.addColorStop(1, "rgba(124,196,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  return new THREE.CanvasTexture(canvas);
}

export default function FrozenCoreScene({ progressRef, shardCount, particleCount }: Props) {
  const { scene } = useThree();
  const eased = useRef(0);

  // Animated refs
  const root = useRef<THREE.Group>(null);
  const coreGroup = useRef<THREE.Group>(null);
  const outerMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerCrystal = useRef<THREE.Mesh>(null);
  const heart = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);
  const ringsGroup = useRef<THREE.Group>(null);
  const containHalo = useRef<THREE.Sprite>(null);
  const shardsGroup = useRef<THREE.Group>(null);
  const shardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const particlesGroup = useRef<THREE.Group>(null);
  const particlesMat = useRef<THREE.PointsMaterial>(null);
  const hazeRefs = useRef<(THREE.Sprite | null)[]>([]);

  // Procedural textures
  const glowTex = useMemo(makeGlowTexture, []);
  const envTex = useMemo(makeEnvTexture, []);
  const stripTex = useMemo(makeStripTexture, []);

  // Cold environment → all physical materials pick up reflections.
  useEffect(() => {
    const prev = scene.environment;
    scene.environment = envTex;
    return () => {
      scene.environment = prev;
      envTex.dispose();
    };
  }, [scene, envTex]);

  useEffect(() => {
    return () => {
      glowTex.dispose();
      stripTex.dispose();
    };
  }, [glowTex, stripTex]);

  // ── Core geometry + subtle edge lines ───────────────────────────────────
  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.3, 1), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.32, 0)), []);

  // ── Containment rings (thin, additive) ──────────────────────────────────
  const rings = useMemo(
    () => [
      { r: 2.0, tube: 0.014, tilt: [Math.PI / 2, 0, 0], speed: 0.28, color: ICE, opacity: 0.55 },
      { r: 2.45, tube: 0.01, tilt: [1.15, 0.5, -0.25], speed: -0.2, color: CORE_BLUE, opacity: 0.4 },
      { r: 2.95, tube: 0.008, tilt: [1.45, -0.4, 0.2], speed: 0.14, color: CYAN, opacity: 0.28 },
    ],
    [],
  );

  // ── Jagged ice shards — mixed sharp geometries, non-uniform scale ────────
  const shardGeos = useMemo(
    () => [
      new THREE.TetrahedronGeometry(0.13, 0),
      new THREE.IcosahedronGeometry(0.1, 0),
      new THREE.OctahedronGeometry(0.12, 0),
    ],
    [],
  );
  const shardMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: STEEL,
        emissive: new THREE.Color(CYAN),
        emissiveIntensity: 0.18,
        flatShading: true,
        metalness: 0,
        roughness: 0.12,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
        transparent: true,
        opacity: 0.88,
        envMapIntensity: 1.1,
      }),
    [],
  );
  const shards = useMemo(() => {
    const out = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < shardCount; i++) {
      const y = 1 - (i / Math.max(1, shardCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const dir = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize();
      const big = i % 6 === 0; // a few hero shards
      out.push({
        dir,
        radius: 1.85 + (i % 5) * 0.16 + (big ? 0.2 : 0),
        spin: 0.25 + (i % 7) * 0.1,
        phase: i * 1.7,
        geo: i % 3,
        scale: new THREE.Vector3(
          (0.5 + Math.random() * 0.5) * (big ? 1.7 : 1),
          (1.0 + Math.random() * 1.1) * (big ? 1.7 : 1),
          (0.45 + Math.random() * 0.4) * (big ? 1.7 : 1),
        ),
        rot: new THREE.Euler(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28),
      });
    }
    return out;
  }, [shardCount]);

  // ── Frost particle field ─────────────────────────────────────────────────
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      v.multiplyScalar(2.2 + Math.random() * 2.8);
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    }
    return arr;
  }, [particleCount]);

  // ── Drifting haze blobs ──────────────────────────────────────────────────
  const haze = useMemo(
    () => [
      { pos: [-2.6, 0.4, -1.8], scale: 8, opacity: 0.07, phase: 0 },
      { pos: [2.9, -0.6, -1.2], scale: 9.5, opacity: 0.06, phase: 2.1 },
      { pos: [0.2, 1.4, -2.6], scale: 7, opacity: 0.05, phase: 4.2 },
    ],
    [],
  );

  // ── Per-frame ────────────────────────────────────────────────────────────
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const t = performance.now() / 1000;
    const target = progressRef.current;
    eased.current += (target - eased.current) * Math.min(1, dt * 5);
    const p = eased.current;

    // Whole scene floats gently; sits a touch above center for composition.
    if (root.current) root.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.04;

    // Core: idle spin that accelerates and swells as it transforms.
    if (coreGroup.current) {
      coreGroup.current.rotation.y += dt * (0.1 + p * 0.5);
      coreGroup.current.rotation.x += dt * (0.04 + p * 0.18);
      coreGroup.current.scale.setScalar(1 + p * 0.16);
    }
    if (outerMat.current) {
      outerMat.current.opacity = 0.34 - p * 0.2;
      outerMat.current.emissiveIntensity = 0.12 + p * 0.5;
    }
    if (innerCrystal.current) {
      innerCrystal.current.rotation.y -= dt * (0.18 + p * 0.4);
      innerCrystal.current.rotation.z += dt * 0.08;
      innerCrystal.current.scale.setScalar(0.72 + p * 0.22);
    }
    if (heart.current) {
      const m = heart.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.7 + p * 0.3;
      heart.current.scale.setScalar(0.42 + Math.sin(t * 1.5) * 0.02 + p * 0.3);
    }
    if (halo.current) {
      const s = 3.4 + Math.sin(t * 0.9) * 0.2 + p * 1.8;
      halo.current.scale.set(s, s, 1);
      (halo.current.material as THREE.SpriteMaterial).opacity = 0.5 + p * 0.32;
    }

    // Containment field: rings open + spin up; halo flares then dims as the
    // core "breaks containment" near the end.
    if (ringsGroup.current) {
      ringsGroup.current.children.forEach((child, i) => {
        const cfg = rings[i];
        child.rotation.z += dt * (cfg.speed + p * cfg.speed * 3.5);
        child.scale.setScalar(1 + p * 0.55);
        child.rotation.x = (cfg.tilt[0] as number) + p * (0.35 + i * 0.18);
      });
    }
    if (containHalo.current) {
      const s = 5.2 + p * 1.5;
      containHalo.current.scale.set(s, s, 1);
      (containHalo.current.material as THREE.SpriteMaterial).opacity =
        0.22 + Math.sin(t * 0.7) * 0.03 - p * 0.18;
    }

    // Shards: drift idle, then push outward + spin faster; fade at the very end.
    shardRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = shards[i];
      const drift = Math.sin(t * 0.6 + s.phase) * 0.07;
      const radius = s.radius + drift + p * p * 3.2;
      mesh.position.copy(s.dir).multiplyScalar(radius);
      mesh.rotation.x += dt * s.spin;
      mesh.rotation.y += dt * s.spin * 0.8;
    });
    if (shardsGroup.current) shardsGroup.current.rotation.y += dt * 0.05;
    shardMat.opacity = 0.88 - Math.max(0, p - 0.7) * 2.4;

    // Particle field: shimmer + outward dispersal.
    if (particlesGroup.current) {
      particlesGroup.current.rotation.y += dt * 0.035;
      particlesGroup.current.scale.setScalar(1 + p * 1.4);
    }
    if (particlesMat.current) {
      particlesMat.current.opacity = (0.5 + Math.sin(t * 0.8) * 0.06) * (1 - p * 0.4);
    }

    // Haze: slow lateral drift.
    hazeRefs.current.forEach((sprite, i) => {
      if (!sprite) return;
      const h = haze[i];
      sprite.position.x = h.pos[0] + Math.sin(t * 0.18 + h.phase) * 0.6;
      sprite.position.y = h.pos[1] + Math.cos(t * 0.14 + h.phase) * 0.4;
    });
  });

  return (
    <group ref={root} position={[0, 0.5, 0]}>
      {/* ── Chamber: floor pad glow + wall light strips + base ring ──────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]} scale={[7, 7, 7]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTex}
          color={CORE_BLUE}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 10, 96]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {[-3.9, 3.9].map((x) => (
        <mesh key={x} position={[x, 0.2, -3]}>
          <planeGeometry args={[0.12, 6]} />
          <meshBasicMaterial
            map={stripTex}
            color={ICE}
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* ── Drifting haze ───────────────────────────────────────────────── */}
      {haze.map((h, i) => (
        <sprite
          key={i}
          ref={(el) => {
            hazeRefs.current[i] = el;
          }}
          position={h.pos as [number, number, number]}
          scale={[h.scale, h.scale, 1]}
        >
          <spriteMaterial
            map={glowTex}
            color={"#3f7bd0"}
            transparent
            opacity={h.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}

      {/* ── Containment glow behind the core ────────────────────────────── */}
      <sprite ref={containHalo} scale={[5.2, 5.2, 1]}>
        <spriteMaterial
          map={glowTex}
          color={CORE_BLUE}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* ── Command core ────────────────────────────────────────────────── */}
      <group ref={coreGroup}>
        {/* Outer ice crystal — reflects the cold environment */}
        <mesh geometry={outerGeo}>
          <meshPhysicalMaterial
            ref={outerMat}
            color={STEEL}
            emissive={new THREE.Color(CORE_BLUE)}
            emissiveIntensity={0.12}
            flatShading
            metalness={0}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.18}
            ior={1.4}
            transparent
            opacity={0.34}
            envMapIntensity={1.3}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Subtle facet edges */}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={FROST} transparent opacity={0.28} />
        </lineSegments>
        {/* Inner counter-rotating crystal — layered depth */}
        <mesh ref={innerCrystal} scale={0.72}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color={ICE}
            emissive={new THREE.Color(CYAN)}
            emissiveIntensity={0.3}
            flatShading
            metalness={0}
            roughness={0.1}
            clearcoat={1}
            transparent
            opacity={0.4}
            envMapIntensity={1.1}
          />
        </mesh>
        {/* Reactor heart — always-bright glow */}
        <mesh ref={heart} scale={0.42}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={FROST} transparent opacity={0.75} />
        </mesh>
        {/* Volumetric core glow */}
        <sprite ref={halo} scale={[3.4, 3.4, 1]}>
          <spriteMaterial
            map={glowTex}
            color={ICE}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      </group>

      {/* ── Containment rings ───────────────────────────────────────────── */}
      <group ref={ringsGroup}>
        {rings.map((cfg, i) => (
          <mesh key={i} rotation={cfg.tilt as [number, number, number]}>
            <torusGeometry args={[cfg.r, cfg.tube, 12, 140]} />
            <meshBasicMaterial
              color={cfg.color}
              transparent
              opacity={cfg.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* ── Ice shards ──────────────────────────────────────────────────── */}
      <group ref={shardsGroup}>
        {shards.map((s, i) => (
          <mesh
            key={i}
            ref={(el) => {
              shardRefs.current[i] = el;
            }}
            geometry={shardGeos[s.geo]}
            material={shardMat}
            position={s.dir.clone().multiplyScalar(s.radius)}
            scale={s.scale}
            rotation={s.rot}
          />
        ))}
      </group>

      {/* ── Frost particle field ────────────────────────────────────────── */}
      <group ref={particlesGroup}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={particlePositions}
              count={particleCount}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={particlesMat}
            map={glowTex}
            color={FROST}
            size={0.055}
            sizeAttenuation
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
}
