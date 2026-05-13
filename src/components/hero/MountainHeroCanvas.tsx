import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { MountainScene } from './MountainScene';
import { prefersReducedMotion } from '../../lib/heroMotion';

export function MountainHeroCanvas() {
  const reduced = useMemo(() => prefersReducedMotion(), []);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-[100dvh] w-full [&>div]:h-full">
      <Canvas
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        shadows={false}
        camera={{ position: [0, 2, 13.5], fov: 42, near: 0.1, far: 80 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <MountainScene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default MountainHeroCanvas;
