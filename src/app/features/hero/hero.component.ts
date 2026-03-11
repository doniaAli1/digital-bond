import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { LanguageService } from '../../core/services/language.service';

interface Stat {
  labelKey: string;
  value: number;
  suffix: string;
  displayValue: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  readonly isRtl = this.languageService.isRtl;

  readonly stats: Stat[] = [
    { labelKey: 'HERO.STAT_CLIENTS', value: 150, suffix: '+', displayValue: 0 },
    { labelKey: 'HERO.STAT_PROJECTS', value: 320, suffix: '+', displayValue: 0 },
    { labelKey: 'HERO.STAT_YEARS', value: 8, suffix: '+', displayValue: 0 },
    { labelKey: 'HERO.STAT_AWARDS', value: 24, suffix: '', displayValue: 0 },
  ];

  ngOnInit(): void {
    // Animate counters after a short delay
    setTimeout(() => this.animateCounters(), 800);
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToServices(): void {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }

  private animateCounters(): void {
    this.stats.forEach((stat) => {
      let start = 0;
      const duration = 2000;
      const increment = stat.value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        stat.displayValue = Math.min(Math.floor(start), stat.value);
        if (stat.displayValue >= stat.value) {
          clearInterval(timer);
        }
      }, 16);
    });
  }
}
