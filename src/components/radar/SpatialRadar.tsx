'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowHelper, Vector3 } from 'three';
import { useSensorStore } from '@/store/useSensorStore';

// Simple rotating arrow that points to the current DOA coordinates
function DOAArrow() {
  const ref = useRef<ArrowHelper>(null);
  const x = useSensorStore(state => state.x);
  const y = useSensorStore(state => state.y);
  const z = useSensorStore(state => state.z);
  const confidence = useSensorStore(state => state.confidence);

  // Update arrow direction each frame
  useFrame(() => {
    if (ref.current) {
      const dir = new Vector3(x, y, z).normalize();
      ref.current.setDirection(dir);
      // Thickness based on confidence
      const scale = Math.max(0.1, confidence / 100);
      ref.current.setLength(1, scale, scale * 0.5);
    }
  });

  return (
    <arrowHelper
      ref={ref}
      args={[new Vector3(0, 0, 1), new Vector3(0, 0, 0), 1, 'red', 0.1, 0.05]}
    />
  );
}

export default function SpatialRadar() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
      {/* Ambient lighting for a subtle glow */}
      <ambientLight intensity={0.5} />
      {/* Wireframe sphere representing the sensor node */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial wireframe color="#4b5563" />
      </mesh>
      {/* Direction of Arrival arrow */}
      <DOAArrow />
    </Canvas>
  );
}
