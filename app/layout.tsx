import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'
import OAuthHandler from '@/components/OAuthHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Preplo – In 60 Sekunden vorbereitet',
  description: 'KI-gestützte Besuchsvorbereitung für den deutschen Bürofachhandel.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <OAuthHandler />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
