import type { Metadata } from 'next';
import { SmartInquiry } from '../components/smart-inquiry';
import { SiteFooter, SiteHeader } from '../components/site-shell';

export const metadata: Metadata = {
  title: 'Smart-Anfrage für Klima & Wärmepumpe | smartklimatisieren',
  description: 'Beschreiben Sie Ihr Vorhaben in eigenen Worten und übermitteln Sie die wichtigsten Eckdaten strukturiert an unseren Fachbetrieb.',
  alternates: { canonical: '/anfrage' },
};

export default function InquiryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="index-hero inquiry-index-hero">
        <p className="eyebrow"><span /> Weniger Formular, mehr Verständnis</p>
        <h1>Ihre Anfrage.<br /><em>Intelligent vorbereitet.</em></h1>
        <p>Sie beschreiben das Projekt, die Smart-Anfrage erkennt erste Eckdaten und bereitet alles übersichtlich für die persönliche Beratung vor.</p>
      </section>
      <section className="assistant-page"><SmartInquiry /></section>
      <SiteFooter />
    </main>
  );
}
