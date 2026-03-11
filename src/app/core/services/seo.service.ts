import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  private readonly defaultConfig: SeoConfig = {
    title: 'Digital Bond | Creative Marketing Agency',
    description:
      'Digital Bond is a creative marketing agency that mixes creativity and commitment to help brands go beyond the limit. Social Media, Web Development, SEO & more.',
    keywords:
      'digital marketing, social media, web development, SEO, mobile apps, influencer marketing, media production, Cairo',
    image: 'https://digitalbond.com/assets/images/og-image.jpg',
    url: 'https://digitalbond.com',
    type: 'website',
  };

  setDefaultMeta(): void {
    this.updateMeta(this.defaultConfig);
    this.injectStructuredData();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateMeta(this.defaultConfig));
  }

  updateMeta(config: SeoConfig): void {
    const cfg = { ...this.defaultConfig, ...config };

    this.title.setTitle(cfg.title!);

    this.meta.updateTag({ name: 'description', content: cfg.description! });
    this.meta.updateTag({ name: 'keywords', content: cfg.keywords! });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'Digital Bond' });

    this.meta.updateTag({ property: 'og:title', content: cfg.title! });
    this.meta.updateTag({ property: 'og:description', content: cfg.description! });
    this.meta.updateTag({ property: 'og:image', content: cfg.image! });
    this.meta.updateTag({ property: 'og:url', content: cfg.url! });
    this.meta.updateTag({ property: 'og:type', content: cfg.type! });
    this.meta.updateTag({ property: 'og:site_name', content: 'Digital Bond' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: cfg.title! });
    this.meta.updateTag({ name: 'twitter:description', content: cfg.description! });
    this.meta.updateTag({ name: 'twitter:image', content: cfg.image! });

    this.updateCanonicalUrl(cfg.url!);
  }

  private updateCanonicalUrl(url: string): void {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectStructuredData(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Digital Bond',
      url: 'https://digitalbond.com',
      logo: 'https://digitalbond.com/assets/images/logo.png',
      description: this.defaultConfig.description,
      sameAs: [
        'https://www.facebook.com/digitalbond',
        'https://www.instagram.com/digitalbond',
        'https://www.linkedin.com/company/digitalbond',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'English'],
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
