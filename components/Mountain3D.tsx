'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { MapPin, Info, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import * as THREE from 'three'

// Mountain component with detailed geometry
function Mountain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.scale.setScalar(hovered ? 1.02 : 1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <coneGeometry args={[3, 4, 8]} />
      <meshStandardMaterial
        color={hovered ? '#9B8565' : '#8B7355'}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Interactive points of interest
function PointOfInterest({ position, label, description, color = '#ff6b6b' }: {
  position: [number, number, number]
  label: string
  description: string
  color?: string
}) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
            <h4 className="font-semibold text-gray-900 mb-1">{label}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Ground/Base
function Ground() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#90EE90" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

// Sky and clouds
function Sky() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[30, 20]} />
      <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
    </mesh>
  )
}

// Main 3D Scene
function Scene() {
  const pointsOfInterest = [
    {
      position: [0, 2, 0] as [number, number, number],
      label: "Главный купол",
      description: "Центральный купол мавзолея Ходжи Ахмеда Ясави (~39 м)",
      color: "#ff6b6b"
    },
    {
      position: [-1.5, 0.5, 0] as [number, number, number],
      label: "Могила Ходжи Ахмеда",
      description: "Священное помещение у гробницы",
      color: "#4ecdc4"
    },
    {
      position: [1.5, 0.3, 0] as [number, number, number],
      label: "Кирпичный декор",
      description: "Узоры и орнамент эпохи Тимура",
      color: "#45b7d1"
    },
    {
      position: [0, -0.5, 1.5] as [number, number, number],
      label: "Площадь",
      description: "Внешний двор архитектурного комплекса",
      color: "#96ceb4"
    }
  ]

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <Mountain />
      <Ground />
      <Sky />
      
      {pointsOfInterest.map((point, index) => (
        <PointOfInterest
          key={index}
          position={point.position}
          label={point.label}
          description={point.description}
          color={point.color}
        />
      ))}
      
      <Environment preset="sunset" />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </>
  )
}

export default function Mountain3D() {
  const [isVisible, setIsVisible] = useState(false)
  const [controls, setControls] = useState<any>(null)

  const resetView = () => {
    if (controls) {
      controls.reset()
    }
  }

  const zoomIn = () => {
    if (controls) {
      controls.dollyIn(0.5)
    }
  }

  const zoomOut = () => {
    if (controls) {
      controls.dollyOut(0.5)
    }
  }

  return (
    <section id="3d" className="section-padding bg-gradient-to-b from-nature-50 to-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Интерактивная <span className="text-gradient">3D Модель</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Исследуйте мавзолей Ходжи Ахмеда Ясави в трёхмерном пространстве.
            Вращайте, приближайте и изучайте ключевые точки комплекса
          </p>
        </motion.div>

        {/* 3D Model Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-nature-600" />
                Мавзолей Ходжи Ахмеда Ясави
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-nature-500 text-white rounded-lg hover:bg-nature-600 transition-colors duration-300"
              >
                {isVisible ? 'Скрыть' : 'Показать'} 3D
              </motion.button>
            </div>

            {isVisible ? (
              <div className="relative h-96 bg-gradient-to-b from-sky-200 to-blue-300 rounded-xl overflow-hidden">
                <Canvas
                  camera={{ position: [8, 5, 8], fov: 50 }}
                  shadows
                  gl={{ antialias: true, alpha: true }}
                  onCreated={({ gl, camera, scene }) => {
                    // Store controls reference
                    const controls = scene.children.find(child => child.type === 'OrbitControls')
                    if (controls) {
                      setControls(controls)
                    }
                  }}
                >
                  <Scene />
                </Canvas>
                
                {/* 3D Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetView}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    title="Сбросить вид"
                  >
                    <RotateCcw className="h-4 w-4 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={zoomIn}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    title="Приблизить"
                  >
                    <ZoomIn className="h-4 w-4 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={zoomOut}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                    title="Отдалить"
                  >
                    <ZoomOut className="h-4 w-4 text-gray-700" />
                  </motion.button>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="h-4 w-4 text-nature-600" />
                    <h4 className="font-semibold text-gray-900">Управление</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Вращайте мышью • Приближайте колесиком • Наводите на точки для информации
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-96 bg-gradient-to-b from-sky-200 to-blue-300 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Нажмите "Показать 3D" для интерактивного просмотра</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-nature-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-nature-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Интерактивные точки</h4>
              <p className="text-gray-600">
                Наводите на цветные точки для получения информации о ключевых местах
              </p>
            </div>
            <div className="text-center">
              <div className="bg-sky-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-sky-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Полный контроль</h4>
              <p className="text-gray-600">
                Вращайте, приближайте и изучайте гору с любого угла
              </p>
            </div>
            <div className="text-center">
              <div className="bg-mountain-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Info className="h-8 w-8 text-mountain-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Детальная информация</h4>
              <p className="text-gray-600">
                Узнайте больше о каждом интересном месте на горе
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
