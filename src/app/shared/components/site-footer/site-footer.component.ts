import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand, contactItems, navLinks, products } from '../../../core/data/site-data';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__brand">
          <img [ngSrc]="brand.logo" width="56" height="56" alt="Logomarca da Davi Gás" priority />
          <div>
            <strong>Davi Gás</strong>
            <p>Gás e água com atendimento local em Picos–PI.</p>
          </div>
        </div>

        <div class="footer__columns">
          <div>
            <h2>Navegação</h2>
            @for (link of navLinks; track link.path) {
              <a [routerLink]="link.path">{{ link.label }}</a>
            }
          </div>

          <div>
            <h2>Produtos</h2>
            @for (item of footerProducts; track item.id) {
              <a [routerLink]="'/produtos'">{{ item.name }}</a>
            }
          </div>

          <div>
            <h2>Contato</h2>
            @for (item of contactItems; track item.label) {
              @if (item.href) {
                <a [href]="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }}: {{ item.value }}</a>
              } @else {
                <span>{{ item.label }}: {{ item.value }}</span>
              }
            }
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ currentYear }} Davi Gás. Todos os direitos reservados.</p>
        <a class="footer__whatsapp" [href]="whatsappHref" target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp</a>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .footer {
      background: linear-gradient(180deg, #072f66 0%, #061e41 100%);
      color: rgba(255, 255, 255, 0.9);
      margin-top: 40px;
    }
    .footer__top,
    .footer__bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 20px;
    }
    .footer__top {
      display: grid;
      gap: 28px;
    }
    .footer__brand {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }
    .footer__brand img {
      border-radius: 18px;
      object-fit: cover;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    }
    .footer__brand strong {
      display: block;
      font-size: 1.1rem;
      color: #fff;
    }
    .footer__brand p {
      margin: 8px 0 0;
      max-width: 30rem;
      color: rgba(255, 255, 255, 0.72);
    }
    .footer__columns {
      display: grid;
      gap: 24px;
    }
    .footer__columns h2 {
      margin: 0 0 12px;
      font-size: 0.95rem;
      color: #ffd200;
    }
    .footer__columns a,
    .footer__columns span {
      display: block;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.82);
      text-decoration: none;
    }
    .footer__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
    .footer__whatsapp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0 18px;
      border-radius: 999px;
      background: #ffd200;
      color: #061e41;
      font-weight: 800;
      text-decoration: none;
    }
    @media (min-width: 900px) {
      .footer__top {
        grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
        align-items: start;
      }
      .footer__columns {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    @media (max-width: 700px) {
      .footer__bottom { flex-direction: column; align-items: flex-start; }
    }
  `],
})
export class SiteFooterComponent {
  readonly brand = brand;
  readonly navLinks = navLinks;
  readonly footerProducts = products.slice(0, 4);
  readonly contactItems = contactItems;
  readonly currentYear = new Date().getFullYear();
  readonly whatsappHref = inject(WhatsappService).buildLink('Olá! Acessei o site da Davi Gás e gostaria de fazer um pedido.');
}
