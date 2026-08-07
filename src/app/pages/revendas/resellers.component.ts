import { Component, inject } from '@angular/core';
import { ResellersSectionComponent } from '../../shared/components/resellers-section/resellers-section.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-resellers',
  imports: [ResellersSectionComponent],
  template: `
    <section class="intro">
      <div class="intro__bg"></div>
      <div class="shell">
        <span class="eyebrow">Localização</span>
        <h1>Revenda e localização | Davi Gás em Picos–PI</h1>
        <p>Confira o endereço da revenda e abra o mapa para chegar com facilidade.</p>
        <div class="intro__meta">
          <span>Picos–PI</span>
          <span>Rua Santa Rita, 1719</span>
          <span>WhatsApp e telefone direto</span>
        </div>
      </div>
    </section>
    <app-resellers-section />
  `,
  styles: [`
    :host { display: block; }
    .intro {
      position: relative;
      overflow: hidden;
      padding: 40px 0 12px;
      background:
        radial-gradient(circle at 8% 10%, rgba(11, 77, 162, 0.08), transparent 24%),
        linear-gradient(180deg, rgba(247, 249, 252, 0.9), rgba(255, 255, 255, 1));
    }
    .intro__bg {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(11, 77, 162, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 77, 162, 0.04) 1px, transparent 1px);
      background-size: 30px 30px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 95%);
      pointer-events: none;
      opacity: 0.4;
    }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h1 { margin: 12px 0 0; color: #172033; font-size: clamp(2rem, 5vw, 3.8rem); line-height: 1; letter-spacing: -0.03em; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; max-width: 42rem; }
    .intro__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
    }
    .intro__meta span {
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
  `],
})
export class ResellersComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Contato e Localização | Davi Gás em Picos–PI',
      description:
        'Encontre a Davi Gás em Picos–PI, veja o endereço e abra o mapa para chegar com facilidade.',
      path: '/revendas',
    });
  }
}
