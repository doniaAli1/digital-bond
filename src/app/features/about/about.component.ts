import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private readonly languageService = inject(LanguageService);
  readonly isRtl = this.languageService.isRtl;

  readonly features = [
    { icon: 'bi-bar-chart-fill', titleKey: 'ABOUT.FEATURE_1_TITLE', descKey: 'ABOUT.FEATURE_1_DESC' },
    { icon: 'bi-stars', titleKey: 'ABOUT.FEATURE_2_TITLE', descKey: 'ABOUT.FEATURE_2_DESC' },
    { icon: 'bi-shield-check', titleKey: 'ABOUT.FEATURE_3_TITLE', descKey: 'ABOUT.FEATURE_3_DESC' },
  ];

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
