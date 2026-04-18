'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('preplo_cookie_consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('preplo_cookie_consent', 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem('preplo_cookie_consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-surface-container-lowest border-t border-outline-variant/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-2xl">
          <strong className="text-on-surface">Cookies & Datenschutz.</strong>{' '}
          Wir verwenden technisch notwendige Cookies für Anmeldung und Session sowie optionale Analyse-Cookies.{' '}
          <Link href="/datenschutz" className="text-primary underline underline-offset-2 hover:text-primary/80">
            Mehr erfahren
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-md text-sm font-medium text-on-surface-variant border border-outline-variant/30 hover:bg-surface-container transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-on-primary hover:opacity-90 transition-opacity"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}
