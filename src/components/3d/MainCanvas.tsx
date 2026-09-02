import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleSwarmCore } from './ParticleSwarmCore';
import { FloatingTechObjects } from './FloatingTechObjects';

export const MainCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06B6D4" />

        <Suspense fallback={null}>
          <ParticleSwarmCore />
          <FloatingTechObjects />
        </Suspense>
      </Canvas>
    </div>
  );
};
