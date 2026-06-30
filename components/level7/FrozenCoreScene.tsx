"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────────
   Level 7 · Scene 1C — Frozen Command Core (postprocessing pass)
   The core is an ice crystal reflecting a real HDRI (set in the Canvas), with a
   GLSL dissolve patched into its physical material and a particle burst shed
   from its surface as you scroll. Rings, ice shards, frost field, and a reactor
   chamber (floor glow, wall strips, haze) complete it. Bloom/DoF/grade are
   applied by the EffectComposer in the Canvas. All animation is uniform/ref
   driven from useFrame — no React state per frame.
   ────────────────────────────────────────────────────────────────────────── */

type Props = {
  progressRef: MutableRefObject<number>;
  shardCount: number;
  particleCount: number;
  burstCount: number;
};

const FROST = "#eaf6ff";
const ICE = "#bfe6ff";
const CYAN = "#7cc4ff";
const STEEL = "#cfe2f5";
const CORE_BLUE = "#2d8eff";

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/* Ashima 3D simplex noise — standard, compiles everywhere; drives the dissolve. */
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, "rgba(198,232,255,0.8)");
  g.addColorStop(0.55, "rgba(120,170,235,0.28)");
  g.addColorStop(1, "rgba(120,170,235,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function makeStripTexture() {
  const c = document.createElement("canvas");
  c.width = 8;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgba(124,196,255,0)");
  g.addColorStop(0.5, "rgba(170,214,255,0.85)");
  g.addColorStop(1, "rgba(124,196,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 128);
  return new THREE.CanvasTexture(c);
}

export default function FrozenCoreScene({
  progressRef,
  shardCount,
  particleCount,
  burstCount,
}: Props) {
  const eased = useRef(0);

  const root = useRef<THREE.Group>(null);
  const coreGroup = useRef<THREE.Group>(null);
  const innerCrystal = useRef<THREE.Mesh>(null);
  const heart = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Sprite>(null);
  const ringsGroup = useRef<THREE.Group>(null);
  const containHalo = useRef<THREE.Sprite>(null);
  const shardsGroup = useRef<THREE.Group>(null);
  const shardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const particlesGroup = useRef<THREE.Group>(null);
  const particlesMat = useRef<THREE.PointsMaterial>(null);
  const burstGroup = useRef<THREE.Group>(null);
  const burstMat = useRef<THREE.PointsMaterial>(null);
  const hazeRefs = useRef<(THREE.Sprite | null)[]>([]);

  const glowTex = useMemo(makeGlowTexture, []);
  const stripTex = useMemo(makeStripTexture, []);
  useEffect(() => () => {
    glowTex.dispose();
    stripTex.dispose();
  }, [glowTex, stripTex]);

  // ── Core crystal material with a GLSL dissolve patched in ───────────────
  const dissolve = useRef({
    uProgress: { value: 0 },
    uEdgeColor: { value: new THREE.Color(CYAN) },
  });
  const outerMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: STEEL,
      emissive: new THREE.Color(CORE_BLUE),
      emissiveIntensity: 0.12,
      flatShading: true,
      metalness: 0,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      ior: 1.4,
      transparent: true,
      opacity: 0.36,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uProgress = dissolve.current.uProgress;
      shader.uniforms.uEdgeColor = dissolve.current.uEdgeColor;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vDPos;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvDPos = position;");
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>\nvarying vec3 vDPos;\nuniform float uProgress;\nuniform vec3 uEdgeColor;\n${SNOISE}`,
        )
        .replace(
          "#include <dithering_fragment>",
          `
          float dn = snoise(vDPos * 1.7) * 0.5 + 0.5;
          float thr = uProgress * 1.05;
          if (dn < thr - 0.02) discard;
          float edge = smoothstep(thr - 0.10, thr, dn) * (1.0 - smoothstep(thr, thr + 0.05, dn));
          gl_FragColor.rgb += uEdgeColor * edge * 2.4;
          #include <dithering_fragment>`,
        );
    };
    m.customProgramCacheKey = () => "tavronus-core-dissolve";
    return m;
  }, []);

  const outerGeo = useMemo(() => new THREE.IcosahedronGeometry(1.3, 1), []);
  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.32, 0)),
    [],
  );

  const rings = useMemo(
    () => [
      { r: 2.0, tube: 0.014, tilt: [Math.PI / 2, 0, 0], speed: 0.28, color: ICE, opacity: 0.55 },
      { r: 2.45, tube: 0.01, tilt: [1.15, 0.5, -0.25], speed: -0.2, color: CORE_BLUE, opacity: 0.4 },
      { r: 2.95, tube: 0.008, tilt: [1.45, -0.4, 0.2], speed: 0.14, color: CYAN, opacity: 0.28 },
    ],
    [],
  );

  // ── Jagged ice shards ────────────────────────────────────────────────────
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
        transparent: true,
        opacity: 0.9,
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
      const big = i % 6 === 0;
      out.push({
        dir,
        radius: 1.9 + (i % 5) * 0.16 + (big ? 0.2 : 0),
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

  // ── Ambient frost field ──────────────────────────────────────────────────
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      v.multiplyScalar(2.3 + Math.random() * 2.8);
      arr.set([v.x, v.y, v.z], i * 3);
    }
    return arr;
  }, [particleCount]);

  // ── Dissolve burst — dense motes shed from the core surface ──────────────
  const burstPositions = useMemo(() => {
    const arr = new Float32Array(burstCount * 3);
    for (let i = 0; i < burstCount; i++) {
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      v.multiplyScalar(1.05 + Math.random() * 0.5);
      arr.set([v.x, v.y, v.z], i * 3);
    }
    return arr;
  }, [burstCount]);

  const haze = useMemo(
    () => [
      { pos: [-2.6, 0.4, -1.8], scale: 8, opacity: 0.07, phase: 0 },
      { pos: [2.9, -0.6, -1.2], scale: 9.5, opacity: 0.06, phase: 2.1 },
      { pos: [0.2, 1.4, -2.6], scale: 7, opacity: 0.05, phase: 4.2 },
    ],
    [],
  );

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const t = performance.now() / 1000;
    eased.current += (progressRef.current - eased.current) * Math.min(1, dt * 5);
    const p = eased.current;

    // Dissolve begins but does not complete in Scene 1 (capped ~0.6).
    dissolve.current.uProgress.value = p * 0.62;

    if (root.current) root.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.04;

    if (coreGroup.current) {
      coreGroup.current.rotation.y += dt * (0.1 + p * 0.5);
      coreGroup.current.rotation.x += dt * (0.04 + p * 0.18);
      coreGroup.current.scale.setScalar(1 + p * 0.16);
    }
    outerMat.emissiveIntensity = 0.12 + p * 0.55;
    outerMat.opacity = 0.36 - p * 0.16;
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

    shardRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = shards[i];
      const radius = s.radius + Math.sin(t * 0.6 + s.phase) * 0.07 + p * 1.9;
      mesh.position.copy(s.dir).multiplyScalar(radius);
      mesh.rotation.x += dt * s.spin;
      mesh.rotation.y += dt * s.spin * 0.8;
    });
    if (shardsGroup.current) shardsGroup.current.rotation.y += dt * 0.05;
    shardMat.opacity = 0.9 - Math.max(0, p - 0.7) * 2.2;

    if (particlesGroup.current) {
      particlesGroup.current.rotation.y += dt * 0.035;
      particlesGroup.current.scale.setScalar(1 + p * 1.4);
    }
    if (particlesMat.current) {
      particlesMat.current.opacity = (0.5 + Math.sin(t * 0.8) * 0.06) * (1 - p * 0.4);
    }

    // Burst: emerges as the core dissolves, expands outward, fades near the end.
    if (burstGroup.current) {
      burstGroup.current.scale.setScalar(1 + p * 2.7);
      burstGroup.current.rotation.y += dt * 0.06;
    }
    if (burstMat.current) {
      const a = clamp01((p - 0.12) / 0.22) * (1 - clamp01((p - 0.72) / 0.24));
      burstMat.current.opacity = a * 0.9;
    }

    hazeRefs.current.forEach((sprite, i) => {
      if (!sprite) return;
      const h = haze[i];
      sprite.position.x = h.pos[0] + Math.sin(t * 0.18 + h.phase) * 0.6;
      sprite.position.y = h.pos[1] + Math.cos(t * 0.14 + h.phase) * 0.4;
    });
  });

  return (
    <group ref={root} position={[0, 0.5, 0]}>
      {/* Chamber: floor pad glow + base ring + wall light strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]} scale={[7, 7, 7]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={glowTex} color={CORE_BLUE} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 10, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {[-3.9, 3.9].map((x) => (
        <mesh key={x} position={[x, 0.2, -3]}>
          <planeGeometry args={[0.12, 6]} />
          <meshBasicMaterial map={stripTex} color={ICE} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}

      {/* Drifting haze */}
      {haze.map((h, i) => (
        <sprite
          key={i}
          ref={(el) => {
            hazeRefs.current[i] = el;
          }}
          position={h.pos as [number, number, number]}
          scale={[h.scale, h.scale, 1]}
        >
          <spriteMaterial map={glowTex} color={"#3f7bd0"} transparent opacity={h.opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}

      {/* Containment glow */}
      <sprite ref={containHalo} scale={[5.2, 5.2, 1]}>
        <spriteMaterial map={glowTex} color={CORE_BLUE} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      {/* Command core */}
      <group ref={coreGroup}>
        <mesh geometry={outerGeo} material={outerMat} />
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={FROST} transparent opacity={0.26} />
        </lineSegments>
        <mesh ref={innerCrystal} scale={0.72}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color={ICE} emissive={new THREE.Color(CYAN)} emissiveIntensity={0.3} flatShading metalness={0} roughness={0.1} clearcoat={1} transparent opacity={0.4} envMapIntensity={1.1} />
        </mesh>
        <mesh ref={heart} scale={0.42}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={FROST} transparent opacity={0.75} />
        </mesh>
        <sprite ref={halo} scale={[3.4, 3.4, 1]}>
          <spriteMaterial map={glowTex} color={ICE} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      </group>

      {/* Containment rings */}
      <group ref={ringsGroup}>
        {rings.map((cfg, i) => (
          <mesh key={i} rotation={cfg.tilt as [number, number, number]}>
            <torusGeometry args={[cfg.r, cfg.tube, 12, 140]} />
            <meshBasicMaterial color={cfg.color} transparent opacity={cfg.opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Ice shards */}
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

      {/* Dissolve burst */}
      <group ref={burstGroup}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={burstPositions} count={burstCount} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial ref={burstMat} map={glowTex} color={FROST} size={0.07} sizeAttenuation transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>

      {/* Ambient frost field */}
      <group ref={particlesGroup}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={particlePositions} count={particleCount} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial ref={particlesMat} map={glowTex} color={FROST} size={0.055} sizeAttenuation transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
      </group>
    </group>
  );
}
