import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly languageService = inject(LanguageService);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.languageService.initLanguage();
    this.seoService.setDefaultMeta();
  }
}
