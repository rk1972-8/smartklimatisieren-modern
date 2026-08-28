import type { Metadata } from 'next';
import { StoryCard } from '../components/content';
import { InquiryBand, SiteFooter, SiteHeader } from '../components/site-shell';
import { regionalPages } from '../data';

export const metadata: Metadata = {
  title: 'Klimaanlagen & Wärmepumpen in Ihrer Region | smartklimatisieren',
  description: 'Regionaler Fachbetrieb für Geilenkirchen, den Kreis Heinsberg, Aachen und die Umgebung – mit kurzen Wegen von Beratung bis Service.',
  alternates: { canonical: '/regionen' },
};

export default function RegionsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="index-hero regions-hero">
        <p className="eyebrow"><span /> Kurze Wege, persönlicher Service</p>
        <h1>Gutes Klima.<br /><em>Direkt aus der Region.</em></h1>
        <p>Wir planen, montieren und betreuen Klimaanlagen und Wärmepumpen rund um Geilenkirchen, im Kreis Heinsberg und in der Städteregion Aachen.</p>
      </section>
      <section className="region-section">
        <div className="region-grid">{regionalPages.map((record) => <StoryCard record={record} key={record.path} />)}</div>
      </section>
      <InquiryBand />
      <SiteFooter />
    </main>
  );
}
