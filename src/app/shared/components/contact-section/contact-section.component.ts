import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { contactItems, brand } from '../../../core/data/site-data';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section section--soft" id="contato">
      <div class="shell">
        <header class="section__head">
          <span class="eyebrow">Contato</span>
          <h2>Fale conosco</h2>
          <p>Atendimento rápido pelo WhatsApp e telefone. Visite-nos ou envie sua mensagem.</p>
        </header>

        <div class="contact-grid">
          @for (item of contactItems; track item.label) {
            <div class="contact-card animate-fade-up">
              <div class="contact-card__icon">
                @if (item.icon === 'whatsapp') {
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M20.52 3.48A11.88 11.88 0 0 0 12 0C5.373 0 .05 4.96.05 11.09c0 1.95.51 3.86 1.48 5.55L0 24l7.66-2.01A11.85 11.85 0 0 0 12 22c6.627 0 11.95-4.96 11.95-11.09 0-2.97-1.2-5.76-3.43-7.42z" fill="#25D366"/>
                    <path d="M17.55 14.29c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.66.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2 0-.37-.05-.52-.05-.15-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.51-.18-.01-.38-.01-.58-.01-.2 0-.52.07-.79.37-.26.29-1 1-1 2.43 0 1.42 1.02 2.8 1.16 3 .14.2 2 3.04 4.85 4.27 1.4.6 2.5.96 3.36 1.23.78.24 1.49.2 2.05.12.63-.09 1.79-.73 2.04-1.43.25-.7.25-1.3.18-1.42-.07-.12-.26-.2-.56-.35z" fill="#fff"/>
                  </svg>
                } @else if (item.icon === 'phone') {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57.12.32.04.68-.25.95l-2.2 2.27z" fill="#0B4DA2"/>
                  </svg>
                } @else if (item.icon === 'location') {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="#0B4DA2"/>
                  </svg>
                } @else {
                  <span>{{ item.icon }}</span>
                }
              </div>
              <div class="contact-card__body">
                <h3 class="sr-only">{{ item.label }}</h3>
                <a href="{{ item.href }}" target="_blank" rel="noopener noreferrer">{{ item.value }}</a>
              </div>
            </div>
          }
        </div>

        <div class="map">
          <iframe
            title="Localização Davi Gás"
            src="${brand.mapsQuery}"
            width="100%"
            height="320"
            style="border:0;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  `,
  styles: [
    `:host { display:block; }
    .section { padding: 54px 0; }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .contact-grid { display: grid; gap: 14px; margin-top: 18px; }
    .contact-card { display:flex; gap:12px; align-items:center; padding:14px; border-radius:12px; background:#fff; border:1px solid rgba(7,47,102,0.06); }
    .contact-card__icon { width:48px; height:48px; display:flex; align-items:center; justify-content:center; background:rgba(11,77,162,0.08); border-radius:999px; font-weight:800; }
    .contact-card__body h3 { margin:0; font-size:1rem; }
    .contact-card__body a { color:#0b4da2; font-weight:700; text-decoration:none; }
    .map { margin-top:18px; border-radius:12px; overflow:hidden; }
    @media (min-width:760px) { .contact-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
    .sr-only { position: absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
    .animate-fade-up { animation: fadeUp 560ms ease both; }
    @keyframes fadeUp { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
    `,
  ],
})
export class ContactSectionComponent {
  readonly contactItems = contactItems;
}
