/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentBlocks, ProductCard } from '../components/content';
import { InquiryBand, SiteFooter, SiteHeader } from '../components/site-shell';
import { allRecords, displayTitle, findRecord, productsForPath } from '../data';

const siteUrl = process.env.SITE_URL ?? 'https://www.smartklimatisieren.de';

type RouteProps = { params: Promise<{ slug: string[] }> };

function recordFor(slug: string[]) {
  return findRecord(`/${slug.join('/')}`);
}

export async function generateStaticParams() {
  return allRecords.map((record) => ({ slug: record.path.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const record = recordFor(slug);
  if (!record) return {};
  const title = displayTitle(record);
  const description = record.description || `${title} – persönliche Beratung durch smartklimatisieren.`;
  const images = record.images[0] ? [{ url: record.images[0], alt: title }] : [];

  return {
    title: `${title} | smartklimatisieren`,
    description,
    alternates: { canonical: record.path },
    openGraph: {
      title: `${title} | smartklimatisieren`,
      description,
      url: record.path,
      type: record.kind === 'article' ? 'article' : 'website',
      images,
    },
    twitter: { card: images.length ? 'summary_large_image' : 'summary', title, description, images },
  };
}

export default async function ContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const record = recordFor(slug);
  if (!record) notFound();

  const title = displayTitle(record);
  const isProduct = record.kind === 'product';
  const isCategory = record.kind === 'category';
  const relatedProducts = isCategory ? productsForPath(record.path).slice(0, 60) : [];
  const breadcrumbParts = record.path.split('/').filter(Boolean);
  const schema = isProduct
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description: record.description,
        image: record.images,
        sku: record.articleId,
        category: record.category,
        brand: record.brand ? { '@type': 'Brand', name: record.brand } : undefined,
      }
    : {
        '@context': 'https://schema.org',
        '@type': record.kind === 'article' ? 'Article' : 'WebPage',
        headline: title,
        description: record.description,
        image: record.images[0],
        publisher: { '@type': 'Organization', name: 'smartklimatisieren', url: siteUrl },
      };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="breadcrumbs" aria-label="Brotkrümelnavigation">
        <a href="/">Start</a>
        {breadcrumbParts.map((part, index) => {
          const path = `/${breadcrumbParts.slice(0, index + 1).join('/')}`;
          const label = index === breadcrumbParts.length - 1 ? title : part.replaceAll('-', ' ');
          return <span key={path}><i aria-hidden="true">/</i><a href={path}>{label}</a></span>;
        })}
      </div>

      <section className={`detail-hero ${record.images[0] ? '' : 'detail-hero-simple'}`}>
        <div className="detail-hero-copy">
          <p className="eyebrow"><span /> {isProduct ? 'System im Überblick' : isCategory ? 'Lösungen' : record.kind === 'article' ? 'Praxis & Wissen' : 'smartklimatisieren'}</p>
          <h1>{title}</h1>
          {record.description && <p>{record.description}</p>}
          <div className="detail-actions">
            <a className="button button-primary" href="/#anfrage">Persönlich beraten lassen <span aria-hidden="true">→</span></a>
            {isProduct && <span className="no-price">Keine Shoppreise · Angebot nach Beratung</span>}
          </div>
        </div>
        {record.images[0] && <div className="detail-hero-image"><img src={record.images[0]} alt={title} /></div>}
      </section>

      {isProduct ? (
        <section className="product-detail">
          <aside className="product-facts">
            <p>Produktinformation</p>
            {record.articleId && <div><span>Artikel</span><strong>{record.articleId}</strong></div>}
            {record.category && <div><span>Bereich</span><strong>{record.category}</strong></div>}
            {record.brand && <div><span>Hersteller / Serie</span><strong>{record.brand}</strong></div>}
            <a href="/#anfrage">Passendes Angebot anfragen <i aria-hidden="true">↗</i></a>
          </aside>
          <article className="editorial-content">
            <ContentBlocks record={record} />
            {record.images.length > 1 && (
              <div className="detail-gallery">
                {record.images.slice(1).map((image) => <img src={image} alt="" loading="lazy" key={image} />)}
              </div>
            )}
          </article>
        </section>
      ) : (
        <section className="content-layout">
          <aside>
            <p>Direkt zum nächsten Schritt</p>
            <a href="/#anfrage">Beratung anfragen <span aria-hidden="true">↗</span></a>
            <a href="/produkte">Produkte ansehen <span aria-hidden="true">↗</span></a>
          </aside>
          <article className="editorial-content">
            <ContentBlocks record={record} />
            {record.images.length > 1 && (
              <div className="detail-gallery">
                {record.images.slice(1, 5).map((image) => <img src={image} alt="" loading="lazy" key={image} />)}
              </div>
            )}
          </article>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="related-section">
          <div className="section-title-row">
            <div><p className="eyebrow"><span /> Ohne Shoppreise</p><h2>Passende Systeme</h2></div>
            <a href="/produkte">Gesamten Produktkatalog ansehen <span aria-hidden="true">→</span></a>
          </div>
          <div className="product-grid">
            {relatedProducts.map((product) => <ProductCard product={product} key={product.path} />)}
          </div>
        </section>
      )}

      <InquiryBand />
      <SiteFooter />
    </main>
  );
}
