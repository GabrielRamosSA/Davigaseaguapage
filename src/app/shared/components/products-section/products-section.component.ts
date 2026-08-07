import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { products } from '../../../core/data/site-data';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-section',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <section class="section" id="produtos">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Produtos</span>
          <h2>Catálogo pensado para pedido rápido</h2>
          <p>Escolha o item, consulte o valor pelo WhatsApp e finalize sem complicação.</p>
        </header>

        <div class="grid">
          @for (product of displayedProducts; track product.id) {
            <app-product-card [product]="product" />
          }
        </div>

        <div class="section__footer">
          <a routerLink="/produtos" class="button">Ver catálogo completo</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .section { padding: 54px 0; }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .section__head { max-width: 46rem; margin-bottom: 24px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h2 { margin: 12px 0 0; color: #172033; font-size: clamp(1.7rem, 4vw, 2.8rem); line-height: 1.05; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
    .grid { display: grid; gap: 18px; }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 20px;
      border-radius: 999px;
      background: #0b4da2;
      color: #fff;
      text-decoration: none;
      font-weight: 800;
    }
    .section__footer { margin-top: 24px; display: flex; justify-content: center; }
    @media (min-width: 720px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1100px) { .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  `],
})
export class ProductsSectionComponent {
  readonly displayedProducts = products;
}
