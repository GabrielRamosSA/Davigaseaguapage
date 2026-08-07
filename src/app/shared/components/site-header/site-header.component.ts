import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { brand, navLinks } from '../../../core/data/site-data';
import { WhatsappService } from '../../../core/services/whatsapp.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-site-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage, MobileMenuComponent],
  template: `
    <header class="header" [class.header--scrolled]="scrolled()">
      <div class="shell">
        <a class="brand" routerLink="/" aria-label="Ir para a página inicial">
          <img [ngSrc]="brand.logo" width="44" height="44" priority alt="Logomarca da Davi Gás" class="brand__logo" />
          <span class="brand__text">
            <strong>Davi</strong>
            <span>Gás</span>
          </span>
        </a>

        <nav class="desktop-nav" aria-label="Menu principal">
          @for (link of links; track link.path) {
            <a
              class="nav-link"
              [routerLink]="link.path"
              [fragment]="link.fragment"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="header-actions">
          <a class="cta cta--ghost" [href]="whatsappHref" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88"/></svg>
            <span>Pedir pelo WhatsApp</span>
          </a>

          <button type="button" class="menu-button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" aria-controls="mobile-menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <app-mobile-menu
        id="mobile-menu"
        [open]="menuOpen()"
        [links]="links"
        [whatsappHref]="whatsappHref"
        (selected)="closeMenu()"
        (closed)="closeMenu()"
      />
    </header>
  `,
  styles: [`
    :host { display: block; }
    .header {
      position: sticky;
      top: 0;
      z-index: 60;
      background: rgba(247, 249, 252, 0.82);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid transparent;
      transition: background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .header--scrolled {
      background: rgba(247, 249, 252, 0.96);
      border-color: rgba(7, 47, 102, 0.08);
      box-shadow: 0 10px 30px rgba(7, 47, 102, 0.08);
    }
    .shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      color: #172033;
      text-decoration: none;
      flex-shrink: 0;
    }
    .brand__logo {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      object-fit: cover;
      box-shadow: 0 8px 24px rgba(7, 47, 102, 0.14);
    }
    .brand__text {
      display: grid;
      line-height: 1;
      font-size: 0.96rem;
    }
    .brand__text strong { font-size: 1.05rem; }
    .brand__text span { color: #0b4da2; font-weight: 700; }
    .desktop-nav {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 6px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(7, 47, 102, 0.06);
    }
    .nav-link {
      min-height: 44px;
      padding: 10px 16px;
      border-radius: 999px;
      color: #172033;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.96rem;
      letter-spacing: -0.01em;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }
    .nav-link.active,
    .nav-link:hover {
      background: rgba(11, 77, 162, 0.1);
      color: #0b4da2;
      transform: translateY(-1px);
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
    }
    .cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 46px;
      padding: 0 20px;
      border-radius: 999px;
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }
    .cta--ghost {
      background: linear-gradient(135deg, #0b4da2, #0a63d9);
      color: #fff;
      box-shadow: 0 14px 32px rgba(11, 77, 162, 0.2);
    }
    .cta--ghost svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
      flex: none;
    }
    .menu-button {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      width: 46px;
      height: 46px;
      padding: 0;
      border: 1px solid rgba(7, 47, 102, 0.12);
      border-radius: 16px;
      background: #fff;
      cursor: pointer;
    }
    .menu-button span {
      display: block;
      width: 18px;
      height: 2px;
      margin: 0 auto;
      border-radius: 999px;
      background: #172033;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    @media (min-width: 960px) {
      .desktop-nav { display: flex; }
      .menu-button { display: none; }
      .cta--ghost span { display: inline; }
    }
    @media (max-width: 959px) {
      .cta--ghost span { display: none; }
    }
  `],
})
export class SiteHeaderComponent {
  readonly brand = brand;
  readonly links = navLinks;
  readonly whatsappHref = inject(WhatsappService).buildLink();
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (typeof window !== 'undefined') {
      const setScrollState = () => this.scrolled.set(window.scrollY > 12);
      window.addEventListener('scroll', setScrollState, { passive: true });
      setScrollState();

      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed(this.destroyRef), filter((event) => event.key === 'Escape'))
        .subscribe(() => this.closeMenu());

      this.router.events
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        )
        .subscribe(() => this.closeMenu());

      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', setScrollState));
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
