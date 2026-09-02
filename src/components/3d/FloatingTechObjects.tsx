import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollScene } from '../../context/ScrollSceneContext';

export const FloatingTechObjects: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const octahedronRef = useRef<THREE.Mesh>(null!);
  const icoRef = useRef<THREE.Mesh>(null!);

  const { activeSection, reducedMotion } = useScrollScene();

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotational animation
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
      torusRef.current.position.y = Math.sin(time * 0.8) * 0.4 + 2;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = time * -0.4;
      octahedronRef.current.rotation.z = time * 0.3;
      octahedronRef.current.position.y = Math.cos(time * 0.6) * 0.3 - 2;
    }

    if (icoRef.current) {
      icoRef.current.rotation.y = time * 0.5;
      icoRef.current.position.y = Math.sin(time * 0.5 + 1) * 0.5;
    }

    // Shift opacity / scale depending on section
    const isHero = activeSection === 0;
    const targetScale = isHero ? 1 : 0.4;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* 3D Wireframe Torus - Web & Interfaces */}
      <mesh ref={torusRef} position={[-5, 2, -2]}>
        <torusGeometry args={[1.2, 0.2, 16, 50]} />
        <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.4} />
      </mesh>

      {/* 3D Octahedron - AI Neural Node */}
      <mesh ref={octahedronRef} position={[5, -2, -3]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.4} />
      </mesh>

      {/* 3D Icosahedron - Data & Algorithms */}
      <mesh ref={icoRef} position={[0, -4, -4]}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
};
