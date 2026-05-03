'use client'

import { useRef } from 'react'
import Navbar from './Navbar'
import type { BriefingOutput } from '@/types'

interface BriefingCardProps {
  companyName: string
  output: BriefingOutput
}

const cardStyles = [
  {
    wrapper: 'hover:ring-blue-200 hover:shadow-[0_16px_48px_0_rgba(59,130,246,0.12)]',
    icon: 'bg-blue-100 text-blue-600',
    accent: 'text-blue-600',
  },
  {
    wrapper: 'hover:ring-emerald-200 hover:shadow-[0_16px_48px_0_rgba(16,185,129,0.12)]',
    icon: 'bg-emerald-100 text-emerald-600',
    accent: 'text-emerald-600',
  },
  {
    wrapper: 'hover:ring-violet-200 hover:shadow-[0_16px_48px_0_rgba(139,92,246,0.12)]',
    icon: 'bg-violet-100 text-violet-600',
    accent: 'text-violet-600',
  },
  {
    wrapper: 'hover:ring-amber-200 hover:shadow-[0_16px_48px_0_rgba(245,158,11,0.12)]',
    icon: 'bg-amber-100 text-amber-600',
    accent: 'text-amber-600',
  },
]

export default function BriefingCard({ companyName, output }: BriefingCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePdfExport = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    if (!contentRef.current) return
    html2pdf()
      .set({
        margin: 10,
        filename: `Briefing_${companyName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(contentRef.current)
      .save()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `Briefing: ${companyName}`, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const cardBase = 'bg-surface-container-lowest p-8 rounded-xl shadow-[0_10px_40px_0_rgba(26,28,30,0.04)] ring-1 ring-outline-variant/15 flex flex-col transition-all duration-200 hover:-translate-y-1 cursor-default'

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar variant="app" activeNav="briefings" onPdfExport={handlePdfExport} onShare={handleShare} />

      <main ref={contentRef} className="flex-grow max-w-5xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">
              BRIEFING ERGEBNIS
            </p>
            <h1 className="text-[32px] md:text-[56px] font-bold text-on-surface leading-[1.1] tracking-[-0.02em]">
              {companyName}
            </h1>
          </div>
          <div className="flex space-x-3 shrink-0">
            <button
              onClick={handlePdfExport}
              className="flex items-center space-x-2 bg-surface-container-highest hover:bg-surface-dim text-on-surface-variant px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Als PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-surface-container-highest hover:bg-surface-dim text-on-surface-variant px-4 py-2 rounded-md transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Teilen</span>
            </button>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Card 1: Gesprächseinstiege — Blau */}
          <div className={`${cardBase} ${cardStyles[0].wrapper}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${cardStyles[0].icon}`}>
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h2 className="text-[28px] font-bold text-on-surface">Gesprächseinstiege</h2>
            </div>
            <div className="space-y-6 flex-grow">
              {output.gesprachseinstiege.map((text, i) => (
                <div key={i} className="flex gap-4">
                  <span className={`font-bold text-lg shrink-0 ${cardStyles[0].accent}`}>{i + 1}.</span>
                  <p className="text-[16px] text-on-surface leading-[1.6]">&ldquo;{text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Wachstumssignale — Grün */}
          <div className={`${cardBase} ${cardStyles[1].wrapper}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${cardStyles[1].icon}`}>
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h2 className="text-[28px] font-bold text-on-surface">Wachstumssignale</h2>
            </div>
            <ul className="space-y-4 flex-grow">
              {output.wachstumssignale.map((signal, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`material-symbols-outlined mt-1 text-[20px] ${cardStyles[1].accent}`}>check_circle</span>
                  <span className="text-[16px] text-on-surface leading-[1.6]">
                    <strong>{signal.label}:</strong> {signal.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Firmenprofil — Violett */}
          <div className={`${cardBase} ${cardStyles[2].wrapper}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${cardStyles[2].icon}`}>
                <span className="material-symbols-outlined">business</span>
              </div>
              <h2 className="text-[28px] font-bold text-on-surface">Firmenprofil</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 flex-grow">
              {([
                ['BRANCHE', output.firmenprofil.branche],
                ['MITARBEITER', output.firmenprofil.mitarbeiter],
                ['STANDORTE', output.firmenprofil.standorte],
                ['GEGRÜNDET', output.firmenprofil.gegruendet],
              ] as [string, string | null][]).map(([label, value]) => (
                <div key={label}>
                  <p className="text-[12px] uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-1">
                    {label}
                  </p>
                  <p className="text-[16px] text-on-surface">{value ?? '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Aktuelle News — Amber */}
          <div className={`${cardBase} ${cardStyles[3].wrapper}`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${cardStyles[3].icon}`}>
                <span className="material-symbols-outlined">newspaper</span>
              </div>
              <h2 className="text-[28px] font-bold text-on-surface">Aktuelle News</h2>
            </div>
            <div className="space-y-6 flex-grow">
              {output.aktuelle_news.map((news, i) => (
                <div key={i}>
                  <p className={`text-[12px] uppercase tracking-[0.05em] font-semibold mb-1 ${cardStyles[3].accent}`}>
                    {news.datum}
                  </p>
                  <p className="text-[16px] text-on-surface leading-[1.6]">{news.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-outline-variant/15 w-full max-w-md">
          <p className="text-[16px] font-medium text-on-surface mb-4">War dieses Briefing hilfreich?</p>
          <div className="flex space-x-4">
            <button className="h-12 w-12 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest hover:text-primary transition-colors flex items-center justify-center focus:ring-2 focus:ring-primary/20 outline-none">
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button className="h-12 w-12 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest hover:text-error transition-colors flex items-center justify-center focus:ring-2 focus:ring-primary/20 outline-none">
              <span className="material-symbols-outlined">thumb_down</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
