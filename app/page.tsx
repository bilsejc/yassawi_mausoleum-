'use client'

import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import LegendSection from '@/components/LegendSection'
import Gallery from '@/components/Gallery'
import ContactSection from '@/components/ContactSection'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  return (
    <div className="relative">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
        <AboutSection />
        <LegendSection />
        <Gallery />
        <ContactSection />
      </Suspense>
    </div>
  )
}
