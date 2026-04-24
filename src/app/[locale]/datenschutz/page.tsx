import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung gemäß DSGVO für lesouschef.com — Anbieter: Dozo Tech, Einzelunternehmen von Nicolás Alejandro Cardozo, Lüneburg.',
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />

      <main className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember mb-4">
            Rechtliches
          </p>

          <h1
            className="font-display text-4xl md:text-5xl font-light text-ink leading-tight mb-4"
            style={{ fontVariantLigatures: 'none' }}
          >
            Datenschutzerklärung
          </h1>

          <p className="text-ink-muted font-mono text-[11px] uppercase tracking-wider mb-16">
            Stand: April 2026 — lesouschef.com
          </p>

          {/* ── 1. Verantwortlicher ── */}
          <Section num="1" label="Verantwortlicher">
            <p className="text-ink-mid leading-relaxed mb-4">
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) für
              das Angebot unter lesouschef.com ist:
            </p>
            <address className="not-italic text-ink-mid leading-loose pl-4 border-l-2 border-cream-dark">
              Nicolás Alejandro Cardozo<br />
              Handelsname: Dozo Tech (Marke: LeSousChef)<br />
              Rechtsform: Einzelunternehmen<br />
              Marcus-Heinemann-Straße 17<br />
              21337 Lüneburg, Deutschland<br />
              Telefon: +49 176 21508675<br />
              E-Mail:{' '}
              <a
                href="mailto:contact@lesouschef.com"
                className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
              >
                contact@lesouschef.com
              </a>
            </address>
          </Section>

          {/* ── 2. Allgemeines ── */}
          <Section num="2" label="Allgemeines zur Datenverarbeitung">
            <p className="text-ink-mid leading-relaxed">
              lesouschef.com ist ein digitales Angebot von Dozo Tech für den
              Gastronomie- und Hospitality-Sektor. Wir verarbeiten personenbezogene
              Daten ausschließlich auf der Grundlage der geltenden
              datenschutzrechtlichen Bestimmungen, insbesondere der DSGVO. Die
              Verarbeitung erfolgt nur, soweit eine Rechtsgrundlage nach Art. 6 DSGVO
              vorliegt oder eine ausdrückliche Einwilligung erteilt wurde.
            </p>
          </Section>

          {/* ── 3. Hosting (Vercel) ── */}
          <Section num="3" label="Hosting">
            <p className="text-ink-mid leading-relaxed mb-4">
              Diese Website wird gehostet bei:
            </p>
            <p className="text-ink-mid leading-relaxed pl-4 border-l-2 border-cream-dark mb-4">
              Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
            </p>
            <p className="text-ink-mid leading-relaxed mb-3">
              Bei jedem Seitenaufruf werden automatisch technische Verbindungsdaten
              (IP-Adresse, Browser-Kennung, Betriebssystem, Datum und Uhrzeit des
              Zugriffs, aufgerufene Seite) in Server-Logs von Vercel erfasst. Diese
              Verarbeitung ist für den technischen Betrieb der Website erforderlich.
            </p>
            <dl className="grid gap-2 mt-4">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren und
                stabilen Betrieb der Website
              </InfoRow>
              <InfoRow term="Drittlandübermittlung">
                Vercel ist ein US-amerikanisches Unternehmen. Die Datenübermittlung
                in die USA erfolgt auf Grundlage von Standardvertragsklauseln (SCCs)
                gemäß Art. 46 Abs. 2 lit. c DSGVO.
              </InfoRow>
              <InfoRow term="Datenschutzerklärung Vercel">
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                >
                  vercel.com/legal/privacy-policy
                </a>
              </InfoRow>
            </dl>
          </Section>

          {/* ── 4. Kontaktaufnahme ── */}
          <Section num="4" label="Kontaktaufnahme per E-Mail">
            <p className="text-ink-mid leading-relaxed mb-3">
              Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen übermittelten
              Daten (Name, E-Mail-Adresse, Nachrichteninhalt) zur Bearbeitung Ihrer
              Anfrage gespeichert. Eine Weitergabe an Dritte findet ohne Ihre
              Einwilligung nicht statt.
            </p>
            <dl className="grid gap-2 mt-4">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung oder -erfüllung) bzw.
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                Beantwortung von Anfragen)
              </InfoRow>
              <InfoRow term="Speicherdauer">
                Bis zur abschließenden Bearbeitung der Anfrage, danach nach
                gesetzlichen Aufbewahrungsfristen
              </InfoRow>
            </dl>
          </Section>

          {/* ── 5. Formulare & Lead-Erfassung ── */}
          <Section num="5" label="Formulare und Lead-Erfassung">
            <p className="text-ink-mid leading-relaxed mb-6">
              Auf dieser Website werden verschiedene interaktive Formulare eingesetzt,
              über die personenbezogene Daten erhoben werden. Die Angabe von Daten
              ist freiwillig. Durch Absenden eines Formulars willigen Sie in die
              Verarbeitung ein.
            </p>

            <div className="space-y-8">
              <FormBlock
                title="a) Warteliste (Waitlist)"
                fields={['Vorname und Name', 'Name des Restaurants', 'Rolle im Betrieb', 'E-Mail-Adresse']}
                purpose="Benachrichtigung über den Produktlaunch von LeSousChef."
                legal="Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)"
              />

              <FormBlock
                title="b) Diagnose-Tool"
                fields={['E-Mail-Adresse', 'Antwortverlauf der Diagnose (Punktzahl 0–20, identifizierte Schwachstellen)']}
                purpose="Zustellung des personalisierten Diagnose-Ergebnisses per E-Mail."
                legal="Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)"
              />

              <FormBlock
                title="c) Kontaktqualifizierung"
                fields={['Name', 'E-Mail-Adresse', 'Telefonnummer', 'Unternehmensname', 'Rolle', 'Umsatzklasse', 'Hauptproblem']}
                purpose="Qualifizierung für ein persönliches Beratungsgespräch oder eine Produkt-Demo."
                legal="Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)"
              />

              <FormBlock
                title="d) Kostenschutz-Rechner"
                fields={['Name', 'Stadt', 'Durchschnittlicher Bon (€)', 'Anzahl der No-Shows pro Woche', 'E-Mail-Adresse']}
                purpose="Übermittlung der berechneten Verlustprognose und Folgekommunikation."
                legal="Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)"
              />

              <FormBlock
                title="e) Radar-Quiz"
                fields={['Name', 'E-Mail-Adresse', 'Quizantworten (5 Fragen, binär)']}
                purpose="Übermittlung des Quizergebnisses und optionale Folgekommunikation."
                legal="Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)"
              />
            </div>

            <div className="mt-8 p-4 bg-cream-dark rounded-[3px]">
              <p className="text-ink-mid text-sm leading-relaxed">
                <span className="font-mono text-xs uppercase text-ink-muted tracking-wider block mb-2">
                  Datenbankhosting
                </span>
                Alle Formulardaten werden in einer PostgreSQL-Datenbank bei{' '}
                <strong className="text-ink font-medium">Neon Inc.</strong> (USA),
                Datenbankregion eu-central-1 (AWS Frankfurt, Deutschland) gespeichert.
                Neon ist ein US-amerikanisches Unternehmen; die Übermittlung erfolgt
                auf Basis von SCCs gemäß Art. 46 Abs. 2 lit. c DSGVO.{' '}
                <a
                  href="https://neon.tech/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                >
                  Datenschutzrichtlinie Neon
                </a>
              </p>
              <dl className="grid gap-1 mt-3">
                <InfoRow term="Speicherdauer">12 Monate ab Einreichung</InfoRow>
              </dl>
            </div>
          </Section>

          {/* ── 6. E-Mail-Versand (Resend) ── */}
          <Section num="6" label="E-Mail-Versand und Kontaktliste">
            <p className="text-ink-mid leading-relaxed mb-4">
              Für den Versand von Bestätigungs-, Ergebnis- und Benachrichtigungs-E-Mails
              verwenden wir den Dienst <strong className="text-ink font-medium">Resend</strong>{' '}
              (Resend Inc., USA).
            </p>
            <p className="text-ink-mid leading-relaxed mb-4">
              Resend wird eingesetzt für:
            </p>
            <ul className="list-none space-y-2 mb-4 pl-4 border-l-2 border-cream-dark">
              {[
                'Versand von Diagnose-Ergebnissen und Quiz-Resultaten an Nutzer',
                'Versand von Wartelisten-Bestätigungen',
                'Interne Benachrichtigungen an unser Team',
                'Optionale Aufnahme in eine Kontaktliste bei ausdrücklicher Einwilligung',
              ].map((item) => (
                <li key={item} className="text-ink-mid text-sm leading-relaxed">
                  — {item}
                </li>
              ))}
            </ul>
            <dl className="grid gap-2 mt-4">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für nutzerorientierte E-Mails;
                Art. 6 Abs. 1 lit. f DSGVO für interne Benachrichtigungen
              </InfoRow>
              <InfoRow term="Drittlandübermittlung">
                Resend Inc. ist in den USA ansässig. Übermittlung auf Basis von SCCs
                gemäß Art. 46 Abs. 2 lit. c DSGVO.
              </InfoRow>
              <InfoRow term="Datenschutzerklärung Resend">
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                >
                  resend.com/legal/privacy-policy
                </a>
              </InfoRow>
            </dl>
          </Section>

          {/* ── 7. Zahlungsabwicklung (LemonSqueezy) ── */}
          <Section num="7" label="Zahlungsabwicklung">
            <p className="text-ink-mid leading-relaxed mb-4">
              Für kostenpflichtige Produkte (z. B. Food Cost Tracker) setzen wir den
              Zahlungsdienstleister{' '}
              <strong className="text-ink font-medium">LemonSqueezy</strong>{' '}
              (Lemon Squeezy LLC, USA) ein.
            </p>
            <p className="text-ink-mid leading-relaxed mb-4">
              Beim Klick auf einen Kaufbutton werden Sie auf die externe Checkout-Seite
              von LemonSqueezy weitergeleitet. Zahlungsdaten (Kreditkarte, Adresse etc.)
              werden ausschließlich dort verarbeitet und sind uns nicht zugänglich.
              Nach Abschluss der Transaktion übermittelt LemonSqueezy uns automatisch
              per Webhook: Bestellnummer, E-Mail-Adresse und Zahlungsstatus — ausschließlich
              zur Freischaltung des Downloads.
            </p>
            <dl className="grid gap-2 mt-4">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung (Zustellung des
                gekauften Produkts)
              </InfoRow>
              <InfoRow term="Gespeicherte Daten">
                Bestellnummer, E-Mail-Adresse, Zahlungsstatus (in Neon DB)
              </InfoRow>
              <InfoRow term="Speicherdauer">
                Aufbewahrung gemäß handels- und steuerrechtlicher Pflichten
                (§ 147 AO: 10 Jahre)
              </InfoRow>
              <InfoRow term="Datenschutzerklärung LemonSqueezy">
                <a
                  href="https://www.lemonsqueezy.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
                >
                  lemonsqueezy.com/privacy
                </a>
              </InfoRow>
            </dl>
          </Section>

          {/* ── 8. Download-Protokollierung ── */}
          <Section num="8" label="Download-Protokollierung">
            <p className="text-ink-mid leading-relaxed mb-4">
              Beim Herunterladen eines bezahlten Produkts werden zur
              Zugangskontrolle und Missbrauchsprävention folgende Daten gespeichert:
            </p>
            <ul className="list-none space-y-1 mb-4 pl-4 border-l-2 border-cream-dark">
              {[
                'IP-Adresse',
                'Browser-Kennung (User-Agent)',
                'Bestellnummer',
                'Sprachversion der heruntergeladenen Datei',
                'Zeitstempel',
              ].map((item) => (
                <li key={item} className="text-ink-mid text-sm">— {item}</li>
              ))}
            </ul>
            <dl className="grid gap-2">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an der
                Verhinderung von Missbrauch und der Sicherstellung, dass Downloads
                nur von berechtigten Käufern erfolgen
              </InfoRow>
              <InfoRow term="Speicherdauer">12 Monate</InfoRow>
            </dl>
          </Section>

          {/* ── 9. Cookies ── */}
          <Section num="9" label="Cookies und Tracking">
            <p className="text-ink-mid leading-relaxed mb-3">
              Diese Website verwendet{' '}
              <strong className="text-ink font-medium">keine Tracking-Cookies</strong>,
              kein Web-Analytics (z. B. Google Analytics, Plausible) und kein
              Remarketing. Es werden ausschließlich technisch notwendige Cookies
              gesetzt, die für den ordnungsgemäßen Betrieb der Website und der
              Nutzersitzung erforderlich sind.
            </p>
            <dl className="grid gap-2 mt-4">
              <InfoRow term="Rechtsgrundlage">
                Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am technischen
                Betrieb der Website
              </InfoRow>
              <InfoRow term="Opt-out">
                Sie können die Speicherung von Cookies in Ihrem Browser deaktivieren.
                Dies kann die Funktionalität der Website einschränken.
              </InfoRow>
            </dl>
          </Section>

          {/* ── 10. SSL ── */}
          <Section num="10" label="SSL- und TLS-Verschlüsselung">
            <p className="text-ink-mid leading-relaxed">
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile Ihres
              Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol
              in der Browserzeile.
            </p>
          </Section>

          {/* ── 11. Betroffenenrechte ── */}
          <Section num="11" label="Ihre Rechte als betroffene Person (Art. 15–21 DSGVO)">
            <p className="text-ink-mid leading-relaxed mb-6">
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
              personenbezogenen Daten:
            </p>

            <div className="space-y-4">
              {[
                {
                  art: 'Art. 15',
                  title: 'Auskunftsrecht',
                  desc: 'Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten.',
                },
                {
                  art: 'Art. 16',
                  title: 'Recht auf Berichtigung',
                  desc: 'Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.',
                },
                {
                  art: 'Art. 17',
                  title: 'Recht auf Löschung',
                  desc: 'Sie können unter bestimmten Voraussetzungen die Löschung Ihrer Daten verlangen.',
                },
                {
                  art: 'Art. 18',
                  title: 'Recht auf Einschränkung der Verarbeitung',
                  desc: 'Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.',
                },
                {
                  art: 'Art. 20',
                  title: 'Recht auf Datenübertragbarkeit',
                  desc: 'Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.',
                },
                {
                  art: 'Art. 21',
                  title: 'Widerspruchsrecht',
                  desc: 'Sie können der Verarbeitung Ihrer Daten auf Basis von Art. 6 Abs. 1 lit. f DSGVO jederzeit widersprechen.',
                },
                {
                  art: 'Art. 7 Abs. 3',
                  title: 'Widerruf einer Einwilligung',
                  desc: 'Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.',
                },
              ].map(({ art, title, desc }) => (
                <div key={art} className="grid grid-cols-[80px_1fr] gap-4">
                  <span className="font-mono text-[10px] text-ember uppercase tracking-wider pt-0.5">
                    {art}
                  </span>
                  <div>
                    <p className="text-ink font-medium text-sm mb-1">{title}</p>
                    <p className="text-ink-mid text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-cream-dark rounded-[3px]">
              <p className="text-ink-mid text-sm">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a
                  href="mailto:contact@lesouschef.com"
                  className="text-ink underline underline-offset-2 hover:text-ember transition-colors font-medium"
                >
                  contact@lesouschef.com
                </a>
              </p>
            </div>
          </Section>

          {/* ── 12. Beschwerderecht ── */}
          <Section num="12" label="Beschwerderecht bei der Aufsichtsbehörde" last>
            <p className="text-ink-mid leading-relaxed mb-4">
              Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
              Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer
              Datenschutz-Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die
              Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die
              DSGVO verstößt.
            </p>
            <p className="text-ink-mid leading-relaxed mb-4">
              Die für unseren Sitz zuständige Aufsichtsbehörde ist:
            </p>
            <address className="not-italic text-ink-mid leading-loose pl-4 border-l-2 border-cream-dark">
              Die Landesbeauftragte für den Datenschutz Niedersachsen (LfD)<br />
              Prinzenstraße 5<br />
              30159 Hannover<br />
              <a
                href="https://www.lfd.niedersachsen.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-ember transition-colors"
              >
                www.lfd.niedersachsen.de
              </a>
            </address>
          </Section>

        </div>
      </main>

      <Footer />
    </>
  );
}

/* ── Sub-components ── */

function Section({
  num,
  label,
  children,
  last = false,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`${last ? '' : 'mb-14 pb-14 border-b border-cream-dark'}`}>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted mb-5">
        {num}. {label}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 items-baseline text-sm">
      <dt className="text-ink-muted font-mono text-[10px] uppercase tracking-wider leading-snug pt-0.5">
        {term}
      </dt>
      <dd className="text-ink-mid leading-relaxed">{children}</dd>
    </div>
  );
}

function FormBlock({
  title,
  fields,
  purpose,
  legal,
}: {
  title: string;
  fields: string[];
  purpose: string;
  legal: string;
}) {
  return (
    <div className="pl-4 border-l-2 border-cream-dark">
      <h3 className="font-body font-medium text-ink text-sm mb-3">{title}</h3>
      <div className="grid gap-2">
        <InfoRow term="Erhobene Felder">
          <ul className="list-none space-y-0.5">
            {fields.map((f) => (
              <li key={f}>— {f}</li>
            ))}
          </ul>
        </InfoRow>
        <InfoRow term="Verwendungszweck">{purpose}</InfoRow>
        <InfoRow term="Rechtsgrundlage">{legal}</InfoRow>
      </div>
    </div>
  );
}
