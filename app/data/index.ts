import products0 from './products-0.json';
import products1 from './products-1.json';
import products2 from './products-2.json';
import products3 from './products-3.json';
import products4 from './products-4.json';
import products5 from './products-5.json';
import pages0 from './pages-0.json';
import pages1 from './pages-1.json';
import pages2 from './pages-2.json';
import pages3 from './pages-3.json';

export type ContentBlock = {
  type: 'heading' | 'paragraph' | 'list' | 'quote';
  text: string;
};

export type SiteRecord = {
  kind: 'product' | 'page' | 'article' | 'category';
  path: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
  images: string[];
  category?: string;
  brand?: string;
  articleId?: string;
  date?: string;
};

const importedProducts = [
  ...products0,
  ...products1,
  ...products2,
  ...products3,
  ...products4,
  ...products5,
] as SiteRecord[];

const importedPages = [...pages0, ...pages1, ...pages2, ...pages3] as SiteRecord[];

const recoveredPages: SiteRecord[] = [
  {
    kind: 'category',
    path: '/klimaanlagen/mono-split-klimaanlage',
    title: 'Mono-Split-Klimaanlagen',
    description:
      'Effiziente Klimaanlagen für einzelne Räume – geplant, montiert und betreut durch Ihren regionalen Fachbetrieb.',
    images: ['/assets/residential.jpg'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Eine Mono-Split-Klimaanlage verbindet ein Innen- mit einem Außengerät. Sie eignet sich besonders für einzelne Wohnräume, Büros, Praxen und kleinere Gewerbeflächen.',
      },
      {
        type: 'heading',
        text: 'Passend ausgelegt statt nur passend gekauft',
      },
      {
        type: 'paragraph',
        text: 'Wir prüfen Raumgröße, Nutzung, Geräuschkomfort und Leitungswege. Anschließend empfehlen wir eine passende Bauform und Leistung – herstellerübergreifend und ohne Shoppreise.',
      },
    ],
  },
  {
    kind: 'page',
    path: '/local/stolberg/waermepumpe-stolberg',
    title: 'Wärmepumpe in Stolberg',
    description:
      'Planung, Installation und Service für Wärmepumpen in Stolberg und der Städteregion Aachen.',
    images: ['/assets/heatpump.jpg'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Wir begleiten Wärmepumpenprojekte in Stolberg von der ersten Bestandsaufnahme über die Auslegung bis zur fachgerechten Installation und Wartung.',
      },
      {
        type: 'heading',
        text: 'Regional geplant und persönlich betreut',
      },
      {
        type: 'paragraph',
        text: 'Ob Neubau oder Bestandsgebäude: Entscheidend sind Heizlast, vorhandene Wärmeverteilung, Aufstellort und die gewünschte Betriebsweise. Diese Punkte klären wir gemeinsam vor Ort.',
      },
    ],
  },
  {
    kind: 'page',
    path: '/local/wassenberg/split-klimaanlage-wassenberg',
    title: 'Split-Klimaanlage in Wassenberg',
    description:
      'Beratung, Montage und Service für Split-Klimaanlagen in Wassenberg und im Kreis Heinsberg.',
    images: ['/assets/residential.jpg'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Für Wohnräume, Büros und Gewerbe in Wassenberg planen wir leise und effiziente Split-Klimaanlagen mit kurzen Wegen und persönlicher Betreuung.',
      },
      {
        type: 'heading',
        text: 'Von der Auslegung bis zur Wartung',
      },
      {
        type: 'paragraph',
        text: 'Wir berücksichtigen Raumgröße, Nutzung, Leitungswege und Schallschutz. So entsteht eine Lösung, die im Alltag komfortabel und effizient arbeitet.',
      },
    ],
  },
];

const categoryTitles: Record<string, string> = {
  '/klimaanlagen': 'Klimaanlagen',
  '/kaeltetechnik': 'Kältetechnik',
  '/waermepumpe': 'Wärmepumpen',
};

export const products = importedProducts.sort((a, b) => a.title.localeCompare(b.title, 'de'));
export const pages = [...importedPages.filter((record) => record.path !== '/'), ...recoveredPages];
export const allRecords = [...products, ...pages];
export const articles = pages.filter((record) => record.kind === 'article');
export const regionalPages = pages.filter((record) => record.path.startsWith('/local/'));
export const referencePages = articles.filter((record) =>
  /\/bewertungen\/|\/installationen\//.test(record.path),
);

const recordMap = new Map(allRecords.map((record) => [record.path, record]));

export function findRecord(path: string) {
  const normalized = decodeURI(path).replace(/\/$/, '') || '/';
  return recordMap.get(normalized);
}

export function displayTitle(record: SiteRecord) {
  return categoryTitles[record.path] ?? record.title;
}

export function productGroup(product: SiteRecord) {
  const path = product.path.toLowerCase();
  if (path.includes('waermepumpe')) return 'Wärmepumpen';
  if (path.includes('kaeltetechnik')) return 'Kältetechnik';
  if (path.includes('installationsmaterial')) return 'Zubehör';
  if (path.includes('vrv') || path.includes('vrf')) return 'VRV / VRF';
  if (path.includes('multi-split')) return 'Multi-Split';
  if (path.includes('mono-split')) return 'Mono-Split';
  return 'Klimatechnik';
}

export function productsForPath(path: string) {
  const matches = products.filter((product) => product.path.startsWith(`${path}/`));
  return matches.length ? matches : products.filter((product) => productGroup(product) === path);
}
