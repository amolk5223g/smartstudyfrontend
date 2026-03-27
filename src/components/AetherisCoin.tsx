import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

function Coin() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.15, 32]} />
      <meshStandardMaterial 
        color="#c084fc" 
        metalness={0.9} 
        roughness={0.1}
        emissive="#7e22ce"
        emissiveIntensity={0.5}
      />
      
      {/* Coin Face Detail */}
      <mesh position={[0, 0, 0.08]}>
         <circleGeometry args={[0.85, 32]} />
         <meshStandardMaterial color="#a855f7" metalness={1} roughness={0} />
      </mesh>
      <mesh position={[0, 0, -0.08]} rotation={[0, Math.PI, 0]}>
         <circleGeometry args={[0.85, 32]} />
         <meshStandardMaterial color="#a855f7" metalness={1} roughness={0} />
      </mesh>

      {/* Symbol */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.6}
        color="white"
        font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff"
      >
        Æ
      </Text>
    </mesh>
  );
}

export default function AetherisCoin({ className = "" }: { className?: string }) {
  return (
    <div className={`w-32 h-32 ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c084fc" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#3b82f6" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Coin />
        </Float>
      </Canvas>
    </div>
  );
}
