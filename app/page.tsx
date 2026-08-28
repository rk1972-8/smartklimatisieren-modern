/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import { SmartInquiry } from './components/smart-inquiry';
import { SiteFooter, SiteHeader } from './components/site-shell';

const services = [
  {
    number: '01',
    title: 'Klimatechnik',
    text: 'Leise, effiziente Klimaanlagen für Wohnräume, Büros und Gewerbe.',
  },
  {
    number: '02',
    title: 'Wärmepumpen',
    text: 'Nachhaltig heizen und kühlen – passend zu Gebäude und Verbrauch.',
  },
  {
    number: '03',
    title: 'Kälte & Service',
    text: 'Planung, Montage, Wartung und schnelle Hilfe aus einer Hand.',
  },
];

const solutions = [
  {
    label: 'Wohnen',
    title: 'Mono- & Multi-Split',
    text: 'Leise Klimatisierung für einen oder mehrere Räume – präzise auf Ihren Alltag abgestimmt.',
    image: '/assets/residential.jpg',
    alt: 'Modernes Wandklimagerät in einem Wohnraum',
  },
  {
    label: 'Heizen & Kühlen',
    title: 'Wärmepumpen',
    text: 'Effiziente Systeme für Neubau und Bestand, inklusive Planung und fachgerechter Einbindung.',
    image: '/assets/heatpump.jpg',
    alt: 'Installierte LG Wärmepumpe an einem Wohngebäude',
  },
  {
    label: 'Gewerbe',
    title: 'VRV / VRF & Kälte',
    text: 'Leistungsstarke Lösungen für Büros, Verkaufsflächen, Technikräume und industrielle Prozesse.',
    image: '/assets/commercial.jpg',
    alt: 'Klimatisierte moderne Gewerbefläche',
  },
];

