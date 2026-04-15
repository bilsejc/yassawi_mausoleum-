import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://turkestan-yasawi.kz'),
  title: 'Қожа Ахмет Яссауи кесенесі — Түркістан',
  description: 'Түркістандағы Қожа Ахмет Яссауи кесенесі: ЮНЕСКО Әлемдік мұрасы, темір дәуірінің сәулеті және рухани мұра.',
  keywords: 'Қожа Ахмет Яссауи, кесене, Түркістан, Қазақстан, ЮНЕСКО, туризм, тарих, мәдени мұра',
  authors: [{ name: 'Khoja Ahmed Yasawi Mausoleum Website' }],
  openGraph: {
    title: 'Қожа Ахмет Яссауи кесенесі — Түркістан',
    description: 'ЮНЕСКО Әлемдік мұрасына енгізілген кесене және Түркістанның рухани орталығы',
    type: 'website',
    locale: 'kk_KZ',
    siteName: 'Khoja Ahmed Yasawi Mausoleum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Қожа Ахмет Яссауи кесенесі — Түркістан',
    description: 'ЮНЕСКО Әлемдік мұрасына енгізілген кесене және Түркістанның рухани орталығы',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
