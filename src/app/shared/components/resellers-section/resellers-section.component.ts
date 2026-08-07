import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { brand, resellerUnits } from '../../../core/data/site-data';

@Component({
  selector: 'app-resellers-section',
  imports: [],
  template: `
    <section class="section">
      <div class="section__bg"></div>
      <div class="shell">
        <header class="section__head animate-fade-up">
          <span class="eyebrow">Revenda e localização</span>
          <h2>Visite a Davi Gás em Picos–PI</h2>
          <p>Endereço confirmado, contato direto e mapa incorporado para facilitar a localização.</p>
          <div class="chips" aria-label="Destaques da revenda">
            <span class="chip">Atendimento em Picos</span>
            <span class="chip">Mapa interativo</span>
            <span class="chip">Gás e água</span>
          </div>
        </header>

        <div class="grid">
          <article class="card card--info animate-fade-up">
            <div class="card__topline">
              <span class="card__label">Revenda oficial</span>
              <span class="card__badge">Aberto para pedidos</span>
            </div>

            <h3>{{ units[0].name }}</h3>
            <p class="card__lead">{{ units[0].address }}</p>

            <div class="contact-list">
              <a [href]="brand.phoneLandlineHref" class="contact-item">
                <span class="contact-item__icon">☎</span>
                <span>
                  <strong>Telefone</strong>
                  <small>{{ units[0].phone }}</small>
                </span>
              </a>

              <a [href]="brand.whatsappHref" target="_blank" rel="noopener noreferrer" class="contact-item">
                <span class="contact-item__icon contact-item__icon--whatsapp">◎</span>
                <span>
                  <strong>WhatsApp</strong>
                  <small>{{ units[0].whatsapp }}</small>
                </span>
              </a>
            </div>

            <div class="actions">
              <a class="button" [href]="brand.mapsLink" target="_blank" rel="noopener noreferrer">Abrir no Google Maps</a>
              <p>Rua Santa Rita, 1719, Picos–PI</p>
            </div>
          </article>

          <div class="map-wrap animate-fade-up" id="revenda-map-container">
            <div class="map-topbar">
              <div>
                <span class="map-topbar__eyebrow">Mapa da revenda</span>
                <strong>Localização da Davi Gás e ponto da água</strong>
              </div>
              <span class="map-topbar__pill">Ao vivo</span>
            </div>
            @if (mapReady()) {
              <div id="revenda-map" class="map-canvas"></div>
            } @else {
              <iframe
                class="map-canvas map-canvas--fallback"
                [src]="fallbackMapUrl"
                title="Mapa da revenda Davi Gás em Picos–PI"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            }
            <div class="map-footnote">
              <span class="legend legend--store">Davi Gás</span>
              <span class="legend legend--water">Água</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section {
      position: relative;
      padding: 72px 0;
      overflow: hidden;
      background:
        radial-gradient(circle at 8% 12%, rgba(11, 77, 162, 0.08), transparent 24%),
        radial-gradient(circle at 92% 0%, rgba(255, 210, 0, 0.16), transparent 20%),
        linear-gradient(180deg, rgba(247, 249, 252, 0.7), rgba(255, 255, 255, 1));
    }
    .section__bg {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(11, 77, 162, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 77, 162, 0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,0.7), transparent 92%);
      pointer-events: none;
      opacity: 0.35;
    }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { position: relative; max-width: 50rem; margin-bottom: 26px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.8rem, 4vw, 3.1rem); line-height: 1.02; letter-spacing: -0.03em; }
    .section__head > p { margin: 12px 0 0; color: #52607a; line-height: 1.65; max-width: 42rem; }
    .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
    .chip {
      display: inline-flex;
      align-items: center;
      min-height: 38px;
      padding: 0 14px;
      border-radius: 999px;
      background: rgba(11, 77, 162, 0.08);
      color: #0b4da2;
      font-weight: 800;
      font-size: 0.88rem;
    }
    .grid {
      display: grid;
      gap: 18px;
      position: relative;
      z-index: 1;
    }
    .card,
    .map-wrap {
      border-radius: 30px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 18px 44px rgba(7, 47, 102, 0.08);
      backdrop-filter: blur(10px);
    }
    .card--info {
      padding: 24px;
      display: grid;
      gap: 18px;
      align-content: start;
    }
    .card__topline {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .card__label {
      color: #0b4da2;
      font-size: 0.84rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .card__badge,
    .map-topbar__pill {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      background: rgba(36, 183, 93, 0.12);
      color: #13803d;
      font-size: 0.84rem;
      font-weight: 800;
    }
    .card h3 {
      margin: 0;
      color: #172033;
      font-size: 1.35rem;
      letter-spacing: -0.02em;
    }
    .card__lead {
      margin: 0;
      color: #52607a;
      line-height: 1.7;
    }
    .contact-list {
      display: grid;
      gap: 12px;
    }
    .contact-item {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 14px 16px;
      border-radius: 20px;
      text-decoration: none;
      background: linear-gradient(180deg, #fff, #f7f9fc);
      border: 1px solid rgba(7, 47, 102, 0.08);
      color: #172033;
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
    }
    .contact-item:hover {
      transform: translateY(-2px);
      border-color: rgba(11, 77, 162, 0.18);
      box-shadow: 0 12px 24px rgba(7, 47, 102, 0.08);
    }
    .contact-item__icon {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: rgba(11, 77, 162, 0.1);
      color: #0b4da2;
      font-size: 1rem;
      font-weight: 900;
      flex: none;
    }
    .contact-item__icon--whatsapp {
      background: rgba(37, 211, 102, 0.14);
      color: #128c7e;
    }
    .contact-item strong,
    .contact-item small {
      display: block;
    }
    .contact-item strong {
      font-size: 0.96rem;
    }
    .contact-item small {
      color: #52607a;
      font-size: 0.92rem;
      font-weight: 600;
      margin-top: 2px;
    }
    .actions {
      display: grid;
      gap: 10px;
      margin-top: 2px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      padding: 0 20px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      background: linear-gradient(135deg, #0b4da2, #0a63d9);
      color: #fff;
      box-shadow: 0 14px 30px rgba(11, 77, 162, 0.2);
    }
    .actions p { margin: 0; color: #52607a; font-size: 0.92rem; }
    .map-wrap {
      min-height: 420px;
      display: grid;
      grid-template-rows: auto minmax(320px, 1fr) auto;
    }
    .map-topbar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      padding: 18px 18px 0;
    }
    .map-topbar__eyebrow {
      display: block;
      color: #0b4da2;
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }
    .map-topbar strong {
      display: block;
      color: #172033;
      font-size: 1rem;
    }
    .map-canvas {
      width: 100%;
      min-height: 320px;
      height: 100%;
      border-radius: 24px;
      overflow: hidden;
      margin: 14px;
      margin-bottom: 0;
      background: linear-gradient(135deg, rgba(11, 77, 162, 0.05), rgba(255, 210, 0, 0.08));
    }
    .map-canvas--fallback {
      border: 0;
    }
    .map-footnote {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      padding: 14px 18px 18px;
    }
    .legend {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 0 12px;
      border-radius: 999px;
      font-size: 0.84rem;
      font-weight: 800;
      background: #f7f9fc;
      border: 1px solid rgba(7, 47, 102, 0.08);
      color: #172033;
    }
    .legend::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 999px;
      margin-right: 8px;
    }
    .legend--store::before { background: #0b4da2; }
    .legend--water::before { background: #24b75d; }
    @media (min-width: 960px) {
      .grid { grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr); align-items: stretch; gap: 24px; }
    }
    @media (max-width: 959px) {
      .section { padding: 60px 0; }
      .map-wrap { min-height: 380px; }
    }
  `],
})
export class ResellersSectionComponent implements AfterViewInit {
  readonly brand = brand;
  readonly units = resellerUnits;
  readonly mapReady = signal(false);
  readonly fallbackMapUrl: SafeResourceUrl;

  constructor() {
    this.fallbackMapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(brand.mapsQuery);
  }

  ngAfterViewInit(): void {
    // Initialize Leaflet map if available (loaded via CDN in index.html)
    if (typeof window === 'undefined') return;
    const L = (window as any).L;
    if (!L) return;

    // Approximate coordinates for Picos–PI and a nearby water marker
    const daviCoords: [number, number] = [-7.0796, -41.4707];
    const waterCoords: [number, number] = [-7.0806, -41.4697];

    const map = L.map('revenda-map', { center: daviCoords as any, zoom: 16, scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const storeMarker = L.marker(daviCoords as any).addTo(map).bindPopup(`<strong>${this.units[0].name}</strong><br/>${this.units[0].address}`);
    const waterMarker = L.marker(waterCoords as any).addTo(map).bindPopup(`<strong>Água (garrafão)<\/strong><br/>Disponível na revenda`);

    // Fit both markers
    const group = L.featureGroup([storeMarker, waterMarker]);
    map.fitBounds(group.getBounds().pad(0.4));
    this.mapReady.set(true);
  }
}
