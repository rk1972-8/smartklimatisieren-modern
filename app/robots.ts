import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL ?? 'https://www.smartklimatisieren.de';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
