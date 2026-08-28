/* eslint-disable @next/next/no-html-link-for-pages */
export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={footer ? 'footer-brand' : 'brand'} href="/" aria-label="smartklimatisieren Startseite">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        smart<strong>klimatisieren</strong>
      </span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav aria-label="Hauptnavigation">
        <a href="/klimaanlagen">Klimaanlagen</a>
        <a href="/waermepumpe">Wärmepumpen</a>
        <a href="/produkte">Produkte</a>
        <a href="/wissen">Wissen</a>
        <a href="/regionen">Regionen</a>
      </nav>
      <a className="header-cta" href="/anfrage">
        Projekt anfragen <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export function InquiryBand() {
  return (
    <section className="inquiry-band" aria-label="Kontakt">
      <div>
        <p className="eyebrow eyebrow-light"><span /> Persönlich beraten</p>
        <h2>Welche Lösung passt<br />zu Ihrem Gebäude?</h2>
      </div>
      <div className="inquiry-band-actions">
        <a className="button button-lime" href="/anfrage">Smart-Anfrage starten <span aria-hidden="true">→</span></a>
        <a href="tel:+4924519116960">02451 911 69 60</a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <Brand footer />
      <div><strong>mifrro Vertriebs GmbH</strong><span>Von-Braun-Str. 25a · 52511 Geilenkirchen</span></div>
      <div><a href="tel:+4924519116960">02451 911 69 60</a><a href="mailto:info@smartklimatisieren.de">info@smartklimatisieren.de</a></div>
      <div><a href="/allgemeine-seiten/impressum">Impressum</a><a href="/allgemeine-seiten/kontakt">Kontakt</a></div>
      <p>© 2026 smartklimatisieren · Klimaanlagen, Wärmepumpen und Kältetechnik aus der Region</p>
    </footer>
  );
}
