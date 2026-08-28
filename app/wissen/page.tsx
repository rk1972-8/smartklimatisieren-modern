import type { Metadata } from 'next';
import { StoryCard } from '../components/content';
import { InquiryBand, SiteFooter, SiteHeader } from '../components/site-shell';
import { articles } from '../data';

export const metadata: Metadata = {
  title: 'Wissen zu Klima, Kälte & Wärmepumpen | smartklimatisieren',
  description: 'Praxisnahe Ratgeber, Projektberichte und Antworten zu Klimaanlagen, Wärmepumpen und Kältetechnik.',
  alternates: { canonical: '/wissen' },
};

export default function KnowledgePage() {
  return (
    <main>
      <SiteHeader />
      <section className="index-hero">
        <p className="eyebrow"><span /> Wissen statt Werbetexte</p>
        <h1>Gute Entscheidungen<br /><em>beginnen mit Wissen.</em></h1>
        <p>Ratgeber, Einblicke in echte Projekte und verständliche Antworten aus der Praxis.</p>
      </section>
      <section className="story-section">
        <div className="story-grid">{articles.map((record) => <StoryCard record={record} key={record.path} />)}</div>
      </section>
      <InquiryBand />
      <SiteFooter />
    </main>
  );
}
