import type { Metadata } from 'next';
import { Catalog } from '../components/catalog';
import { InquiryBand, SiteFooter, SiteHeader } from '../components/site-shell';
import { productGroup, products } from '../data';

export const metadata: Metadata = {
  title: 'Produktkatalog ohne Shoppreise | smartklimatisieren',
  description: 'Klimaanlagen, Wärmepumpen, Kältetechnik und Zubehör vergleichen – mit technischen Informationen und persönlicher Fachberatung statt Shoppreisen.',
  alternates: { canonical: '/produkte' },
};

export default function ProductsPage() {
  const items = products.map((product) => ({
    path: product.path,
    title: product.title,
    group: productGroup(product),
    image: product.images[0],
  }));

  return (
    <main>
      <SiteHeader />
      <section className="index-hero">
        <p className="eyebrow"><span /> Produkte & Systeme</p>
        <h1>Technik entdecken.<br /><em>Persönlich auswählen.</em></h1>
        <p>Alle Produktinformationen bleiben sichtbar – ohne Warenkorb, ohne künstliche Shoppreise und mit einer Empfehlung, die zu Gebäude und Nutzung passt.</p>
      </section>
      <section className="catalog-section">
        <Catalog items={items} />
      </section>
      <InquiryBand />
      <SiteFooter />
    </main>
  );
}
