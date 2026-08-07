import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="shell">
        <span class="eyebrow">Página não encontrada</span>
        <h1>404</h1>
        <p>A página solicitada não está disponível. Volte para a página inicial ou veja o catálogo.</p>
        <div class="actions">
          <a routerLink="/" class="button button--primary">Ir para o início</a>
          <a routerLink="/produtos" class="button button--secondary">Ver produtos</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .not-found { min-height: calc(100vh - 180px); display: grid; place-items: center; padding: 40px 0; }
    .shell { max-width: 720px; padding: 0 20px; text-align: center; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h1 { margin: 14px 0 0; color: #172033; font-size: clamp(4rem, 18vw, 8rem); line-height: 0.9; }
    p { margin: 16px 0 0; color: #52607a; line-height: 1.65; }
    .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 24px; }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 20px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
    }
    .button--primary { background: #0b4da2; color: #fff; }
    .button--secondary { background: #fff; color: #0b4da2; border: 1px solid rgba(11, 77, 162, 0.12); }
  `],
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Página não encontrada | Davi Gás',
      description: 'A página solicitada não foi encontrada no site da Davi Gás.',
      path: '/404',
    });
  }
}
