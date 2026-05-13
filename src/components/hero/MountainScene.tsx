import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { heroMotion } from '../../lib/heroMotion';

function SoftTerrain() {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 40, 64, 64);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.22) * Math.cos(y * 0.2) * 2.2 +
        Math.sin(x * 0.65 + y * 0.4) * 0.45 +
        Math.cos(y * 0.55) * 0.35;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -2]}>
      <meshStandardMaterial
        color="#b4a3d8"
        roughness={0.92}
        metalness={0.04}
        flatShading
        emissive="#6b5a8a"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

function RiverShimmer() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current?.material as THREE.MeshStandardMaterial | undefined;
    if (m) {
      m.emissiveIntensity = 0.15 + Math.sin(clock.elapsedTime * 0.8) * 0.06;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0.15]} position={[1.2, -1.98, -1]} scale={[5, 18, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshStandardMaterial
        color="#6d8cff"
        roughness={0.35}
        metalness={0.25}
        emissive="#3a4f9e"
        emissiveIntensity={0.18}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function Fireflies({ count = 28 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(t * 0.7) * 0.08;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#fff7d6"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function LanternOrbs() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.08;
    }
  });
  const orbs = useMemo(
    () =>
      [
        [-6, 1.2, -4],
        [5.5, 0.8, -6],
        [-2, 2.1, -8],
        [4, 1.6, -3],
      ] as const,
    [],
  );
  return (
    <group ref={group}>
      {orbs.map(([x, y, z], i) => (
        <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={0.25} floatIntensity={0.6}>
          <mesh position={[x, y, z]} scale={0.22}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#ffd6a8"
              emissive="#ff9f6e"
              emissiveIntensity={0.9}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
          <pointLight position={[x, y, z]} intensity={0.35} distance={10} color="#ffc49a" />
        </Float>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const { scroll01, mx, my } = heroMotion;
    const targetZ = 13.5 - scroll01 * 3.2;
    const targetX = mx * 0.55;
    const targetY = 1.8 + my * 0.35;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 1 - Math.pow(0.92, delta * 60));
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 1 - Math.pow(0.9, delta * 60));
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 1 - Math.pow(0.9, delta * 60));
    camera.lookAt(0, -0.2, -4);
  });
  return null;
}

export function MountainScene() {
  return (
    <>
      <fog attach="fog" args={['#d8cff5', 12, 38]} />
      <ambientLight intensity={0.45} color="#e8e4ff" />
      <directionalLight position={[8, 14, 10]} intensity={0.55} color="#fff5f0" />
      <hemisphereLight args={['#c4d4ff', '#f0d4ff', 0.35]} />
      <CameraRig />
      <SoftTerrain />
      <RiverShimmer />
      <Stars radius={80} depth={40} count={1800} factor={2.5} saturation={0.12} fade speed={0.3} />
      <Sparkles count={36} scale={[18, 5, 14]} size={1.8} speed={0.25} opacity={0.35} color="#fff0ff" />
      <Fireflies count={26} />
      <LanternOrbs />
    </>
  );
}
