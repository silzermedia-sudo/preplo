import Link from 'next/link'

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <nav className="bg-surface/70 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Preplo</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
        <h1 className="text-[32px] font-bold text-on-surface">Datenschutzerklärung</h1>
        <p>Stand: April 2026</p>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">1. Verantwortlicher</h2>
          <p>Preplo, [Name], [Adresse], E-Mail: datenschutz@preplo.de</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">2. Welche Daten wir speichern</h2>
          <p><strong className="text-on-surface">Gespeichert:</strong> E-Mail-Adresse (Auth), Plan-Status (free/pro/team), Briefing-Ergebnisse (öffentliche Firmendaten), Nutzungs-Zähler, Stripe Customer ID.</p>
          <p><strong className="text-on-surface">Nicht gespeichert:</strong> Kreditkartendaten, IP-Adressen, Tracking-Cookies ohne Einwilligung, personenbezogene Daten aus Briefings.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">3. Hosting & Infrastruktur</h2>
          <p><strong className="text-on-surface">Hosting:</strong> Vercel Inc., USA – Datenübertragung auf Basis von Standardvertragsklauseln gem. Art. 46 DSGVO.</p>
          <p><strong className="text-on-surface">Datenbank:</strong> Supabase, EU-Region Frankfurt (Deutschland) – personenbezogene Daten: E-Mail, Plan.</p>
          <p><strong className="text-on-surface">Zahlungsabwicklung:</strong> Stripe Inc. – keine Zahlungsdaten werden von Preplo gespeichert.</p>
          <p><strong className="text-on-surface">KI-Verarbeitung:</strong> Anthropic API – es werden ausschließlich öffentliche Firmennamen/URLs übermittelt, keine personenbezogenen Daten.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">4. Rechtsgrundlagen</h2>
          <p>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO) für Account- und Abrechnungsdaten. Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) für Nutzungsstatistiken.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">5. Speicherdauer</h2>
          <p>Account-Daten: bis zur Kontoauflösung. Briefings: bis zur Löschung durch den Nutzer. Stripe-Daten: gemäß Stripe-Richtlinien.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">6. Deine Rechte (Art. 15–21 DSGVO)</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Auskunft über gespeicherte Daten (Art. 15)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16)</li>
            <li>Löschung deiner Daten (Art. 17) – über Account-Einstellungen</li>
            <li>Datenexport (Art. 20) – als JSON-Download verfügbar</li>
            <li>Widerspruch gegen Verarbeitung (Art. 21)</li>
          </ul>
          <p>Anfragen an: <a href="mailto:datenschutz@preplo.de" className="text-primary hover:underline">datenschutz@preplo.de</a></p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">7. Cookies</h2>
          <p>Technisch notwendige Cookies: Supabase Auth Session, Stripe Session – keine Einwilligung erforderlich. Optionale Analyse-Cookies werden nur bei ausdrücklicher Zustimmung gesetzt.</p>
        </section>

        <div className="mt-12 pt-8 border-t border-outline-variant/15">
          <Link href="/" className="text-sm text-primary hover:underline">← Zurück zur Startseite</Link>
        </div>
      </main>
    </div>
  )
}
