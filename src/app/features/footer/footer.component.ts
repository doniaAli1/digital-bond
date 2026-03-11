import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  private readonly languageService = inject(LanguageService);
  readonly isRtl = this.languageService.isRtl;
  readonly currentYear = new Date().getFullYear();

  readonly navLinks = [
    { label: 'NAV.HOME', href: '#home' },
    { label: 'NAV.ABOUT', href: '#about' },
    { label: 'NAV.SERVICES', href: '#services' },
    { label: 'NAV.REVIEWS', href: '#reviews' },
    { label: 'NAV.CONTACT', href: '#contact' },
  ];

  readonly serviceLinks = [
    'SERVICES.SOCIAL_MEDIA.TITLE',
    'SERVICES.WEB_DEV.TITLE',
    'SERVICES.MOBILE_APPS.TITLE',
    'SERVICES.SEO.TITLE',
    'SERVICES.MEDIA.TITLE',
  ];

  scrollToSection(href: string): void {
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
