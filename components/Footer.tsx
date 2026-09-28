'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { MausoleumIcon } from './MausoleumIcon'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container-max">
        <div className="py-16">
          {/* Authors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <MausoleumIcon className="h-8 w-8 text-nature-500 shrink-0" />
              <span className="text-2xl font-bold text-gradient">
                Яссауи кесенесі
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
              {t('footer.description')}
            </p>
            
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-nature-500" />
                <span>Оңтүстік Қазақстан, Қазақстан</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-nature-500" />
                <span>87711582943</span>
                <span>87029503328</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-nature-500" />
                <span>info@turkestan-yasawi.kz</span>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              © {currentYear} {t('footer.rights')}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer