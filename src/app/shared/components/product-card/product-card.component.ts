import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../core/models/site-data.models';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage],
  template: `
    <article class="card" [attr.id]="product().id">
      <div class="card__media">
        <img [ngSrc]="product().image" fill [alt]="product().name" class="card__image" />
        @if (product().brand) {
          <span class="card__badge">{{ product().brand }}</span>
        }
      </div>

      <div class="card__body">
        <p class="card__category">{{ product().category }}</p>
        <h3>{{ product().name }}</h3>
        <p class="card__description">{{ product().description }}</p>

        <ul class="card__highlights" aria-label="Destaques do produto">
          @for (highlight of product().highlights; track highlight) {
            <li>{{ highlight }}</li>
          }
        </ul>

        <details class="card__details">
          <summary>Ver detalhes</summary>
          <p>Consulte a disponibilidade, valores e combinações de entrega diretamente pelo WhatsApp.</p>
        </details>

        <div class="card__actions">
          <a class="button button--primary" [href]="whatsappLink()" target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp</a>
          <a class="button button--secondary" [href]="'#' + product().id">Ver detalhes</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host { display: block; }
    .card {
      height: 100%;
      overflow: hidden;
      border-radius: 28px;
      background: #fff;
      border: 1px solid rgba(7, 47, 102, 0.08);
      box-shadow: 0 14px 40px rgba(7, 47, 102, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .card:hover,
    .card:focus-within {
      transform: translateY(-4px);
      box-shadow: 0 18px 44px rgba(7, 47, 102, 0.12);
    }
    .card__media {
      position: relative;
      min-height: 220px;
      background: linear-gradient(180deg, rgba(11, 77, 162, 0.06), rgba(255, 210, 0, 0.08));
    }
    .card__image {
      object-fit: contain;
      padding: 18px;
    }
    .card__badge {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(7, 47, 102, 0.88);
      color: #fff;
      font-size: 0.78rem;
      font-weight: 700;
    }
    .card__body {
      display: grid;
      gap: 14px;
      padding: 22px;
    }
    .card__category {
      margin: 0;
      color: #0b4da2;
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .card__body h3 {
      margin: 0;
      color: #172033;
      font-size: 1.2rem;
      line-height: 1.25;
    }
    .card__description {
      margin: 0;
      color: #51607a;
      line-height: 1.6;
    }
    .card__highlights {
      margin: 0;
      padding-left: 18px;
      color: #24324c;
      display: grid;
      gap: 8px;
    }
    .card__details summary {
      cursor: pointer;
      color: #0b4da2;
      font-weight: 700;
      list-style: none;
    }
    .card__details summary::-webkit-details-marker { display: none; }
    .card__details p {
      margin: 12px 0 0;
      color: #51607a;
    }
    .card__actions {
      display: grid;
      gap: 10px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 18px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      border: 1px solid transparent;
    }
    .button--primary {
      background: #0b4da2;
      color: #fff;
    }
    .button--secondary {
      background: rgba(11, 77, 162, 0.06);
      color: #0b4da2;
      border-color: rgba(11, 77, 162, 0.12);
    }
  `],
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  private readonly whatsapp = inject(WhatsappService);

  readonly whatsappLink = computed(() => this.whatsapp.buildLink(this.whatsapp.buildProductMessage(this.product())));
}
