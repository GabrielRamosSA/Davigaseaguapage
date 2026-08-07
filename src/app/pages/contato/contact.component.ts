import { Component, inject } from '@angular/core';
import { ContactSectionComponent } from '../../shared/components/contact-section/contact-section.component';
import { OrderSectionComponent } from '../../shared/components/order-section/order-section.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [ContactSectionComponent, OrderSectionComponent],
  template: `
    <section class="intro">
      <div class="shell">
        <span class="eyebrow">Contato</span>
        <h1>Contato e pedidos | Davi Gás em Picos–PI</h1>
        <p>Fale pelos canais oficiais e envie seu pedido pelo WhatsApp.</p>
      </div>
    </section>
    <app-contact-section />
    <app-order-section />
  `,
  styles: [`
    :host { display: block; }
    .intro { padding: 34px 0 6px; }
    .shell { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .eyebrow { color: #0b4da2; font-size: 0.84rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
    h1 { margin: 12px 0 0; color: #172033; font-size: clamp(2rem, 5vw, 3.8rem); line-height: 1; }
    p { margin: 12px 0 0; color: #52607a; line-height: 1.65; }
  `],
})
export class ContactComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Contato e Localização | Davi Gás em Picos–PI',
      description:
        'Veja os contatos da Davi Gás em Picos–PI e envie seu pedido pelo WhatsApp.',
      path: '/contato',
    });
  }
}
