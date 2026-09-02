import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollScene } from '../../context/ScrollSceneContext';

export const ParticleSwarmCore: React.FC = () => {
  const galaxySpiralRef = useRef<THREE.Points>(null!);
  const starfieldRef = useRef<THREE.Points>(null!);
  const messengerMeshRef = useRef<THREE.Mesh>(null!);
  const coreSphereRef = useRef<THREE.Mesh>(null!);
  const burstPointsRef = useRef<THREE.Points>(null!);

  const { activeSection, cardState, mousePos, reducedMotion } = useScrollScene();
  useThree();

  // Particle counts for 3D Spiral Milky Way Galaxy
  const galaxyCount = reducedMotion ? 4000 : 14000;
  const starfieldCount = reducedMotion ? 3000 : 8000; // expanded background stars
  const burstCount = 800;

  // 1. 3D LOGARITHMIC SPIRAL MILKY WAY GALAXY (Matching Reference Image)
  const [galaxyPositions, galaxyColors, galaxySizes] = useMemo(() => {
    const pos = new Float32Array(galaxyCount * 3);
    const cols = new Float32Array(galaxyCount * 3);
    const szs = new Float32Array(galaxyCount);

    const cWhite = new THREE.Color('#FFFFFF');
    const cSilver = new THREE.Color('#E2E8F0');
    const cIcyCyan = new THREE.Color('#A5F3FC');
    const cDustCyan = new THREE.Color('#06B6D4');
    const cSoftLavender = new THREE.Color('#CBD5E1');

    const numArms = 4; // 4 Spiral Galaxy Arms
    const armWidth = 0.45;

    for (let i = 0; i < galaxyCount; i++) {
      // Radius from core
      const r = Math.pow(Math.random(), 2.2) * 18 + 0.3;

      // Select arm index
      const armIndex = i % numArms;
      const armAngle = (armIndex * 2 * Math.PI) / numArms;

      // Logarithmic spiral angle equation
      const spiralAngle = r * 0.45 + armAngle;

      // Random offset perpendicular to arm for natural star distribution
      const randomOffset = (Math.random() - 0.5) * armWidth * r;
      const theta = spiralAngle + randomOffset;

      // 3D Elliptical tilt (tilted disk like reference image)
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = (Math.random() - 0.5) * (2.5 / (r * 0.2 + 1)); // Thicker at core, thin at edges

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color distribution: Brilliant white core -> Silver & icy cyan arms
      let pColor = cSilver;
      if (r < 2.5) {
        pColor = cWhite; // High brightness core
      } else if (r < 7.0) {
        pColor = Math.random() > 0.4 ? cWhite : cIcyCyan;
      } else {
        const rand = Math.random();
        pColor = rand > 0.6 ? cDustCyan : (rand > 0.3 ? cSoftLavender : cSilver);
      }

      cols[i * 3] = pColor.r;
      cols[i * 3 + 1] = pColor.g;
      cols[i * 3 + 2] = pColor.b;

      // Core stars are brighter & slightly larger
      szs[i] = r < 2.5 ? Math.random() * 0.09 + 0.04 : Math.random() * 0.06 + 0.015;
    }

    return [pos, cols, szs];
  }, [galaxyCount]);

  // 2. BACKGROUND DISTANT STARFIELD — fills entire viewport
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const pos = new Float32Array(starfieldCount * 3);
    const cols = new Float32Array(starfieldCount * 3);
    const szs = new Float32Array(starfieldCount);

    const cWhite = new THREE.Color('#FFFFFF');
    const cCyan = new THREE.Color('#E0F2FE');
    const cWarm = new THREE.Color('#F0F9FF');

    for (let i = 0; i < starfieldCount; i++) {
      // Expanded volume — covers full screen at typical camera Z
      pos[i * 3]     = (Math.random() - 0.5) * 160;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120 - 20;

      const r = Math.random();
      const col = r > 0.75 ? cCyan : r > 0.55 ? cWarm : cWhite;
      cols[i * 3]     = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;

      szs[i] = Math.random() * 0.04 + 0.008;
    }

    return [pos, cols, szs];
  }, [starfieldCount]);

  // 3. BURST EXPLOSION PARTICLES FOR CARD BIRTH
  const [burstPositions, burstColors, burstVelocities] = useMemo(() => {
    const pos = new Float32Array(burstCount * 3);
    const cols = new Float32Array(burstCount * 3);
    const vels = new Float32Array(burstCount * 3);

    const cWhite = new THREE.Color('#FFFFFF');
    const cCyan = new THREE.Color('#38BDF8');

    for (let i = 0; i < burstCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 5;

      const col = Math.random() > 0.5 ? cWhite : cCyan;
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;

      vels[i * 3] = (Math.random() - 0.5) * 0.25;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
    }
    return [pos, cols, vels];
  }, [burstCount]);

  const particleProgressRef = useRef(0);

  useFrame((state, delta) => {
    if (!galaxySpiralRef.current) return;
    const time = state.clock.getElapsedTime();

    // Camera perspective & parallax
    const targetCamZ = activeSection === -1 ? 16 : 12;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.05);

    const targetCamX = mousePos.x * 2.8;
    const targetCamY = mousePos.y * 1.8;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.05);
    state.camera.lookAt(0, 0, 0);

    // Rotate 3D Milky Way Spiral Galaxy Disk
    const isPulsing = cardState === 'SWARM_PULSING' || cardState === 'CARD_RETURNING';
    const rotSpeed = isPulsing ? 0.45 : 0.092; // slightly faster

    galaxySpiralRef.current.rotation.y += delta * rotSpeed;
    galaxySpiralRef.current.rotation.x = 0.55;
    galaxySpiralRef.current.rotation.z = Math.sin(time * 0.045) * 0.09;

    // Rotate Background Stars
    if (starfieldRef.current) {
      starfieldRef.current.rotation.y += delta * 0.008;
    }

    // Swarm Core Pulse Animation
    if (coreSphereRef.current) {
      const targetCoreScale = cardState === 'SWARM_PULSING' ? 2.5 : 1.0;
      coreSphereRef.current.scale.lerp(
        new THREE.Vector3(targetCoreScale, targetCoreScale, targetCoreScale),
        0.15
      );
    }

    // 3D Messenger Particle trajectory out from Milky Way Core
    if (messengerMeshRef.current) {
      if (cardState === 'CARD_RETURNING') {
        particleProgressRef.current = THREE.MathUtils.lerp(particleProgressRef.current, 0, 0.18);
      } else if (cardState === 'PARTICLE_SHOOTING') {
        particleProgressRef.current = THREE.MathUtils.lerp(particleProgressRef.current, 1, 0.18);
      } else if (cardState === 'CARD_UNFOLDING' || cardState === 'CARD_ACTIVE') {
        particleProgressRef.current = 1;
      } else if (cardState === 'INTRO_UNIVERSE' || cardState === 'SWARM_PULSING') {
        particleProgressRef.current = 0;
      }

      const p = particleProgressRef.current;
      const startX = 0;
      const startY = 0;
      const startZ = 0;

      const targetX = 0;
      const targetY = 0;
      const targetZ = 5;

      const arch = Math.sin(p * Math.PI) * 2.2;
      const currX = THREE.MathUtils.lerp(startX, targetX, p) + Math.cos(time * 10) * arch * 0.5;
      const currY = THREE.MathUtils.lerp(startY, targetY, p) + Math.sin(time * 10) * arch * 0.5;
      const currZ = THREE.MathUtils.lerp(startZ, targetZ, p);

      messengerMeshRef.current.position.set(currX, currY, currZ);

      let targetScale = 0.2;
      if (cardState === 'CARD_UNFOLDING') {
        targetScale = 4.5;
      } else if (cardState === 'PARTICLE_SHOOTING' || cardState === 'CARD_RETURNING') {
        targetScale = 0.9;
      } else if (cardState === 'CARD_ACTIVE') {
        targetScale = 0.1;
      } else {
        targetScale = 0;
      }

      messengerMeshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      );
    }

    // Burst Explosion Particles
    if (burstPointsRef.current) {
      const bPosAttr = burstPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const bArray = bPosAttr.array as Float32Array;

      if (cardState === 'CARD_UNFOLDING' || cardState === 'PARTICLE_SHOOTING') {
        burstPointsRef.current.visible = true;
        for (let i = 0; i < burstCount; i++) {
          bArray[i * 3] += burstVelocities[i * 3];
          bArray[i * 3 + 1] += burstVelocities[i * 3 + 1];
          bArray[i * 3 + 2] += burstVelocities[i * 3 + 2];
        }
      } else {
        burstPointsRef.current.visible = false;
        for (let i = 0; i < burstCount; i++) {
          bArray[i * 3] = (Math.random() - 0.5) * 0.5;
          bArray[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
          bArray[i * 3 + 2] = 5;
        }
      }
      bPosAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Background Distant Starfield */}
      <points ref={starfieldRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[starSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* 2. 3D LOGARITHMIC SPIRAL MILKY WAY GALAXY DISK (Matching Image) */}
      <points ref={galaxySpiralRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[galaxyPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[galaxyColors, 3]} />
          <bufferAttribute attach="attributes-size" args={[galaxySizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Brilliant White Milky Way Core */}
      <mesh ref={coreSphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color={cardState === 'SWARM_PULSING' ? '#06B6D4' : '#FFFFFF'}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* 4. High-Energy Messenger Particle */}
      <mesh ref={messengerMeshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={cardState === 'INTRO_UNIVERSE' ? 0 : 0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Dynamic Burst Explosion Points during Card Birth */}
      <points ref={burstPointsRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[burstPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[burstColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
