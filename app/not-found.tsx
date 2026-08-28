/* eslint-disable @next/next/no-html-link-for-pages */
import { SiteFooter, SiteHeader } from './components/site-shell';

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found">
        <p className="eyebrow"><span /> 404</p>
        <h1>Diese Seite ist<br /><em>nicht mehr hier.</em></h1>
        <p>Über die Startseite, den Produktkatalog oder unsere Wissensbeiträge finden Sie schnell weiter.</p>
        <div><a className="button button-primary" href="/">Zur Startseite <span aria-hidden="true">→</span></a><a href="/produkte">Produkte ansehen</a></div>
      </section>
      <SiteFooter />
    </main>
  );
}
