import { Component, signal } from '@angular/core';
import { faqItems } from '../../../core/data/site-data';

@Component({
  selector: 'app-faq-section',
  template: `
    <section class="section section--soft">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Perguntas frequentes</span>
          <h2>Dúvidas comuns antes de pedir</h2>
          <p>Respostas objetivas, sem prometer informações que não foram confirmadas.</p>
        </header>

        <div class="accordion">
          @for (item of faqItems; track item.id) {
            <article class="item">
              <button
                type="button"
                class="trigger"
                (click)="toggle(item.id)"
                [attr.aria-expanded]="openId() === item.id"
                [attr.aria-controls]="'panel-' + item.id"
              >
                <span>{{ item.question }}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
              </button>

              @if (openId() === item.id) {
                <div class="panel" [id]="'panel-' + item.id" role="region">
                  <p>{{ item.answer }}</p>
                </div>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section { padding: 54px 0; }
    .section--soft { background: linear-gradient(180deg, rgba(11, 77, 162, 0.04), rgba(255, 255, 255, 0)); }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { max-width: 46rem; margin-bottom: 24px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.7rem, 4vw, 2.8rem); line-height: 1.05; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
    .accordion { display: grid; gap: 12px; }
    .item {
      border-radius: 22px;
      overflow: hidden;
      background: #fff;
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 12px 28px rgba(7, 47, 102, 0.06);
    }
    .trigger {
      width: 100%;
      min-height: 56px;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      text-align: left;
      border: 0;
      background: transparent;
      color: #172033;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }
    .trigger svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; flex: none; }
    .panel { padding: 0 18px 18px; }
    .panel p { margin: 0; }
  `],
})
export class FaqSectionComponent {
  readonly faqItems = faqItems;
  readonly openId = signal<string | null>(faqItems[0]?.id ?? null);

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
