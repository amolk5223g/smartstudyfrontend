import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    mouseRef.current = { x: pointer.x * 2, y: pointer.y * 2 };
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] + (mouseRef.current.x - arr[ix]) * 0.0003;
      arr[ix + 1] += velocities[ix + 1] + (mouseRef.current.y - arr[ix + 1]) * 0.0003;
      arr[ix + 2] += velocities[ix + 2];

      if (Math.abs(arr[ix]) > 10) velocities[ix] *= -1;
      if (Math.abs(arr[ix + 1]) > 10) velocities[ix + 1] *= -1;
      if (Math.abs(arr[ix + 2]) > 5) velocities[ix + 2] *= -1;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), []);

  useFrame(({ scene }) => {
    if (!lineRef.current) return;
    const points = scene.children.find(c => c instanceof THREE.Points) as THREE.Points | undefined;
    if (!points) return;

    const posArr = (points.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT && lineIdx < positions.length - 6; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < positions.length - 6; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.5) {
          positions[lineIdx++] = posArr[i * 3];
          positions[lineIdx++] = posArr[i * 3 + 1];
          positions[lineIdx++] = posArr[i * 3 + 2];
          positions[lineIdx++] = posArr[j * 3];
          positions[lineIdx++] = posArr[j * 3 + 1];
          positions[lineIdx++] = posArr[j * 3 + 2];
        }
      }
    }

    const geo = lineRef.current.geometry;
    const attr = geo.attributes.position as THREE.BufferAttribute;
    (attr.array as Float32Array).set(positions);
    attr.needsUpdate = true;
    geo.setDrawRange(0, lineIdx / 3);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.08} />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <Particles />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
