'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from './Navbar'

export default function LandingPage() {
  const [company, setCompany] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (company.trim()) {
      router.push(`/loading-screen?company=${encodeURIComponent(company.trim())}`)
    }
  }

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      <Navbar variant="landing" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Hero */}
        <div className="w-full max-w-4xl mx-auto text-center mb-16">
          <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-primary-fixed-variant mb-6">
            DIE ZUKUNFT DER VORBEREITUNG
          </p>
          <h1 className="text-[40px] md:text-[56px] font-headline font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-8">
            In 60 Sekunden vorbereitet für jeden Kundenbesuch.
          </h1>
          <p className="text-[16px] md:text-[18px] font-body leading-[1.6] text-on-surface-variant max-w-[60ch] mx-auto mb-12">
            Firmenname eingeben. KI recherchiert. Du gehst vorbereitet rein.
          </p>

          {/* Suchfeld */}
          <div className="w-full max-w-[600px] mx-auto bg-surface-container-lowest p-2 rounded-xl shadow-[0_10px_40px_rgba(26,28,30,0.04)] border border-outline-variant/15 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/50">search</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body text-[16px] py-4 pl-12 pr-4 placeholder:text-on-surface-variant/40 rounded-lg outline-none"
                placeholder="Firmenname oder Website, z.B. mueller-buero.de"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap shadow-[0_4px_14px_rgba(2,36,72,0.1)]"
            >
              Briefing erstellen
            </button>
          </div>
        </div>

        {/* Demo-Vorschau Bento Grid */}
        <div className="w-full max-w-5xl mx-auto bg-surface-container-low rounded-[24px] p-8 md:p-12 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-headline font-bold text-on-surface">
              Vorschau – Mustermann Bürotechnik GmbH
            </h2>
            <span className="bg-secondary-container text-on-secondary-container text-[12px] font-bold tracking-[0.05em] uppercase px-3 py-1 rounded-full">
              Demo-Vorschau
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Widget 1: Gesprächseinstiege — Blau */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.12)] hover:ring-1 hover:ring-blue-200 cursor-default">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-blue-500 text-[20px]">chat_bubble</span>
                Gesprächseinstiege
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  'Gratulation zum "Top Arbeitgeber" Award 2024.',
                  'Nachfragen zum neuen Standort in Stuttgart.',
                  'Erwähnen des kürzlich abgeschlossenen HP-Deals.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-400 text-[16px] mt-1">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 2: Wachstumssignale — Grün */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(16,185,129,0.12)] hover:ring-1 hover:ring-emerald-200 cursor-default">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-emerald-500 text-[20px]">trending_up</span>
                Wachstumssignale
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  '5 offene Stellen im Vertrieb (Wachstum).',
                  'Eröffnung eines neuen Büros in Stuttgart.',
                  'Umsatzwachstum im Bereich IT-Infrastruktur.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px] mt-1">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Firmenprofil — Violett */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(139,92,246,0.12)] hover:ring-1 hover:ring-violet-200 cursor-default">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-violet-500 text-[20px]">business</span>
                Firmenprofil
              </h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[14px] font-body">
                {[
                  ['Branche:', 'Bürotechnik & IT'],
                  ['Mitarbeiter:', '150 - 200'],
                  ['Standorte:', 'München, Stuttgart'],
                  ['Gegründet:', '1998'],
                ].map(([label, value]) => (
                  <div key={label} className="contents">
                    <div className="text-on-surface-variant/70">{label}</div>
                    <div className="text-on-surface font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 4: Aktuelle News — Amber */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(245,158,11,0.12)] hover:ring-1 hover:ring-amber-200 cursor-default">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-amber-500 text-[20px]">newspaper</span>
                Aktuelle News
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  'Auszeichnung als "Top Arbeitgeber" (Vor 2 Wochen)',
                  'Neue Partnerschaft mit HP Enterprise (Vor 1 Monat)',
                  'Umzug in ein größeres Büro in München (Vor 3 Monaten)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-amber-400 text-[16px] mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Row */}
        <div className="w-full max-w-4xl mx-auto mt-24 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
            {[
              { icon: 'timer', title: '60 Sekunden', sub: 'Schnell und effizient' },
              { icon: 'target', title: 'Individuell', sub: 'Auf den Kunden zugeschnitten' },
              { icon: 'smartphone', title: 'Mobil nutzbar', sub: 'Von überall erreichbar' },
            ].map(({ icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center pt-8 md:pt-0">
                <span className="material-symbols-outlined text-[32px] text-primary mb-4">{icon}</span>
                <h4 className="text-[16px] font-bold text-on-surface">{title}</h4>
                <p className="text-[14px] text-on-surface-variant mt-2">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full py-16 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-primary">Preplo</div>
          <div className="flex flex-wrap justify-center gap-6">
            {[['Impressum', '/impressum'], ['Datenschutz', '/datenschutz'], ['AGB', '/agb'], ['Support', '#']].map(
              ([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-on-surface/60 hover:text-primary hover:underline decoration-primary/30 underline-offset-4 transition-all duration-200 text-sm"
                >
                  {label}
                </Link>
              )
            )}
          </div>
          <div className="text-on-surface/60 text-sm">© 2026 Preplo. Alle Rechte vorbehalten.</div>
        </div>
      </footer>
    </div>
  )
}
