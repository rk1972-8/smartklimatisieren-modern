import type { MetadataRoute } from 'next';
import { allRecords } from './data';

const siteUrl = process.env.SITE_URL ?? 'https://www.smartklimatisieren.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/produkte', '/wissen', '/regionen', '/referenzen', '/anfrage'];
  return [...staticPaths, ...allRecords.map((record) => record.path)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date('2026-08-28'),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').length <= 3 ? 0.8 : 0.6,
  }));
}
