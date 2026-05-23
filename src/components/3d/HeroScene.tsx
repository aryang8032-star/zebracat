'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float, Environment, PerspectiveCamera, Stars,
  MeshDistortMaterial, GradientTexture, Sphere, Box, Cylinder, Torus
} from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

function NewsKiosk({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    if (meshRef.current && active) {
      meshRef.current.rotation.y += delta * 0.3
    }
    if (glowRef.current) {
      glowRef.current.intensity = active
        ? 2 + Math.sin(Date.now() * 0.004) * 0.5
        : 0.2
    }
  })

  return (
    <group position={[-2.5, -1, -1]}>
      <pointLight ref={glowRef} color="#6F4CF5" intensity={active ? 2 : 0.2} distance={3} />
      <Box ref={meshRef} args={[0.4, 0.6, 0.15]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color={active ? '#6F4CF5' : '#3a3a4a'} emissive={active ? '#6F4CF5' : '#000'} emissiveIntensity={active ? 0.3 : 0} />
      </Box>
      <Box args={[0.5, 0.05, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" />
      </Box>
      <Cylinder args={[0.02, 0.02, 0.8, 8]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#555" />
      </Cylinder>
    </group>
  )
}

function RadioTower({ active }: { active: boolean }) {
  const waveRef = useRef<THREE.Mesh>(null)

  // Mutate opacity on the existing material instead of allocating a new one
  // every frame, which leaked materials and triggered constant GC pauses.
  useFrame((state) => {
    if (waveRef.current && active) {
      waveRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15)
      const mat = waveRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  return (
    <group position={[2.5, -0.5, -2]}>
      {active && <pointLight color="#22D3EE" intensity={3} distance={4} />}
      {/* Tower body */}
      <Cylinder args={[0.04, 0.08, 1.5, 6]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color={active ? '#22D3EE' : '#444'} emissive={active ? '#22D3EE' : '#000'} emissiveIntensity={0.2} />
      </Cylinder>
      {/* Antenna top */}
      <Cylinder args={[0.01, 0.01, 0.5, 6]} position={[0, 1.75, 0]}>
        <meshStandardMaterial color="#aaa" />
      </Cylinder>
      {/* Wave sphere */}
      {active && (
        <Sphere ref={waveRef} args={[0.6, 12, 12]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#22D3EE" transparent opacity={0.15} wireframe />
        </Sphere>
      )}
    </group>
  )
}

function LEDScreen({ active }: { active: boolean }) {
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (screenRef.current && active) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={[0, 0.5, -3]}>
      {active && <pointLight color="#6F4CF5" intensity={4} distance={5} />}
      {/* Screen frame */}
      <Box args={[2.2, 1.4, 0.08]}>
        <meshStandardMaterial color="#1a1a2e" />
      </Box>
      {/* Screen display */}
      <Box ref={screenRef} args={[2, 1.2, 0.06]} position={[0, 0, 0.01]}>
        <meshStandardMaterial
          color={active ? '#3B2EE0' : '#111'}
          emissive={active ? '#6F4CF5' : '#000'}
          emissiveIntensity={active ? 0.4 : 0}
        />
      </Box>
      {/* Mount */}
      <Cylinder args={[0.05, 0.05, 1, 8]} position={[0, -1.2, 0]}>
        <meshStandardMaterial color="#333" />
      </Cylinder>
    </group>
  )
}

function CinemaFront({ active }: { active: boolean }) {
  const marqRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (marqRef.current && active) {
      const mat = marqRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 4)) * 0.5
    }
  })

  return (
    <group position={[-1.5, -0.5, -2.5]}>
      {active && <pointLight color="#F59E0B" intensity={3} distance={4} />}
      {/* Building */}
      <Box args={[1.4, 1.6, 0.3]}>
        <meshStandardMaterial color="#1a1020" />
      </Box>
      {/* Marquee strip */}
      <Box ref={marqRef} args={[1.4, 0.2, 0.1]} position={[0, 0.7, 0.1]}>
        <meshStandardMaterial
          color={active ? '#F59E0B' : '#333'}
          emissive={active ? '#F59E0B' : '#000'}
          emissiveIntensity={active ? 0.5 : 0}
        />
      </Box>
      {/* Entrance */}
      <Box args={[0.4, 0.6, 0.15]} position={[0, -0.5, 0.1]}>
        <meshStandardMaterial color="#0a0010" />
      </Box>
    </group>
  )
}

function FloatingParticles() {
  const count = 80
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#6F4CF5" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#0a0a1a" metalness={0.5} roughness={0.8} />
    </mesh>
  )
}

function SceneContent({ activeIndex }: { activeIndex: number }) {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    state.camera.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.08) * 0.1
  })

  return (
    <>
      <Stars radius={30} depth={10} count={200} factor={2} saturation={0} fade speed={1} />
      <ambientLight intensity={0.3} color="#1a1035" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 3, 0]} color="#6F4CF5" intensity={1} distance={8} />

      <FloatingParticles />
      <Ground />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <NewsKiosk active={activeIndex === 0} />
      </Float>

      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.3}>
        <RadioTower active={activeIndex === 1} />
      </Float>

      <LEDScreen active={activeIndex === 5 || activeIndex === 8} />
      <CinemaFront active={activeIndex === 3} />

      <Environment preset="city" />
    </>
  )
}

interface HeroSceneProps {
  activeIndex: number
}

export function HeroScene({ activeIndex }: HeroSceneProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-violet-900/30" aria-hidden />
    )
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        className="!absolute inset-0"
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={60} />
        <Suspense fallback={null}>
          <SceneContent activeIndex={activeIndex} />
        </Suspense>
      </Canvas>
    </div>
  )
}
