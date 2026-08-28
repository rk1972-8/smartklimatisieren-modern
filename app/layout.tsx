import type { Metadata } from 'next';
import { Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.SITE_URL ?? 'https://www.smartklimatisieren.de';

const body = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

const display = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Klimaanlagen & Wärmepumpen im Kreis Heinsberg | smartklimatisieren',
  description:
    'Planung, Installation und Service für Klimaanlagen, Wärmepumpen und Kältetechnik in Geilenkirchen und im Kreis Heinsberg.',
  openGraph: {
    title: 'Gutes Klima. Perfekt geplant. | smartklimatisieren',
    description:
      'Klimaanlagen, Wärmepumpen und Kältetechnik für Geilenkirchen und den Kreis Heinsberg.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Gutes Klima. Perfekt geplant.' }],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gutes Klima. Perfekt geplant. | smartklimatisieren',
    description:
      'Klimaanlagen, Wärmepumpen und Kältetechnik für Geilenkirchen und den Kreis Heinsberg.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${body.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
