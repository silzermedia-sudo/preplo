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
            {/* Widget 1: Gesprächseinstiege */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">chat_bubble</span>
                Gesprächseinstiege
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  'Gratulation zum "Top Arbeitgeber" Award 2024.',
                  'Nachfragen zum neuen Standort in Stuttgart.',
                  'Erwähnen des kürzlich abgeschlossenen HP-Deals.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary/60 text-[16px] mt-1">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 2: Wachstumssignale */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                Wachstumssignale
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  '5 offene Stellen im Vertrieb (Wachstum).',
                  'Eröffnung eines neuen Büros in Stuttgart.',
                  'Umsatzwachstum im Bereich IT-Infrastruktur.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary/60 text-[16px] mt-1">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widget 3: Firmenprofil */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">business</span>
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

            {/* Widget 4: Aktuelle News */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-on-surface mb-4">
                <span className="material-symbols-outlined text-primary text-[20px]">newspaper</span>
                Aktuelle News
              </h3>
              <ul className="space-y-3 text-[14px] text-on-surface-variant font-body leading-[1.6]">
                {[
                  'Auszeichnung als "Top Arbeitgeber" (Vor 2 Wochen)',
                  'Neue Partnerschaft mit HP Enterprise (Vor 1 Monat)',
                  'Umzug in ein größeres Büro in München (Vor 3 Monaten)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary/60 text-[16px] mt-0.5">•</span>
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

      {/* Problemlösung */}
      <section id="problem" className="w-full bg-surface-container-low py-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-primary-fixed-variant mb-4">Das Problem</p>
            <h2 className="text-[36px] md:text-[44px] font-headline font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-6">
              Vertrieb hat keine Zeit für lange Vorbereitung.
            </h2>
            <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-on-surface-variant">
              Zwischen zwei Terminen schnell noch den nächsten Kunden recherchieren? Keine Zeit. Mehrere Kundengespräche pro Tag, wechselnde Ansprechpartner, kaum Puffer zwischen den Besuchen – gute Vorbereitung bleibt oft auf der Strecke. Das Ergebnis: generische Gespräche, verpasste Chancen, weniger Abschlüsse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: 'schedule',
                title: 'Zu wenig Zeit',
                text: 'Vertriebsmitarbeiter verbringen im Schnitt nur wenige Minuten mit der Vorbereitung auf einen Kundenbesuch – meistens unterwegs.',
              },
              {
                icon: 'search_off',
                title: 'Verstreute Infos',
                text: 'Relevante Informationen sind über Website, LinkedIn, News und CRM verteilt. Alles manuell zusammenzusuchen dauert viel zu lang.',
              },
              {
                icon: 'trending_down',
                title: 'Verpasste Chancen',
                text: 'Wer unvorbereitet ins Gespräch geht, wirkt wenig professionell und lässt wertvolle Gesprächseinstiege und Cross-Sell-Potenziale liegen.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/15">
                <span className="material-symbols-outlined text-[32px] text-primary mb-4 block">{icon}</span>
                <h3 className="text-[16px] font-bold text-on-surface mb-2">{title}</h3>
                <p className="text-[14px] text-on-surface-variant font-body leading-[1.6]">{text}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-[24px] font-headline font-bold text-on-primary mb-4">Preplo löst genau das.</h3>
              <p className="text-[16px] font-body leading-[1.7] text-on-primary/80">
                Firmenname eingeben – fertig. Preplo recherchiert in Sekunden alle relevanten Informationen und liefert ein strukturiertes Briefing direkt aufs Handy. So gehst du immer vorbereitet rein, egal wie eng der Terminkalender ist.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="bg-on-primary/10 rounded-xl px-8 py-6 text-center">
                <span className="text-[48px] font-bold text-on-primary">60s</span>
                <p className="text-on-primary/70 text-[14px] mt-1">Vorbereitung statt 30 Minuten</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section id="ueber-uns" className="w-full bg-surface py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-primary-fixed-variant mb-4">Wer wir sind</p>
          <h2 className="text-[36px] md:text-[44px] font-headline font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-8">
            Über uns
          </h2>
          <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-on-surface-variant mb-6">
            Wir sind ein kleines Team mit einem klaren Ziel: Vertriebsmitarbeitern das Leben leichter machen. Wir kennen den Alltag im Außendienst – voller Termine, wenig Zeit, hohe Erwartungen. Mit Preplo wollen wir dafür sorgen, dass jeder Kundenbesuch so gut vorbereitet ist wie möglich, ohne großen Aufwand.
          </p>
          <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-on-surface-variant">
            Unsere KI kombiniert öffentliche Informationen zu einem kompakten Briefing – damit du dich auf das Gespräch konzentrieren kannst, nicht auf die Recherche.
          </p>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="w-full bg-surface-container-low py-24">
        <div className="max-w-xl mx-auto px-8 text-center">
          <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-primary-fixed-variant mb-4">Schreib uns</p>
          <h2 className="text-[36px] md:text-[44px] font-headline font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-6">
            Kontakt
          </h2>
          <p className="text-[16px] font-body leading-[1.7] text-on-surface-variant mb-10">
            Fragen, Feedback oder Kooperationsanfragen? Wir freuen uns von dir zu hören.
          </p>
          <a
            href="mailto:hallo@preplo.de"
            className="inline-block bg-primary text-on-primary px-8 py-4 rounded-xl font-medium text-[16px] hover:opacity-90 transition-opacity active:scale-95 shadow-[0_4px_14px_rgba(2,36,72,0.12)]"
          >
            hallo@preplo.de
          </a>
        </div>
      </section>

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
