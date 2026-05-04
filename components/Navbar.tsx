'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  variant?: 'landing' | 'app'
  activeNav?: 'dashboard' | 'briefings' | 'insights'
  onPdfExport?: () => void
  onShare?: () => void
}

export default function Navbar({ variant = 'landing', activeNav = 'briefings', onPdfExport, onShare }: NavbarProps) {
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
          <div className="hidden md:flex space-x-8">
            {(['dashboard', 'briefings', 'insights'] as const).map((nav) => (
              <Link
                key={nav}
                href={nav === 'dashboard' ? '/dashboard' : '#'}
                className={`font-medium transition-all rounded-md px-3 py-2 capitalize ${
                  activeNav === nav
                    ? 'text-[#022448] font-semibold border-b-2 border-[#022448]'
                    : 'text-[#1a1c1e]/60 hover:text-[#022448] hover:bg-[#f4f3f7]'
                }`}
              >
                {nav.charAt(0).toUpperCase() + nav.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4 text-[#022448]">
            {onPdfExport && (
              <button onClick={onPdfExport} aria-label="Als PDF exportieren" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2">
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </button>
            )}
            {onShare && (
              <button onClick={onShare} aria-label="Teilen" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2">
                <span className="material-symbols-outlined">share</span>
              </button>
            )}
            <button onClick={handleSignOut} aria-label="Abmelden" className="hover:bg-[#f4f3f7] rounded-md transition-all p-2">
              <span className="material-symbols-outlined">logout</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center ml-2" title={user?.email ?? ''}>
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">person</span>
            </div>
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
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#problem">Problemlösung</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#ueber-uns">Über uns</a>
          <a className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="#kontakt">Kontakt</a>
          <Link className="text-on-surface/70 hover:text-primary transition-colors font-medium text-sm tracking-tight" href="/pricing">Pricing</Link>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-on-surface-variant hidden md:block">{user.email}</span>
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