const projects = [
  {
    eyebrow: 'Wärmepumpe · Geilenkirchen',
    title: 'Effizient heizen im Bestand',
    image: '/assets/heatpump.jpg',
    alt: 'Wärmepumpeninstallation in Geilenkirchen',
  },
  {
    eyebrow: 'VRV-System · Autohaus',
    title: 'Klima für offene Architektur',
    image: '/assets/commercial.jpg',
    alt: 'Klimatisierte Verkaufs- und Bürofläche in einem Autohaus',
  },
  {
    eyebrow: 'Kältetechnik · Industrie',
    title: 'Sichere Temperatur im Prozess',
    image: '/assets/industry.jpg',
    alt: 'Außengerät für eine industrielle Klimatisierung',
  },
  {
    eyebrow: 'Gewerbe · Neubau',
    title: 'Frühzeitig richtig geplant',
    image: '/assets/office.jpg',
    alt: 'Gewerblicher Neubau während der technischen Planung',
  },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/hero.jpg" alt="" />
          <span className="hero-wash" />
        </div>

        <div className="hero-copy">
          <p className="eyebrow"><span /> Ihr regionaler Fachbetrieb</p>
          <h1>
            Gutes Klima.
            <br />
            <em>Perfekt geplant.</em>
          </h1>
          <p className="hero-intro">
            Klimaanlagen, Wärmepumpen und Kältetechnik – individuell geplant,
            fachgerecht installiert und persönlich betreut.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/anfrage">
              Kostenlose Erstberatung <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#projekte">
              Projekte ansehen <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <aside className="hero-card">
          <p>Direkt erreichbar</p>
          <a href="tel:+4924519116960">02451 911 69 60</a>
          <span>Geilenkirchen · Kreis Heinsberg</span>
        </aside>

        <div className="hero-proof" aria-label="Kernvorteile">
          <span><strong>Regional</strong> kurze Wege</span>
          <span><strong>Ganzheitlich</strong> von Planung bis Wartung</span>
          <span><strong>Herstellerunabhängig</strong> passende Technik</span>
        </div>
      </section>

      <section className="services" id="leistungen">
        <div className="section-lead">
          <p className="eyebrow"><span /> Was wir für Sie tun</p>
          <h2>Technik, die zu<br />Ihrem Gebäude passt.</h2>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <a href={service.number === '01' ? '/klimaanlagen' : service.number === '02' ? '/waermepumpe' : '/kaeltetechnik'} className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="solutions" id="loesungen">
        <div className="solutions-heading">
          <p className="eyebrow eyebrow-light"><span /> Ausgewählte Lösungen</p>
          <h2>Keine Anlage von der Stange.<br /><em>Sondern eine, die passt.</em></h2>
          <p>
            Wir kombinieren Hersteller, Leistung und Bauform so, dass Komfort,
            Energieverbrauch und Einbauaufwand zusammenpassen.
          </p>
        </div>

        <div className="solution-grid">
          {solutions.map((solution, index) => (
            <article className="solution-card" key={solution.title}>
              <div className="solution-image">
                <img src={solution.image} alt={solution.alt} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="card-label">{solution.label}</p>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
              <a href="/anfrage">Lösung anfragen <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>

        <div className="catalog-note">
          <div>
            <strong>Produktkatalog ohne Shop</strong>
            <span>Technische Daten, Varianten und Herstellerunterlagen bleiben vollständig sichtbar.</span>
          </div>
          <a href="/produkte">Alle Systeme entdecken <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="process" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow"><span /> Der Weg zum passenden System</p>
          <h2 id="process-title">Von der ersten Idee<br />bis zum perfekten Klima.</h2>
        </div>
        <ol className="process-list">
          <li><span>01</span><div><strong>Bedarf klären</strong><p>Räume, Nutzung und Wünsche verstehen.</p></div></li>
          <li><span>02</span><div><strong>Vor Ort planen</strong><p>Leistung, Positionen und Leitungswege prüfen.</p></div></li>
          <li><span>03</span><div><strong>Sauber installieren</strong><p>Fachgerechte Montage durch unser Team.</p></div></li>
          <li><span>04</span><div><strong>Langfristig betreuen</strong><p>Wartung und Service aus der Region.</p></div></li>
        </ol>
      </section>

      <section className="projects" id="projekte">
        <div className="projects-heading">
          <div>
            <p className="eyebrow"><span /> Projekte aus der Region</p>
            <h2>Gebaut für echte<br />Anforderungen.</h2>
          </div>
          <p>
            Vom Einfamilienhaus bis zur Gewerbefläche: Unsere Referenzen zeigen,
            wie individuelle Planung in der Praxis aussieht.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-${index + 1}`} key={project.title}>
              <img src={project.image} alt={project.alt} />
              <div>
                <p>{project.eyebrow}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <a className="outline-button" href="/referenzen">Weitere Referenzen <span aria-hidden="true">→</span></a>
      </section>

      <section className="testimonial" aria-label="Kundenstimme">
        <div className="testimonial-mark" aria-hidden="true">“</div>
        <blockquote>
          „Das Team arbeitet professionell, sauber, flexibel und pünktlich.
          Auch der Kontakt war stets zügig und freundlich.“
        </blockquote>
        <p><strong>Andreas G.</strong><span>Google-Bewertung · 5 Sterne</span></p>
      </section>

      <section className="knowledge" id="wissen">
        <div className="knowledge-heading">
          <p className="eyebrow"><span /> Wissen statt Werbetexte</p>
          <h2>Antworten, bevor<br />Sie fragen müssen.</h2>
          <p>
            Praxisnahes Wissen hilft bei der Entscheidung – und macht die Seite
            für Menschen wie für Suchmaschinen wertvoll.
          </p>
        </div>
        <div className="article-list">
          <a href="/infos/klimaanlagen-bauarten/bauarten-klimaanlagen"><span>Ratgeber · 6 Min.</span><h3>Welche Klimaanlage passt zu welchem Raum?</h3><i aria-hidden="true">↗</i></a>
          <a href="/waermepumpe"><span>Wärmepumpe · 8 Min.</span><h3>Lohnt sich eine Wärmepumpe im Altbau?</h3><i aria-hidden="true">↗</i></a>
          <a href="/wissen"><span>Service · 4 Min.</span><h3>Warum regelmäßige Wartung Energie spart</h3><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <section className="inquiry" id="anfrage">
        <div className="inquiry-copy">
          <p className="eyebrow eyebrow-light"><span /> Ihr Projekt</p>
          <h2>Lassen Sie uns über<br /><em>Ihr Raumklima sprechen.</em></h2>
          <p>
            Erzählen Sie uns kurz, was Sie vorhaben. Wir melden uns persönlich
            und klären gemeinsam den nächsten sinnvollen Schritt.
          </p>
          <div className="contact-direct">
            <a href="tel:+4924519116960"><small>Telefon</small><strong>02451 911 69 60</strong></a>
            <a href="mailto:info@smartklimatisieren.de"><small>E-Mail</small><strong>info@smartklimatisieren.de</strong></a>
          </div>
        </div>

        <SmartInquiry compact />
      </section>
      <SiteFooter />
    </main>
  );
}
