'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Компонент для загрузки
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4">
    <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
    <p className="text-gray-600">3D модель жүктелуде...</p>
  </div>
)

// Основной компонент 3D модели
const Luma3DModel = ({ modelUrl, title = "Luma AI 3D Model" }: { modelUrl: string, title?: string }) => {
  return (
    <iframe
      src={modelUrl}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      style={{ border: 'none', borderRadius: '12px' }}
      title={title}
    />
  )
}

// Основной компонент
const Luma3D = ({ 
  modelUrl, 
  title = "Luma AI 3D Model",
  className = ""
}: { 
  modelUrl: string, 
  title?: string,
  className?: string 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white ${className}`}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Luma3DModel modelUrl={modelUrl} title={title} />
      </Suspense>
      
      {/* Декоративные элементы */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hidden sm:block"
      >
        <div className="w-6 h-6 bg-gradient-to-r from-nature-500 to-sky-500 rounded-full" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hidden sm:block"
      >
        <div className="w-4 h-4 bg-gradient-to-r from-sky-500 to-nature-500 rounded-full" />
      </motion.div>
      
      {/* Мобильный индикатор загрузки */}
      <div className="absolute top-4 left-4 sm:hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <div className="w-4 h-4 bg-gradient-to-r from-nature-500 to-sky-500 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  )
}

export default Luma3D
