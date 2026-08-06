"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei"
import type { Mesh } from "three"

function GarlicModel() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1
    }
  })

  const materialProps = useMemo(
    () => ({
      thickness: 0.8,
      roughness: 0.15,
      transmission: 0.6,
      ior: 1.5,
      chromaticAberration: 0.1,
      backside: true,
      color: "#F5F0E8",
      metalness: 0.05,
    }),
    []
  )

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.5}>
        <dodecahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 80
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#C9A84C"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -2, -4]} intensity={0.3} color="#C9A84C" />
        <GarlicModel />
        <Particles />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
        />
      </Canvas>
    </div>
  )
}