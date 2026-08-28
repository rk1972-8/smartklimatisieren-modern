'use client';

import { useMemo, useState } from 'react';

type Inquiry = {
  project: string;
  building: string;
  rooms: string;
  area: string;
  location: string;
  timing: string;
  name: string;
  email: string;
  phone: string;
};

const initialInquiry: Inquiry = {
  project: '', building: '', rooms: '', area: '', location: '', timing: '', name: '', email: '', phone: '',
};

function analyze(text: string): Partial<Inquiry> {
  const normalized = text.toLocaleLowerCase('de');
  const roomMatch = normalized.match(/(\d+)\s*(?:räume|raeume|zimmer|innengeräte|innengeraete)/);
  const areaMatch = normalized.match(/(\d{2,4})\s*(?:m²|m2|qm|quadratmeter)/);
  const locationMatch = text.match(/\b\d{5}\b/);
  let project = '';
  if (/wärmepumpe|waermepumpe|heizung|heizen/.test(normalized)) project = 'Wärmepumpe';
  else if (/kälte|kaelte|kühlraum|kuehlraum|gewerbekühl|gewerbekuehl/.test(normalized)) project = 'Kältetechnik';
  else if (/klima|kühlen|kuehlen|split|innengerät|innengeraet/.test(normalized)) project = 'Klimaanlage';

  let building = '';
  if (/einfamilien|haus|wohnung|schlafzimmer|wohnzimmer/.test(normalized)) building = 'Wohngebäude';
  else if (/büro|buero|praxis|laden|gewerbe|halle|betrieb/.test(normalized)) building = 'Gewerbe';
  else if (/neubau/.test(normalized)) building = 'Neubau';

  return {
    project,
    building,
    rooms: roomMatch?.[1] ?? '',
    area: areaMatch?.[1] ?? '',
    location: locationMatch?.[0] ?? '',
  };
}

export function SmartInquiry({ compact = false }: { compact?: boolean }) {
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1);
  const [inquiry, setInquiry] = useState<Inquiry>(initialInquiry);

  const summary = useMemo(() => [
    inquiry.project && `Vorhaben: ${inquiry.project}`,
    inquiry.building && `Gebäude: ${inquiry.building}`,
    inquiry.rooms && `Räume / Innengeräte: ${inquiry.rooms}`,
    inquiry.area && `Fläche: ca. ${inquiry.area} m²`,
    inquiry.location && `Ort / PLZ: ${inquiry.location}`,
    inquiry.timing && `Zeitraum: ${inquiry.timing}`,
  ].filter(Boolean), [inquiry]);

  function update(field: keyof Inquiry, value: string) {
    setInquiry((current) => ({ ...current, [field]: value }));
  }

  function classify() {
    setInquiry((current) => ({ ...current, ...analyze(description) }));
    setStep(2);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const body = [
      'Neue Smart-Anfrage über smartklimatisieren',
      '',
      ...summary,
      '',
      `Beschreibung: ${description || 'keine Freitextbeschreibung'}`,
      '',
      `Name: ${inquiry.name}`,
      `E-Mail: ${inquiry.email}`,
      `Telefon: ${inquiry.phone || 'nicht angegeben'}`,
    ].join('\n');
    window.location.href = `mailto:info@smartklimatisieren.de?subject=${encodeURIComponent(`Projektanfrage ${inquiry.project || 'Klima & Wärme'}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className={`smart-inquiry ${compact ? 'smart-inquiry-compact' : ''}`}>
      <div className="assistant-head">
        <div className="assistant-orb" aria-hidden="true"><i /><i /><i /></div>
        <div><p>Smart-Anfrage</p><span>Digitale Vorprüfung · persönliche Fachberatung</span></div>
        <strong>Schritt {step} / 2</strong>
      </div>

      {step === 1 ? (
        <div className="assistant-step">
          <div className="assistant-message">
            <span aria-hidden="true">SK</span>
            <p>Beschreiben Sie Ihr Vorhaben einfach in eigenen Worten. Zum Beispiel: „Ich möchte drei Schlafzimmer mit einer leisen Klimaanlage ausstatten.“</p>
          </div>
          <label className="assistant-prompt">
            <span>Was möchten Sie klimatisieren oder beheizen?</span>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={compact ? 4 : 5} placeholder="Gebäude, Räume, ungefährer Bedarf, Ort …" />
          </label>
          <button className="assistant-button" type="button" onClick={classify} disabled={description.trim().length < 12}>
            Vorhaben einordnen <span aria-hidden="true">→</span>
          </button>
          <small>Die Vorprüfung findet auf dieser Seite statt. Es werden dabei keine Daten gespeichert oder automatisch versendet.</small>
        </div>
      ) : (
        <form className="assistant-step" onSubmit={submit}>
          <div className="assistant-message assistant-message-success">
            <span aria-hidden="true">✓</span>
            <p>Ich habe die ersten Eckdaten erkannt. Bitte prüfen und ergänzen Sie die Angaben – danach wird eine übersichtliche E-Mail für das Fachteam vorbereitet.</p>
          </div>
          <div className="assistant-fields">
            <label><span>Vorhaben</span><select required value={inquiry.project} onChange={(event) => update('project', event.target.value)}><option value="">Bitte wählen</option><option>Klimaanlage</option><option>Wärmepumpe</option><option>Kältetechnik</option><option>Service / Reparatur</option></select></label>
            <label><span>Gebäude</span><select required value={inquiry.building} onChange={(event) => update('building', event.target.value)}><option value="">Bitte wählen</option><option>Wohngebäude</option><option>Gewerbe</option><option>Neubau</option><option>Sonstiges</option></select></label>
            <label><span>Räume / Innengeräte</span><input inputMode="numeric" value={inquiry.rooms} onChange={(event) => update('rooms', event.target.value)} placeholder="z. B. 3" /></label>
            <label><span>Fläche in m²</span><input inputMode="numeric" value={inquiry.area} onChange={(event) => update('area', event.target.value)} placeholder="z. B. 85" /></label>
            <label><span>Ort / PLZ</span><input required value={inquiry.location} onChange={(event) => update('location', event.target.value)} placeholder="z. B. 52511" /></label>
            <label><span>Gewünschter Zeitraum</span><select value={inquiry.timing} onChange={(event) => update('timing', event.target.value)}><option value="">Noch offen</option><option>So bald wie möglich</option><option>In 1–3 Monaten</option><option>In 3–6 Monaten</option><option>Später / nur Beratung</option></select></label>
            <label><span>Name</span><input required autoComplete="name" value={inquiry.name} onChange={(event) => update('name', event.target.value)} /></label>
            <label><span>E-Mail</span><input required type="email" autoComplete="email" value={inquiry.email} onChange={(event) => update('email', event.target.value)} /></label>
            <label className="assistant-field-wide"><span>Telefon (optional)</span><input type="tel" autoComplete="tel" value={inquiry.phone} onChange={(event) => update('phone', event.target.value)} /></label>
          </div>
          {summary.length > 0 && <div className="assistant-summary"><p>Erkannte Eckdaten</p>{summary.map((line) => <span key={line}>{line}</span>)}</div>}
          <div className="assistant-final-actions">
            <button type="button" onClick={() => setStep(1)}>← Zurück</button>
            <button className="assistant-button" type="submit">Anfrage als E-Mail vorbereiten <span aria-hidden="true">→</span></button>
          </div>
          <small>Noch keine automatische Planung oder Preisberechnung: Die endgültige Empfehlung erfolgt persönlich nach fachlicher Prüfung.</small>
        </form>
      )}
    </div>
  );
}
