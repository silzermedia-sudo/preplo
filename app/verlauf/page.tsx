'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import type { Briefing } from '@/types'

export default function VerlaufPage() {
  const router = useRouter()
  const [briefings, setBriefings] = useState<Briefing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      const { data, error } = await supabase
        .from('briefings')
        .select('id, company_name, company_url, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        setError('Verlauf konnte nicht geladen werden.')
      } else {
        setBriefings((data ?? []) as Briefing[])
      }
      setLoading(false)
    }
    load()
  }, [router])

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar variant="app" activeNav="verlauf" />

      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12 md:py-20">
        <div className="mb-10">
          <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">MEIN KONTO</p>
          <h1 className="text-[32px] md:text-[48px] font-bold text-on-surface leading-[1.1] tracking-[-0.02em]">Verlauf</h1>
          <p className="text-[15px] text-on-surface-variant mt-2">Alle deine bisherigen Briefings auf einen Blick.</p>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
            <span className="text-sm">Wird geladen…</span>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container rounded-lg p-4 text-sm">{error}</div>
        )}

        {!loading && !error && briefings.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-30">history</span>
            <p className="text-[16px] font-medium mb-2">Noch keine Briefings</p>
            <p className="text-sm mb-6">Erstelle dein erstes Briefing auf der Startseite.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Briefing erstellen
            </Link>
          </div>
        )}

        {!loading && briefings.length > 0 && (
          <div className="space-y-3">
            {briefings.map((b) => (
              <Link
                key={b.id}
                href={`/briefing/${b.id}`}
                className="group flex items-center justify-between bg-surface-container-lowest border border-outline-variant/15 rounded-xl px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_0_rgba(26,28,30,0.08)] hover:ring-1 hover:ring-primary/20"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-on-surface truncate">{b.company_name}</p>
                    {b.company_url && (
                      <p className="text-[13px] text-on-surface-variant truncate">{b.company_url}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[13px] text-on-surface-variant hidden sm:block">{formatDate(b.created_at)}</span>
                  <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary transition-colors text-[20px]">chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
