import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { BenefitsSectionComponent } from '../../shared/components/benefits-section/benefits-section.component';
import { HowItWorksSectionComponent } from '../../shared/components/how-it-works-section/how-it-works-section.component';
import { ProductsSectionComponent } from '../../shared/components/products-section/products-section.component';
import { OrderSectionComponent } from '../../shared/components/order-section/order-section.component';
import { ResellersSectionComponent } from '../../shared/components/resellers-section/resellers-section.component';
import { ContactSectionComponent } from '../../shared/components/contact-section/contact-section.component';
import { FaqSectionComponent } from '../../shared/components/faq-section/faq-section.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    BenefitsSectionComponent,
    HowItWorksSectionComponent,
    ProductsSectionComponent,
    OrderSectionComponent,
    ResellersSectionComponent,
    ContactSectionComponent,
    FaqSectionComponent,
  ],
  template: `
    <app-hero />
    <app-benefits-section />
    <app-how-it-works-section />
    <app-products-section />
    <app-order-section />
    <app-resellers-section />
    <app-contact-section />
    <app-faq-section />
  `,
})
export class HomeComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'Davi Gás | Entrega de Gás e Água em Picos–PI',
      description:
        'Peça gás de cozinha, botijão P13, P45, água mineral e acessórios na Davi Gás, em Picos–PI. Faça seu pedido pelo WhatsApp.',
      path: '/',
    });
  }
}
