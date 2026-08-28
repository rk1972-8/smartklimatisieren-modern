/* eslint-disable @next/next/no-img-element */
import type { ContentBlock, SiteRecord } from '../data';
import { displayTitle, productGroup } from '../data';

function normalize(value: string) {
  return value.toLocaleLowerCase('de').replace(/[^a-z0-9äöüß]+/g, ' ').trim();
}

export function ContentBlocks({ record, limit }: { record: SiteRecord; limit?: number }) {
  const title = normalize(displayTitle(record));
  const blocks = record.blocks
    .filter((block) => normalize(block.text) !== title)
    .slice(0, limit ?? record.blocks.length);

  return (
    <div className="content-blocks">
      {blocks.map((block: ContentBlock, index: number) => {
        if (block.type === 'heading') return <h2 key={`${index}-${block.text}`}>{block.text}</h2>;
        if (block.type === 'quote') return <blockquote key={`${index}-${block.text}`}>{block.text}</blockquote>;
        if (block.type === 'list') return <p className="content-list" key={`${index}-${block.text}`}>{block.text}</p>;
        return <p key={`${index}-${block.text}`}>{block.text}</p>;
      })}
    </div>
  );
}

export function ProductCard({ product }: { product: SiteRecord }) {
  return (
    <article className="product-card">
      <a className="product-card-image" href={product.path}>
        {product.images[0] ? <img src={product.images[0]} alt="" loading="lazy" /> : <span className="product-placeholder" aria-hidden="true"><i /><i /><i /></span>}
      </a>
      <p>{productGroup(product)}</p>
      <h3><a href={product.path}>{product.title}</a></h3>
      <div>
        <span>Details &amp; Beratung</span>
        <a href={product.path} aria-label={`${product.title} ansehen`}>↗</a>
      </div>
    </article>
  );
}

export function StoryCard({ record }: { record: SiteRecord }) {
  return (
    <article className="story-card">
      <a href={record.path} className="story-card-image">
        {record.images[0] ? <img src={record.images[0]} alt="" loading="lazy" /> : <span className="story-placeholder">Wissen</span>}
      </a>
      <div>
        <p>{record.kind === 'article' ? 'Praxis & Wissen' : 'Regionaler Service'}</p>
        <h3><a href={record.path}>{displayTitle(record)}</a></h3>
        <span>{record.description || 'Mehr erfahren und persönlich beraten lassen.'}</span>
        <a href={record.path}>Beitrag lesen <i aria-hidden="true">↗</i></a>
      </div>
    </article>
  );
}
