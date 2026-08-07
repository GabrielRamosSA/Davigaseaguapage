import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from '../../../core/data/site-data';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <section class="hero">
      <div class="hero__shell">
        <div class="hero__content">
          <span class="eyebrow">Atendimento em Picos–PI</span>
          <h1>Gás e água entregues com rapidez e segurança em Picos</h1>
          <p>
            Peça seu botijão de gás, água mineral ou acessórios diretamente pelo WhatsApp.
            Atendimento rápido e próximo de você.
          </p>

          <div class="hero__actions">
            <a class="button button--primary" [href]="whatsappHref" target="_blank" rel="noopener noreferrer">Pedir gás agora</a>
            <a class="button button--secondary" routerLink="/produtos">Ver produtos</a>
          </div>

          <ul class="hero__notes">
            <li>Atendimento em Picos–PI</li>
            <li>Pedido rápido pelo WhatsApp</li>
            <li>Residências e estabelecimentos</li>
          </ul>
        </div>

        <div class="hero__visual">
          <div class="hero__image-wrap">
            <img
              [ngSrc]="brand.heroImage"
              fill
              priority
              alt="Fachada da Davi Gás em Picos"
              class="hero__image"
            />
            <div class="hero__card hero__card--top">Pedido direto no WhatsApp</div>
            <div class="hero__card hero__card--bottom">Segurança e atendimento local</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .hero {
      padding: 24px 0 10px;
      background:
        radial-gradient(circle at top left, rgba(255, 210, 0, 0.18), transparent 32%),
        radial-gradient(circle at 90% 8%, rgba(11, 77, 162, 0.18), transparent 28%),
        linear-gradient(180deg, #f7f9fc 0%, #f3f6fb 100%);
    }
    .hero__shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 14px 20px 56px;
      display: grid;
      gap: 28px;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(11, 77, 162, 0.08);
      color: #0b4da2;
      font-size: 0.84rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    h1 {
      margin: 18px 0 0;
      color: #172033;
      font-size: clamp(2.2rem, 6vw, 4.7rem);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }
    p {
      margin: 18px 0 0;
      max-width: 36rem;
      color: #52607a;
      line-height: 1.7;
      font-size: 1.03rem;
    }
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 26px;
    }
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 20px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 800;
      border: 1px solid transparent;
    }
    .button--primary {
      background: #0b4da2;
      color: #fff;
      box-shadow: 0 14px 28px rgba(11, 77, 162, 0.18);
    }
    .button--secondary {
      background: #fff;
      color: #0b4da2;
      border-color: rgba(11, 77, 162, 0.12);
    }
    .hero__notes {
      margin: 20px 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .hero__notes li {
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.78);
      color: #24324c;
      border: 1px solid rgba(7, 47, 102, 0.08);
    }
    .hero__visual {
      display: flex;
      justify-content: center;
    }
    .hero__image-wrap {
      position: relative;
      width: min(100%, 560px);
      min-height: 320px;
      border-radius: 32px;
      overflow: hidden;
      background: linear-gradient(160deg, rgba(11, 77, 162, 0.08), rgba(255, 210, 0, 0.14));
      box-shadow: 0 28px 64px rgba(7, 47, 102, 0.12);
      isolation: isolate;
    }
    .hero__image {
      object-fit: cover;
    }
    .hero__card {
      position: absolute;
      z-index: 1;
      padding: 12px 14px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.9);
      color: #172033;
      font-weight: 700;
      box-shadow: 0 14px 28px rgba(7, 47, 102, 0.14);
      backdrop-filter: blur(10px);
    }
    .hero__card--top { top: 18px; left: 18px; }
    .hero__card--bottom { right: 18px; bottom: 18px; }
    @media (min-width: 980px) {
      .hero__shell { grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); align-items: center; }
      .hero { padding-top: 34px; }
      .hero__visual { justify-content: flex-end; }
    }
  `],
})
export class HeroComponent {
  readonly brand = brand;
  readonly whatsappHref = 'https://wa.me/5589994205500';
}
