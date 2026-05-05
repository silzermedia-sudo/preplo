'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (variant === 'app') {
    return (
      <nav className="bg-[#faf9fc]/70 backdrop-blur-xl sticky top-0 shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] z-50">
        <div className="flex justify-between items-center h-20 px-12 w-full max-w-[1440px] mx-auto bg-[#f4f3f7] transition-colors duration-300">
          <Link href="/" className="text-2xl font-bold tracking-[-0.02em] text-[#022448]">Preplo</Link>
          <div className="flex items-center space-x-2 text-[#022448]">
            <button onClick={handleSignOut} aria-label="Abmelden" title="Abmelden" className="hover:bg-white/60 rounded-md transition-all p-2 flex items-center gap-2 text-sm font-medium px-3">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="hidden md:inline">Abmelden</span>
            </button>
            <Link href="/settings" aria-label="Mein Konto" title={user?.email ?? 'Mein Konto'} className="h-9 w-9 rounded-full bg-secondary-container flex items-center justify-center hover:opacity-80 transition-opacity ml-1">
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">person</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-surface/70 backdrop-blur-md sticky top-0 z-50 w-full transition-all duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Preplo</Link>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#problemloesung">Problemlösung</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#ueber-uns">Über uns</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#kontakt">Kontakt</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#pricing">Pricing</a>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/briefings">
              <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity active:scale-95">
                Meine Briefings
              </button>
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-transparent border border-outline-variant/30 text-primary px-6 py-2 rounded-md font-medium text-sm hover:bg-surface-container-low transition-colors active:scale-95"
            >
              Abmelden
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-transparent border border-outline-variant/30 text-primary px-6 py-2 rounded-md font-medium text-sm hover:bg-surface-container-low transition-colors active:scale-95">
              Anmelden
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}
