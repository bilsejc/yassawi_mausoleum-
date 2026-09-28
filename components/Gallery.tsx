'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const galleryImages = [
    {
      id: 1,
      src: "/images/yassawi-1.jpeg",
      alt: t('gallery.image1.title'),
      title: t('gallery.image1.title'),
      description: t('gallery.image1.desc'),
      category: t('gallery.landscapes')
    },
    {
      id: 2,
      src: "/images/yassawi-2.jpeg",
      alt: t('gallery.image2.title'),
      title: t('gallery.image2.title'),
      description: t('gallery.image2.desc'),
      category: t('gallery.peak')
    },
    {
      id: 3,
      src: "/images/yassawi-3.jpeg",
      alt: t('gallery.image3.title'),
      title: t('gallery.image3.title'),
      description: t('gallery.image3.desc'),
      category: t('gallery.nature')
    },
    {
      id: 4,
      src: "/images/yassawi-4.jpeg",
      alt: t('gallery.image4.title'),
      title: t('gallery.image4.title'),
      description: t('gallery.image4.desc'),
      category: t('gallery.caves')
    },
    {
      id: 5,
      src: "/images/yassawi-5.jpeg",
      alt: t('gallery.image5.title'),
      title: t('gallery.image5.title'),
      description: t('gallery.image5.desc'),
      category: t('gallery.landscapes')
    },
    {
      id: 6,
      src: "/images/yassawi-6.jpeg",
      alt: t('gallery.image6.title'),
      title: t('gallery.image6.title'),
      description: t('gallery.image6.desc'),
      category: t('gallery.nature')
    },
    {
      id: 7,
      src: "/images/yassawi-7.jpg",
      alt: t('gallery.image7.title'),
      title: t('gallery.image7.title'),
      description: t('gallery.image7.desc'),
      category: t('gallery.landscapes')
    }
  ]

  const categories = [t('gallery.all'), t('gallery.landscapes'), t('gallery.peak'), t('gallery.nature'), t('gallery.caves')]
  const [activeCategory, setActiveCategory] = useState(t('gallery.all'))

  const filteredImages = activeCategory === t('gallery.all') 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
      setSelectedImage(filteredImages[prevIndex].id)
    }
  }

  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img.id === selectedImage)
    : null

  return (
    <section id="gallery" ref={ref} className="section-padding bg-gradient-to-b from-white to-sky-50">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-nature-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.description}</p>
                  </div>
                </div>

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(image.id)
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      favorites.includes(image.id) ? 'text-red-500 fill-current' : 'text-white'
                    }`} 
                  />
                </motion.button>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-nature-500 text-white text-xs font-medium rounded-full">
                  {image.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Видео</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/ZTE9XOobo7A"
                title="Видео о мавзолее Ходжи Ахмеда Ясави 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/M90tWzxaH9U"
                title="Видео о мавзолее Ходжи Ахмеда Ясави 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedImage && selectedImageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl max-h-full bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedImageData.src}
                    alt={selectedImageData.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  
                  {/* Navigation Arrows */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    title={t('gallery.previous')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    title={t('gallery.next')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    title={t('gallery.close')}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedImageData.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {selectedImageData.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-nature-100 text-nature-700 text-sm font-medium rounded-full">
                        {selectedImageData.category}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(selectedImageData.id)}
                        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            favorites.includes(selectedImageData.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                          }`} 
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

export default Gallery
