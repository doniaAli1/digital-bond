import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { LanguageService } from '../../core/services/language.service';

export interface Review {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  textEn: string;
  textAr: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TranslateModule, AnimateOnScrollDirective],
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
  private readonly languageService = inject(LanguageService);
  readonly isRtl = this.languageService.isRtl;
  readonly currentLang = this.languageService.currentLang;

  readonly activeIndex = signal(0);

  readonly reviews: Review[] = [
    {
      name: 'Ahmed Hassan',
      role: 'CEO',
      company: 'TechStart Egypt',
      avatar: 'AH',
      rating: 5,
      textEn: 'Digital Bond completely transformed our online presence. Their creativity and dedication are unmatched. We saw a 300% increase in engagement within just 3 months.',
      textAr: 'غيّر Digital Bond وجودنا الإلكتروني بالكامل. إبداعهم وتفانيهم لا مثيل له. شهدنا زيادة 300% في التفاعل خلال 3 أشهر فقط.',
    },
    {
      name: 'Sara El-Masry',
      role: 'Marketing Director',
      company: 'Nile Retail Group',
      avatar: 'SE',
      rating: 5,
      textEn: 'The team at Digital Bond understands our brand deeply. Every campaign they deliver exceeds expectations. Highly professional and results-driven.',
      textAr: 'يفهم فريق Digital Bond علامتنا التجارية بعمق. كل حملة يقدمونها تتجاوز التوقعات. محترفون جداً وموجهون نحو النتائج.',
    },
    {
      name: 'Omar Farouk',
      role: 'Founder',
      company: 'StyleHub',
      avatar: 'OF',
      rating: 5,
      textEn: 'From web development to social media, Digital Bond handled everything seamlessly. Our sales doubled after the rebranding campaign they ran for us.',
      textAr: 'من تطوير الويب إلى وسائل التواصل الاجتماعي، تعامل Digital Bond مع كل شيء بسلاسة. تضاعفت مبيعاتنا بعد حملة إعادة العلامة التجارية التي أجروها لنا.',
    },
    {
      name: 'Nadia Khalil',
      role: 'Head of Digital',
      company: 'MedCare Clinics',
      avatar: 'NK',
      rating: 5,
      textEn: 'Exceptional work, exceptional team. The SEO strategy they implemented put us on the first page of Google for all our target keywords within 4 months.',
      textAr: 'عمل استثنائي، فريق استثنائي. استراتيجية SEO التي طبقوها وضعتنا في الصفحة الأولى من Google لجميع الكلمات المفتاحية المستهدفة خلال 4 أشهر.',
    },
  ];

  readonly activeReview = computed(() => this.reviews[this.activeIndex()]);
  readonly stars = computed(() => Array(this.activeReview().rating).fill(0));

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  prev(): void {
    this.activeIndex.update((i) => (i === 0 ? this.reviews.length - 1 : i - 1));
  }

  next(): void {
    this.activeIndex.update((i) => (i === this.reviews.length - 1 ? 0 : i + 1));
  }
}
