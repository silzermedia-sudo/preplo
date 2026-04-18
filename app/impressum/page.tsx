import Link from 'next/link'

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <nav className="bg-surface/70 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">Preplo</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-[32px] font-bold text-on-surface mb-8">Impressum</h1>
        <div className="prose prose-sm text-on-surface-variant space-y-6 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-semibold text-on-surface mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Preplo<br />
              [Vorname Nachname]<br />
              [Straße Hausnummer]<br />
              [PLZ Ort]<br />
              Deutschland
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-semibold text-on-surface mb-2">Kontakt</h2>
            <p>
              E-Mail: <a href="mailto:info@preplo.de" className="text-primary hover:underline">info@preplo.de</a>
            </p>
          </section>
          <section>
            <h2 className="text-[18px] font-semibold text-on-surface mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>[Vorname Nachname], [Adresse wie oben]</p>
          </section>
          <section>
            <h2 className="text-[18px] font-semibold text-on-surface mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
              und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>
        </div>
        <div className="mt-12 pt-8 border-t border-outline-variant/15">
          <Link href="/" className="text-sm text-primary hover:underline">← Zurück zur Startseite</Link>
        </div>
      </main>
    </div>
  )
}
