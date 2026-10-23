import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = "#38bdf8";

function useScrollProgress() {
  const ref = useRef(0);
  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    ref.current = max > 0 ? window.scrollY / max : 0;
  });
  return ref;
}

function AICore({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const { x, y } = state.pointer;
    g.rotation.y += dt * 0.25;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, y * 0.4, 4, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, x * 0.6, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, 1.3 + progress.current * 14, 3, dt);
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
    g.scale.setScalar(pulse * 0.8);
    if (shell.current) shell.current.rotation.z -= dt * 0.4;
    if (ring.current) ring.current.rotation.z += dt * 0.6;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.2, 32]} />
        <MeshDistortMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.6} roughness={0.15} metalness={0.4} distort={0.35} speed={2} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring} rotation-x={Math.PI / 2.4}>
        <torusGeometry args={[2.3, 0.012, 8, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.8} />
      </mesh>
      <Sparkles count={60} scale={4.5} size={3} speed={0.6} color={CYAN} />
    </group>
  );
}

function Planet({ pos, r, color, speed }: { pos: [number, number, number]; r: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * speed; });
  return (
    <Float speed={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[r, 48, 48]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.15} emissive={color} emissiveIntensity={0.08} />
      </mesh>
    </Float>
  );
}

function Nebula({ progress }: { progress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 1800;
    const p = new Float32Array(n * 3);
    const c = new Float32Array(n * 3);
    const a = new THREE.Color("#38bdf8"), b = new THREE.Color("#6d28d9"), tmp = new THREE.Color();
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI * 2, rad = 6 + Math.random() * 14;
      p[i * 3] = Math.cos(t) * rad;
      p[i * 3 + 1] = (Math.random() - 0.5) * 6 - 20;
      p[i * 3 + 2] = Math.sin(t) * rad - 15;
      tmp.copy(a).lerp(b, Math.random());
      c.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    g.setAttribute("color", new THREE.BufferAttribute(c, 3));
    return g;
  }, []);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.02;
    (ref.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.clamp((progress.current - 0.3) * 2, 0, 0.7);
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const stars = useRef<THREE.Group>(null);
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const p = progress.current;
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 0.5, 2, dt);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -p * 22 + state.pointer.y * 0.3, 2.5, dt);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 7 - p * 3, 2, dt);
    cam.lookAt(0, cam.position.y - 0.5, 0);
    if (stars.current) {
      stars.current.rotation.y += dt * 0.01 + p * dt * 0.03;
      stars.current.rotation.x = p * 0.4;
    }
  });
  return (
    <group ref={stars}>
      <Stars radius={80} depth={60} count={4000} factor={4} fade speed={0.6} />
    </group>
  );
}

export default function SpaceScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <SceneContents />
      </Canvas>
    </div>
  );
}

function SceneContents() {
  const progress = useScrollProgress();
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 6]} intensity={40} color="#ffffff" />
      <pointLight position={[-5, -18, 2]} intensity={60} color={CYAN} />
      <Rig progress={progress} />
      <AICore progress={progress} />
      <Nebula progress={progress} />
      <Planet pos={[-6, -9, -6]} r={1.4} color="#3b5bdb" speed={0.1} />
      <Planet pos={[7, -16, -10]} r={2.4} color="#1e293b" speed={0.05} />
      <Planet pos={[-5, -25, -4]} r={0.8} color="#7dd3fc" speed={0.2} />
      <Sparkles count={150} scale={[20, 40, 10]} position={[0, -15, -2]} size={2} speed={0.3} color="#cbd5e1" />
    </>
  );
}
