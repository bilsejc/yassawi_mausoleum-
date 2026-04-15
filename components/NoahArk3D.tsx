'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'

// Ark component
function Ark() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }
  })

  return (
    <group ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Ark Hull */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.5, 1.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Ark Deck */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.1, 1]} />
        <meshStandardMaterial color="#D2691E" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Ark Roof */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.8, 0.8]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} metalness={0.3} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 1.2, 0.4]} castShadow>
        <boxGeometry args={[2, 0.4, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      
      {/* Door */}
      <mesh position={[1.8, 0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.4]} />
        <meshStandardMaterial color="#654321" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Animals on deck */}
      <mesh position={[-1, 0.8, 0.3]} castShadow>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh position={[1, 0.8, -0.3]} castShadow>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      <mesh position={[0.5, 0.8, 0.2]} castShadow>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  )
}

// Water component
function Water() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#4682B4" 
        transparent 
        opacity={0.8} 
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  )
}

// Mountains in background
function Mountains() {
  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[i * 3 - 6, -1, -5]} castShadow>
          <coneGeometry args={[1 + Math.random(), 2 + Math.random(), 6]} />
          <meshStandardMaterial color="#696969" roughness={0.8} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Ark />
      <Water />
      <Mountains />
      
      <Environment preset="sunset" />
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function NoahArk3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
