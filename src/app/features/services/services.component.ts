import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { LanguageService } from '../../core/services/language.service';

interface Service {
  icon: string;
  titleKey: string;
  descKey: string;
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private readonly languageService = inject(LanguageService);
  readonly isRtl = this.languageService.isRtl;
  readonly hoveredIndex = signal<number | null>(null);

  readonly services: Service[] = [
    { icon: 'bi-megaphone-fill', titleKey: 'SERVICES.SOCIAL_MEDIA.TITLE', descKey: 'SERVICES.SOCIAL_MEDIA.DESC', color: '#ff6b6b' },
    { icon: 'bi-code-slash', titleKey: 'SERVICES.WEB_DEV.TITLE', descKey: 'SERVICES.WEB_DEV.DESC', color: '#4ecdc4' },
    { icon: 'bi-phone-fill', titleKey: 'SERVICES.MOBILE_APPS.TITLE', descKey: 'SERVICES.MOBILE_APPS.DESC', color: '#a29bfe' },
    { icon: 'bi-search', titleKey: 'SERVICES.SEO.TITLE', descKey: 'SERVICES.SEO.DESC', color: '#fd79a8' },
    { icon: 'bi-people-fill', titleKey: 'SERVICES.INFLUENCERS.TITLE', descKey: 'SERVICES.INFLUENCERS.DESC', color: '#fdcb6e' },
    { icon: 'bi-chat-dots-fill', titleKey: 'SERVICES.SMS.TITLE', descKey: 'SERVICES.SMS.DESC', color: '#00b894' },
    { icon: 'bi-camera-video-fill', titleKey: 'SERVICES.MEDIA.TITLE', descKey: 'SERVICES.MEDIA.DESC', color: '#e17055' },
  ];
}
