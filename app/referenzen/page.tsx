import type { Metadata } from 'next';
import { StoryCard } from '../components/content';
import { InquiryBand, SiteFooter, SiteHeader } from '../components/site-shell';
import { referencePages } from '../data';

export const metadata: Metadata = {
  title: 'Projekte & Kundenstimmen | smartklimatisieren',
  description: 'Echte Projekte und Erfahrungen mit Klimaanlagen, Wärmepumpen und Kältetechnik aus der Region.',
  alternates: { canonical: '/referenzen' },
};

export default function ReferencesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="index-hero">
        <p className="eyebrow"><span /> Projekte aus der Region</p>
        <h1>Gebaut für echte<br /><em>Anforderungen.</em></h1>
        <p>Projektberichte und Kundenstimmen zeigen, wie individuelle Planung in der Praxis funktioniert.</p>
      </section>
      <section className="story-section">
        <div className="story-grid">{referencePages.map((record) => <StoryCard record={record} key={record.path} />)}</div>
      </section>
      <InquiryBand />
      <SiteFooter />
    </main>
  );
}
