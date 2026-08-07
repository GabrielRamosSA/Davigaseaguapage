import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';
import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';
import { WhatsappFloatingButtonComponent } from './shared/components/whatsapp-floating-button/whatsapp-floating-button.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, WhatsappFloatingButtonComponent],
  template: `
    <a class="skip-link" href="#main-content">Pular para o conteúdo principal</a>
    <app-site-header />
    <main id="main-content" class="main">
      <router-outlet />
    </main>
    <app-site-footer />
    <app-whatsapp-floating-button />
  `,
  styles: [`
    :host { display: block; }
    .main { min-height: 100vh; }
    .skip-link {
      position: absolute;
      left: 16px;
      top: 12px;
      z-index: 200;
      padding: 10px 14px;
      border-radius: 999px;
      background: #0b4da2;
      color: #fff;
      transform: translateY(-160%);
      transition: transform 0.2s ease;
    }
    .skip-link:focus { transform: translateY(0); }
  `]
})
export class App {
  constructor() {
    inject(SeoService).setLocalBusinessStructuredData();
  }
}
