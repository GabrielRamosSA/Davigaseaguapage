import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLink } from '../../../core/models/site-data.models';

@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (open()) {
      <div class="backdrop" (click)="closed.emit()" aria-hidden="true"></div>

      <aside class="panel" role="dialog" aria-label="Menu mobile">
        <nav class="menu-nav" aria-label="Links principais">
          @for (link of links(); track link.path) {
            <a
              class="menu-link"
              [routerLink]="link.path"
              [fragment]="link.fragment"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              (click)="selected.emit()"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="menu-actions">
          <a class="primary" [href]="whatsappHref()" target="_blank" rel="noopener noreferrer" (click)="selected.emit()">
            Pedir pelo WhatsApp
          </a>
          <button type="button" class="secondary" (click)="closed.emit()">Fechar menu</button>
        </div>
      </aside>
    }
  `,
  styles: [`
    :host { display: contents; }
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 70;
      background: rgba(7, 20, 44, 0.56);
      backdrop-filter: blur(4px);
    }
    .panel {
      position: fixed;
      top: 76px;
      right: 16px;
      left: 16px;
      z-index: 80;
      padding: 22px;
      border-radius: 28px;
      background: rgba(255, 255, 255, 0.98);
      border: 1px solid rgba(11, 77, 162, 0.12);
      box-shadow: 0 28px 54px rgba(7, 47, 102, 0.2);
      backdrop-filter: blur(14px);
      animation: slideDown 180ms ease-out;
    }
    .menu-nav {
      display: grid;
      gap: 8px;
    }
    .menu-link {
      display: flex;
      align-items: center;
      min-height: 48px;
      padding: 12px 16px;
      border-radius: 18px;
      color: #172033;
      text-decoration: none;
      font-weight: 700;
      background: #f8fbff;
      border: 1px solid rgba(7, 47, 102, 0.06);
      transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
    }
    .menu-link.active,
    .menu-link:hover {
      background: rgba(11, 77, 162, 0.1);
      color: #0b4da2;
      transform: translateY(-1px);
    }
    .menu-actions {
      display: grid;
      gap: 10px;
      margin-top: 18px;
    }
    .primary,
    .secondary {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: 48px;
      border-radius: 999px;
      font-weight: 700;
      text-decoration: none;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .primary {
      background: linear-gradient(135deg, #0b4da2, #0a63d9);
      color: #fff;
    }
    .secondary {
      background: #fff;
      color: #172033;
      border-color: rgba(7, 47, 102, 0.12);
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (min-width: 960px) {
      :host { display: none; }
    }
  `],
})
export class MobileMenuComponent {
  readonly open = input(false);
  readonly links = input<NavLink[]>([]);
  readonly whatsappHref = input('https://wa.me/5589994205500');
  readonly selected = output<void>();
  readonly closed = output<void>();
}
