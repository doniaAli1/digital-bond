import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'ar' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);

  readonly currentLang = signal<Language>('en');
  readonly isRtl = computed(() => this.currentLang() === 'ar');
  readonly dir = computed(() => (this.isRtl() ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', this.dir());
      document.body.setAttribute('dir', this.dir());
    });
  }

  initLanguage(): void {
    this.translateService.addLangs(['en', 'ar']);
    this.translateService.setDefaultLang('en');

    const savedLang = (localStorage.getItem('db_lang') as Language) || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    this.translateService.use(lang);
    localStorage.setItem('db_lang', lang);
  }

  toggleLanguage(): void {
    const next: Language = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(next);
  }
}
