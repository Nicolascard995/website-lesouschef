import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Gesetzlich vorgeschriebene Anbieterkennzeichnung gemäß § 5 DDG für dozo.tech.',
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />

      <main className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">

          {/* Eyebrow */}
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember mb-4">
            Rechtliches
          </p>

          <h1
            className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-16"
            style={{ fontVariantLigatures: 'none' }}
          >
            Impressum
          </h1>

          {/* ── § 5 DDG ── */}
          <Section label="Angaben gemäß § 5 DDG">
            <dl className="grid gap-3">
              <Row term="Inhaber"        def="Nicolás Alejandro Cardozo" />
              <Row term="Handelsname"    def="Dozo Tech" />
              <Row term="Rechtsform"     def="Einzelunternehmen (Gewerbe)" />
              <Row term="Anschrift"      def="Marcus-Heinemann-Straße 17, 21337 Lüneburg, Deutschland" />
              <Row term="Telefon"        def="+49 176 21508675" />
              <Row term="E-Mail">
                <span className="flex flex-col gap-1">
                  <a
                    href="mailto:contact@dozo.tech"
                    className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                  >
                    contact@dozo.tech
                  </a>
                  <a
                    href="mailto:contact@lesouschef.com"
                    className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                  >
                    contact@lesouschef.com
                  </a>
                </span>
              </Row>
              <Row term="Website"        def="dozo.tech" />
            </dl>
          </Section>

          {/* ── Steuer ── */}
          <Section label="Steuerliche Angaben">
            <dl className="grid gap-3">
              <Row
                term="Umsatzsteuer-Identifikationsnummer"
                def="DE458014318"
                note="gemäß § 27a Umsatzsteuergesetz"
              />
              <Row term="Finanzamt" def="Finanzamt Lüneburg" />
            </dl>
          </Section>

          {/* ── Register ── */}
          <Section label="Gewerbliche Registrierung">
            <dl className="grid gap-3">
              <Row term="Gewerbe-Aktenzeichen"  def="32 90 22 – 554/2025" />
              <Row term="IHK-Mitgliedsnummer"   def="1207839" />
              <Row
                term="Unternehmensgegenstand"
                def="Handel mit Software, Beratung, Gastronomie-Webseiten"
              />
            </dl>
          </Section>

          {/* ── Verantwortlich für den Inhalt ── */}
          <Section label="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <address className="not-italic text-ink-mid leading-relaxed">
              Nicolás Alejandro Cardozo<br />
              Marcus-Heinemann-Straße 17<br />
              21337 Lüneburg<br />
              Deutschland
            </address>
          </Section>

          {/* ── Haftungsausschluss ── */}
          <Section label="Haftungsausschluss">
            <div className="space-y-6 text-ink-mid leading-relaxed">
              <div>
                <h3 className="font-body font-medium text-ink mb-2">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
                  Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
                  jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1
                  DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                  oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach
                  den allgemeinen Gesetzen bleiben hiervon unberührt.
                </p>
              </div>
              <div>
                <h3 className="font-body font-medium text-ink mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                  zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                  Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                  inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </div>
            </div>
          </Section>

          {/* ── Urheberrecht ── */}
          <Section label="Urheberrecht" last>
            <p className="text-ink-mid leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
              Gebrauch gestattet.
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </>
  );
}

/* ── Sub-components ── */

function Section({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`${last ? '' : 'mb-14 pb-14 border-b border-cream-dark'}`}>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted mb-5">
        {label}
      </h2>
      {children}
    </section>
  );
}

function Row({
  term,
  def,
  note,
  children,
}: {
  term: string;
  def?: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 items-baseline text-sm">
      <dt className="text-ink-muted font-mono text-xs uppercase tracking-wider">{term}</dt>
      <dd className="text-ink-mid">
        {children ?? def}
        {note && (
          <span className="block text-ink-muted text-xs mt-0.5">{note}</span>
        )}
      </dd>
    </div>
  );
}
