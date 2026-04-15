'use client'

import Navigation from './Navigation'
import Footer from './Footer'
import ThemeProvider from './ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
