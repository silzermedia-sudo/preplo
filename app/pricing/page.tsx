import Link from 'next/link'
import Navbar from '@/components/Navbar'

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'kostenlos',
    description: 'Für den Einstieg – teste Preplo ohne Risiko.',
    features: ['5 Briefings pro Monat', 'Basis-Firmenprofil', 'Gesprächseinstiege', 'Mobile Nutzung'],
    cta: 'Kostenlos starten',
    href: '/login',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '29',
    period: 'pro Monat',
    description: 'Für aktive Vertriebsmitarbeiter im Außendienst.',
    features: ['Unbegrenzte Briefings', 'Wachstumssignale & News', 'Erweiterte Firmenanalyse', 'PDF-Export', 'Prioritäts-Support'],
    cta: 'Pro starten',
    href: '/login',
    highlight: true,
  },
  {
    name: 'Team',
    price: 'Auf Anfrage',
    period: '',
    description: 'Für Vertriebsteams mit gemeinsamen Anforderungen.',
    features: ['Alles aus Pro', 'Teamverwaltung', 'CRM-Integration (coming soon)', 'Dedizierter Account Manager', 'SLA & Datenschutzvertrag'],
    cta: 'Kontakt aufnehmen',
    href: '#kontakt',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      <Navbar variant="landing" />

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold tracking-[0.05em] uppercase text-on-primary-fixed-variant mb-4">Preise</p>
            <h1 className="text-[40px] md:text-[52px] font-headline font-bold leading-[1.1] tracking-[-0.02em] text-on-surface mb-6">
              Einfache, transparente Preise.
            </h1>
            <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-on-surface-variant max-w-[50ch] mx-auto">
              Kein Kleingedrucktes. Starte kostenlos und wechsle, wenn du mehr brauchst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col border transition-shadow ${
                  plan.highlight
                    ? 'bg-primary text-on-primary border-primary shadow-[0_8px_32px_rgba(2,36,72,0.18)]'
                    : 'bg-surface-container-lowest border-outline-variant/15 hover:shadow-md'
                }`}
              >
                <div className="mb-6">
                  <p className={`text-[13px] font-bold tracking-[0.05em] uppercase mb-2 ${plan.highlight ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-2">
                    {plan.price === 'Auf Anfrage' ? (
                      <span className={`text-[28px] font-bold leading-none ${plan.highlight ? 'text-on-primary' : 'text-on-surface'}`}>
                        Auf Anfrage
                      </span>
                    ) : (
                      <>
                        {plan.price !== '0' && (
                          <span className={`text-[20px] font-medium leading-none ${plan.highlight ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>€</span>
                        )}
                        <span className={`text-[40px] font-bold leading-none ${plan.highlight ? 'text-on-primary' : 'text-on-surface'}`}>
                          {plan.price === '0' ? 'Gratis' : plan.price}
                        </span>
                        {plan.period && (
                          <span className={`text-[14px] mb-1 ${plan.highlight ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
                            /{plan.period}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className={`text-[14px] font-body leading-[1.5] ${plan.highlight ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px] font-body">
                      <span className={`material-symbols-outlined text-[18px] mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-on-primary/70' : 'text-primary'}`}>
                        check_circle
                      </span>
                      <span className={plan.highlight ? 'text-on-primary/80' : 'text-on-surface-variant'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <button
                    className={`w-full py-3 rounded-xl font-medium text-[15px] transition-all active:scale-95 ${
                      plan.highlight
                        ? 'bg-on-primary text-primary hover:opacity-90 shadow-md'
                        : 'bg-primary text-on-primary hover:opacity-90'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[14px] text-on-surface-variant mt-12">
            Alle Preise zzgl. MwSt. · Jederzeit kündbar · Fragen?{' '}
            <a href="mailto:hallo@preplo.de" className="text-primary hover:underline">
              hallo@preplo.de
            </a>
          </p>
        </div>
      </main>

      <footer className="bg-surface-container-low w-full py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-primary">Preplo</div>
          <div className="flex flex-wrap justify-center gap-6">
            {[['Impressum', '/impressum'], ['Datenschutz', '/datenschutz'], ['AGB', '/agb'], ['Support', '#']].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-on-surface/60 hover:text-primary hover:underline decoration-primary/30 underline-offset-4 transition-all duration-200 text-sm"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="text-on-surface/60 text-sm">© 2026 Preplo. Alle Rechte vorbehalten.</div>
        </div>
      </footer>
    </div>
  )
}
