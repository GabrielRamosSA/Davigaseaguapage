import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../../core/services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-floating-button',
  template: `
    <a
      class="float"
      [href]="whatsappHref"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Peça pelo WhatsApp"
      title="Peça pelo WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88"/></svg>
      <span>Peça pelo WhatsApp</span>
    </a>
  `,
  styles: [`
    :host { display: contents; }
    .float {
      position: fixed;
      right: 16px;
      bottom: calc(16px + env(safe-area-inset-bottom));
      z-index: 50;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      min-height: 54px;
      padding: 0 18px;
      border-radius: 999px;
      background: #25d366;
      color: #fff;
      text-decoration: none;
      font-weight: 800;
      box-shadow: 0 16px 32px rgba(37, 211, 102, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .float:hover,
    .float:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 20px 36px rgba(37, 211, 102, 0.36);
    }
    .float svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
      flex: none;
    }
    @media (max-width: 700px) {
      .float { width: 58px; padding: 0; justify-content: center; }
      .float span { display: none; }
    }
  `],
})
export class WhatsappFloatingButtonComponent {
  readonly whatsappHref = inject(WhatsappService).buildLink('Olá! Acessei o site da Davi Gás e gostaria de fazer um pedido.');
}
