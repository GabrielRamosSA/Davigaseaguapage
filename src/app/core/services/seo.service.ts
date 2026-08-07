import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { brand } from '../data/site-data';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject<Document>(DOCUMENT);

  apply(options: SeoOptions): void {
    const image = options.image ?? brand.heroImage;
    const canonical = new URL(options.path, brand.website).toString();

    this.title.setTitle(options.title);
    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: brand.name });
    this.meta.updateTag({ property: 'og:title', content: options.title });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: new URL(image, brand.website).toString() });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: options.title });
    this.meta.updateTag({ name: 'twitter:description', content: options.description });
    this.meta.updateTag({ name: 'twitter:image', content: new URL(image, brand.website).toString() });
    this.setCanonical(canonical);
  }

  setLocalBusinessStructuredData(): void {
    const head = this.document.head;
    const existing = this.document.getElementById('local-business-jsonld');
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: brand.name,
      url: brand.website,
      telephone: '+55 89 3422-5726',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Santa Rita, 1719',
        addressLocality: 'Picos',
        addressRegion: 'PI',
        addressCountry: 'BR',
      },
      sameAs: [brand.whatsappHref],
    };

    if (existing) {
      existing.textContent = JSON.stringify(schema);
      return;
    }

    const script = this.document.createElement('script');
    script.id = 'local-business-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let canonical: HTMLLinkElement | null = this.document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }
}
