'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className="bg-surface text-on-surface antialiased">
      <Navbar variant="landing" />

      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-primary mb-6 block">
              DIE ZUKUNFT DER VORBEREITUNG
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-on-surface tracking-[-0.02em] leading-[1.1] mb-8">
              In 60 Sekunden vorbereitet für jeden Kundenbesuch.
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-[60ch] mb-12">
              Firmenname eingeben. KI recherchiert. Du gehst vorbereitet rein.
            </p>
            <div className="w-full max-w-[600px] bg-surface-container-lowest p-2 rounded-xl shadow-[0_10px_40px_rgba(26,28,30,0.04)] border border-outline-variant/15 flex flex-col sm:flex-row gap-2 mb-8">
              <div className="relative flex-grow flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/50">search</span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface text-[16px] py-4 pl-12 pr-4 placeholder:text-on-surface-variant/40 rounded-lg outline-none"
                  placeholder="Firmenname oder Website, z.B. mueller-buero.de"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="text-white px-8 py-4 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity active:scale-95 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' }}
              >
                Briefing erstellen
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl relative border border-outline-variant/10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFvW_m-DNGG1XsSVXfdif3FKX7kQCujOA4dkKw1BtxW_Tv4x9-WORrCQfb0Xiup8CD0t29oN-Se3NA-bgb9AyJlEi_--y73yeeE2gb0trlyfktjOCRg-seOirVa9AGOttS-d2TtFTpE0KHU6gJ3tQm7ivwf4sLnb7R0VGrjuCl8EB2aiY5N8J7JYp-cswOh4c2z9DT0AQwCvGGqODcVEcf0quOsO5Ro_e0TOXe_uPCndXbvNz5mCgrpDJLHYwcmnshMbGR-ZxzJBg"
                alt="Professional office"
                fill
                className="object-cover grayscale-[0.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-surface/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4 mb-2">
                  <span className="material-symbols-outlined text-primary">speed</span>
                  <span className="font-bold text-primary">60s Briefing-Generator</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Problemlösung */}
      <section id="problemloesung" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-primary mb-4 block">PROBLEMLÖSUNG</span>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Präzision statt Datenchaos.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[600px]">
            <div className="md:col-span-8 bg-surface-container-low rounded-2xl p-10 flex flex-col justify-between group overflow-hidden relative hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="z-10">
                <h3 className="text-2xl font-bold mb-4">Intelligente Datenextraktion</h3>
                <p className="text-on-surface-variant max-w-md">Unser Algorithmus durchsucht Geschäftsberichte, News-Feeds und Social Media, um die relevantesten Pain Points Ihrer Leads zu identifizieren.</p>
              </div>
              <div className="mt-8 z-10">
                <button onClick={handleSubmit} className="flex items-center gap-2 font-semibold text-primary">
                  Jetzt ausprobieren <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </div>
            <div
              className="md:col-span-4 rounded-2xl p-10 text-white flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' }}
            >
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <div>
                <h3 className="text-2xl font-bold mb-4">One-Click Briefings</h3>
                <p className="opacity-80">Vollständige Vorbereitung für jeden Kundentermin — direkt im Browser.</p>
              </div>
            </div>
            <div className="md:col-span-4 bg-surface-container-highest rounded-2xl p-10 flex flex-col justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-xl font-bold mb-2">100% DSGVO-konform</h3>
              <p className="text-sm text-on-surface-variant">Gehostet in Frankfurt, nach höchsten Sicherheitsstandards für B2B-Kunden.</p>
            </div>
            <div className="md:col-span-8 border border-outline-variant/30 rounded-2xl p-10 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-fixed">integration_instructions</span>
                </div>
                <div>
                  <h3 className="font-bold">Nahtlose Integration</h3>
                  <p className="text-sm text-on-surface-variant">HubSpot, Salesforce, Pipedrive.</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">link</span>
            </div>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section id="ueber-uns" className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-square bg-surface rounded-2xl shadow-xl overflow-hidden relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKseYPLXlooBi_IY26AC16vkI1Awf22gHjDAXzy-1t8BXHQW7hR_7djQq-wCEISRJVPlSrjYN7Sd-a4zwZuUvM4QI6amefRRItuVDD-oxd2mP_BRn6G_Rb9d80APGQSCWXfxwvx3dNKkyOI84We_haN_h1ZqQEoga4wScwiuzWIYeKdy8Hjuni3gg7nZb2iKfYsur6ULXRE33_KlWuCbEM0WyKlwBP8EadMUqfkNlxqzvKQpsFq5LXeDxRTRPf_jcL1X-gyLPHRAY"
                  alt="Über uns"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-8 -right-8 p-8 rounded-2xl shadow-2xl hidden md:block text-white"
                style={{ background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' }}
              >
                <p className="text-lg italic max-w-[20ch]">"Klarheit ist die neue Währung im digitalen Vertrieb."</p>
              </div>
            </div>
            <div>
              <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-primary mb-6 block">UNSERE MISSION</span>
              <h2 className="text-4xl font-bold mb-8 tracking-tight">Gebaut von Vertrieb, für Vertrieb.</h2>
              <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
                <p>Preplo entstand aus einer einfachen Frustration: zu viele Kundentermine, zu wenig Zeit für Vorbereitung. Wir haben ein Tool gebaut, das genau das löst – schnell, präzise, ohne Overhead.</p>
                <p>Unser Fokus liegt auf dem deutschsprachigen Bürofachhandel und B2B-Vertrieb. Wir strukturieren Komplexität und liefern genau die Erkenntnisse, die den Unterschied machen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Sprechen wir über Ihre Sales-Performance.</h2>
              <p className="text-lg text-on-surface-variant mb-12">
                Fragen, Feedback oder Interesse an einer Team-Lizenz? Wir antworten schnell.
              </p>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary bg-surface-container-low p-3 rounded-xl shadow-sm">mail</span>
                  <div>
                    <h4 className="font-bold">E-Mail Kontakt</h4>
                    <p className="text-on-surface-variant">info@preplo.de</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low p-10 rounded-2xl shadow-xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-60">Vorname</label>
                    <input className="w-full bg-surface border border-outline-variant/20 rounded-lg p-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-60">Nachname</label>
                    <input className="w-full bg-surface border border-outline-variant/20 rounded-lg p-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all" type="text" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Unternehmen</label>
                  <input className="w-full bg-surface border border-outline-variant/20 rounded-lg p-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-60">Nachricht</label>
                  <textarea className="w-full bg-surface border border-outline-variant/20 rounded-lg p-4 focus:ring-2 focus:ring-primary/40 outline-none transition-all" rows={4} />
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-4 rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' }}
                >
                  Anfrage senden
                </button>
                <p className="text-[10px] text-center text-on-surface-variant">
                  Mit dem Absenden stimmen Sie unseren <Link href="/datenschutz" className="underline">Datenschutzbestimmungen</Link> zu.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <span className="text-[12px] uppercase tracking-[0.2em] font-bold text-primary mb-4 block">PREISGESTALTUNG</span>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Einfach. Transparent.</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Kein Abo-Dschungel. Starte kostenlos, upgrade wenn du bereit bist.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {[
              {
                name: 'Free',
                price: '0 €',
                period: 'für immer',
                desc: 'Zum Ausprobieren – keine Kreditkarte nötig.',
                features: ['3 Briefings pro Monat', 'Alle KI-Felder', 'Kein Risiko'],
                cta: 'Kostenlos starten',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '29 €',
                period: '/ Monat',
                desc: 'Für aktive Vertriebsmitarbeiter.',
                features: ['Unlimitierte Briefings', 'PDF-Export', 'Priority Support'],
                cta: 'Pro starten',
                highlight: true,
              },
              {
                name: 'Team',
                price: '79 €',
                period: '/ Monat',
                desc: 'Für wachsende Vertriebsteams.',
                features: ['Alles aus Pro', '5 Nutzer inklusive', 'Briefings teilen'],
                cta: 'Team starten',
                highlight: false,
              },
            ].map(({ name, price, period, desc, features, cta, highlight }) => (
              <div
                key={name}
                className={`p-10 rounded-2xl flex flex-col transition-all relative ${
                  highlight
                    ? 'bg-surface border-2 border-primary shadow-xl lg:scale-105'
                    : 'bg-surface border border-outline-variant/20 hover:border-primary/30'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                    Meistgewählt
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{name}</h3>
                  <div className="text-4xl font-bold mb-1">
                    {price} <span className="text-lg font-normal text-on-surface-variant">{period}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{desc}</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all active:scale-95 ${
                      highlight
                        ? 'text-white shadow-lg hover:opacity-90'
                        : 'border border-primary text-primary hover:bg-primary-fixed'
                    }`}
                    style={highlight ? { background: 'linear-gradient(135deg, #022448 0%, #1e3a5f 100%)' } : undefined}
                  >
                    {cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <div className="font-bold text-lg text-primary">Preplo</div>
            <p className="text-sm text-on-surface/60">© 2026 Preplo. Alle Rechte vorbehalten.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[['Impressum', '/impressum'], ['Datenschutz', '/datenschutz'], ['AGB', '/agb'], ['Support', '#']].map(([label, href]) => (
              <Link key={label} href={href} className="text-sm text-on-surface/60 hover:text-primary underline-offset-4 hover:underline transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
