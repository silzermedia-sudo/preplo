'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      setLoading(false)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Navbar */}
      <nav className="bg-[#f4f3f7] sticky top-0 shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] z-50">
        <div className="flex justify-between items-center h-16 md:h-20 px-6 md:px-12 w-full max-w-[1440px] mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-[-0.02em] text-[#022448]">Preplo</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/briefings" className="font-semibold rounded-md px-3 py-2 text-[#1a1c1e]/60 hover:text-[#022448] transition-all">
              Briefing
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-[#022448]">
            <Link href="/settings" aria-label="Einstellungen" className="bg-[#022448]/10 rounded-md p-2">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center ml-2">
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">person</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12 md:py-20">
        <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">Konto</p>
        <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-12">Einstellungen</h1>

        {/* Account Info */}
        <div className="bg-surface-container-lowest rounded-xl ring-1 ring-outline-variant/15 shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-on-secondary-container">person</span>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-on-surface">{user?.email}</p>
              <p className="text-sm text-on-surface-variant">Mitglied seit {new Date(user?.created_at ?? '').toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="border-t border-outline-variant/15 pt-6 space-y-4">
            <div>
              <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-1">E-Mail</p>
              <p className="text-[15px] text-on-surface">{user?.email}</p>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-1">Konto-ID</p>
              <p className="text-[13px] text-on-surface-variant font-mono">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface-container-lowest rounded-xl ring-1 ring-outline-variant/15 shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] p-8">
          <h2 className="text-[18px] font-semibold text-on-surface mb-6">Sitzung</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-error/10 hover:bg-error/20 text-error px-5 py-3 rounded-lg font-medium text-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Abmelden
          </button>
        </div>
      </main>
    </div>
  )
}
