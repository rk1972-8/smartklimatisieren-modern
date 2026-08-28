'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

export type CatalogItem = {
  path: string;
  title: string;
  group: string;
  image?: string;
};

export function Catalog({ items }: { items: CatalogItem[] }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('Alle');
  const groups = ['Alle', ...Array.from(new Set(items.map((item) => item.group))).sort((a, b) => a.localeCompare(b, 'de'))];

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('de');
    return items.filter((item) => {
      const groupMatches = group === 'Alle' || item.group === group;
      const textMatches = !needle || `${item.title} ${item.group}`.toLocaleLowerCase('de').includes(needle);
      return groupMatches && textMatches;
    });
  }, [group, items, query]);

  return (
    <div className="catalog">
      <div className="catalog-tools">
        <label>
          <span>Produkte durchsuchen</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="z. B. Daikin, Wandgerät oder R32" />
        </label>
        <label>
          <span>Bereich</span>
          <select value={group} onChange={(event) => setGroup(event.target.value)}>
            {groups.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <p><strong>{visible.length}</strong> Systeme</p>
      </div>
      {visible.length ? (
        <div className="product-grid">
          {visible.map((item) => (
            <article className="product-card" key={item.path}>
              <a className="product-card-image" href={item.path}>
                {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className="product-placeholder" aria-hidden="true"><i /><i /><i /></span>}
              </a>
              <p>{item.group}</p>
              <h3><a href={item.path}>{item.title}</a></h3>
              <div><span>Details &amp; Beratung</span><a href={item.path} aria-label={`${item.title} ansehen`}>↗</a></div>
            </article>
          ))}
        </div>
      ) : <p className="empty-result">Dazu haben wir gerade keinen passenden Eintrag. Rufen Sie uns gern an – wir beraten herstellerübergreifend.</p>}
    </div>
  );
}
