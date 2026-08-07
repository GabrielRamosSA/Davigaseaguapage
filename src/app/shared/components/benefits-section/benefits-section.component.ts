import { Component } from '@angular/core';
import { benefits } from '../../../core/data/site-data';

@Component({
  selector: 'app-benefits-section',
  template: `
    <section class="section">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Por que escolher a Davi Gás?</span>
          <h2>Atendimento local, pedido fácil e foco em segurança</h2>
          <p>Conversa rápida, orientação direta e produtos para casa e comércio em Picos–PI.</p>
        </header>

        <div class="grid">
          @for (benefit of benefits; track benefit.title) {
            <article class="card">
              <div class="icon" aria-hidden="true">
                @switch (benefit.icon) {
                  @case ('location') {
                    <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.01 6.01 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/></svg>
                  }
                  @case ('chat') {
                    <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v16l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="M7 9h10M7 13h6"/></svg>
                  }
                  @case ('bag') {
                    <svg viewBox="0 0 24 24"><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
                  }
                  @default {
                    <svg viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4Z"/><path d="M9 12l2 2 4-4"/></svg>
                  }
                }
              </div>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section { padding: 10px 0 0; }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { max-width: 48rem; margin-bottom: 24px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.7rem, 4vw, 2.8rem); line-height: 1.05; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
    .grid { display: grid; gap: 14px; }
    .card {
      padding: 22px;
      border-radius: 26px;
      background: #fff;
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 14px 34px rgba(7, 47, 102, 0.08);
    }
    .icon {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      background: rgba(11, 77, 162, 0.08);
      color: #0b4da2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .icon svg { width: 24px; height: 24px; fill: currentColor; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    h3 { margin: 18px 0 0; color: #172033; font-size: 1.08rem; }
    .card p { margin-top: 10px; }
    @media (min-width: 720px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1100px) { .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  `],
})
export class BenefitsSectionComponent {
  readonly benefits = benefits;
}
