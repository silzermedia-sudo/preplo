'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Briefing } from '@/types'

export default function BriefingsPage() {
  const router = useRouter()
  const [briefings, setBriefings] = useState<Briefing[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [company, setCompany] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      const { data: list } = await supabase
        .from('briefings')
        .select('id, company_name, created_at')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false })
      setBriefings((list as Briefing[]) ?? [])
      setLoading(false)
    })
  }, [router])

  const handleNewBriefing = () => {
    if (company.trim()) {
      router.push(`/loading-screen?company=${encodeURIComponent(company.trim())}`)
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#f4f3f7] sticky top-0 z-50 shadow-[0_2px_20px_0_rgba(26,28,30,0.06)]">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-white/60 rounded-md p-2 transition-all text-[#022448]"
              aria-label="Sidebar togglen"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link href="/" className="text-2xl font-bold tracking-[-0.02em] text-[#022448]">Preplo</Link>
          </div>
          <div className="flex items-center gap-2 text-[#022448]">
            <Link href="/settings" className="hover:bg-white/60 rounded-md p-2 transition-all">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <Link href="/settings" className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">person</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 shrink-0 border-r border-outline-variant/15 bg-surface-container-lowest flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-outline-variant/15">
              <p className="text-[11px] uppercase tracking-[0.08em] text-on-surface-variant font-semibold">Verlauf</p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center flex-1 py-12">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : briefings.length === 0 ? (
              <div className="p-6 text-center text-sm text-on-surface-variant">
                Noch keine Briefings erstellt.
              </div>
            ) : (
              <ul className="flex-1">
                {briefings.map((b) => (
                  <li key={b.id} className="group border-b border-outline-variant/10">
                    <div className="flex items-center gap-2 px-4 py-3 hover:bg-surface-container transition-colors">
                      <Link href={`/briefing/${b.id}`} className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-on-surface truncate">{b.company_name}</p>
                        <p className="text-[12px] text-on-surface-variant">{formatDate(b.created_at)}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}

        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary-container flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[32px] text-on-secondary-container">description</span>
          </div>
          <h2 className="text-[24px] font-bold text-on-surface mb-2">Deine Briefings</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-sm">
            Wähle ein Briefing aus dem Verlauf oder erstelle ein neues.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#022448] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Neues Briefing erstellen
          </button>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-outline-variant/15" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[20px] font-bold text-on-surface mb-2">Neues Briefing</h3>
            <p className="text-sm text-on-surface-variant mb-6">Firmenname oder Website eingeben.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/50">search</span>
                <input
                  autoFocus
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-lg text-on-surface text-[15px] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="z.B. mueller-buero.de"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNewBriefing()}
                />
              </div>
              <button
                onClick={handleNewBriefing}
                className="text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' }}
              >
                Erstellen
              </button>
            </div>
            <button onClick={() => setModalOpen(false)} className="mt-4 text-xs text-on-surface-variant hover:text-on-surface transition-colors">
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
