import Link from 'next/link'

export default function AgbPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <nav className="bg-surface/70 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Preplo</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-[15px] leading-relaxed text-on-surface-variant">
        <h1 className="text-[32px] font-bold text-on-surface">Allgemeine Geschäftsbedingungen</h1>
        <p>Stand: April 2026</p>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 1 Geltungsbereich</h2>
          <p>Diese AGB gelten für alle Verträge zwischen Preplo ([Betreiber]) und Nutzern des Dienstes preplo.de.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 2 Leistungsumfang</h2>
          <p>Preplo bietet eine KI-gestützte Plattform zur automatisierten Erstellung von Verkaufs-Briefings. Der Dienst wird in drei Tarifen angeboten:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-on-surface">Free:</strong> 3 Briefings/Monat, kostenlos</li>
            <li><strong className="text-on-surface">Pro:</strong> Unlimitierte Briefings, PDF-Export – 29 EUR/Monat</li>
            <li><strong className="text-on-surface">Team:</strong> Alle Pro-Features + 5 Nutzer + Teilen – 79 EUR/Monat</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 3 Vertragsschluss & Zahlung</h2>
          <p>Abonnements werden monatlich über Stripe abgerechnet. Preise verstehen sich zzgl. gesetzlicher MwSt. Die Zahlung erfolgt monatlich im Voraus.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 4 Widerrufsrecht</h2>
          <p>Bei digitalen Inhalten beginnt das 14-tägige Widerrufsrecht ab Vertragsschluss. Da die Leistung sofort beginnt, erlischt das Widerrufsrecht mit Nutzungsbeginn, sofern der Nutzer ausdrücklich zugestimmt hat.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 5 Kündigung</h2>
          <p>Abonnements können jederzeit zum Ende der laufenden Abrechnungsperiode gekündigt werden. Nach Kündigung wird das Konto auf den Free-Plan zurückgestuft.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 6 Haftungsbeschränkung</h2>
          <p>Die durch Preplo generierten Briefings basieren auf öffentlich verfügbaren Informationen. Preplo übernimmt keine Garantie für Vollständigkeit oder Aktualität der KI-Ausgaben. Eine Haftung für wirtschaftliche Entscheidungen, die auf Basis der Briefings getroffen werden, ist ausgeschlossen.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[18px] font-semibold text-on-surface">§ 7 Anwendbares Recht</h2>
          <p>Es gilt deutsches Recht. Gerichtsstand ist der Sitz des Betreibers.</p>
        </section>

        <div className="mt-12 pt-8 border-t border-outline-variant/15">
          <Link href="/" className="text-sm text-primary hover:underline">← Zurück zur Startseite</Link>
        </div>
      </main>
    </div>
  )
}
