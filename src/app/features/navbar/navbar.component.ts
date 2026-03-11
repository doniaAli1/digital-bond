import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly languageService = inject(LanguageService);

  readonly isRtl = this.languageService.isRtl;
  readonly currentLang = this.languageService.currentLang;

  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly activeSection = signal('home');

  readonly navLinks = computed(() => [
    { id: 'home', label: 'NAV.HOME', href: '#home' },
    { id: 'about', label: 'NAV.ABOUT', href: '#about' },
    { id: 'services', label: 'NAV.SERVICES', href: '#services' },
    { id: 'reviews', label: 'NAV.REVIEWS', href: '#reviews' },
    { id: 'contact', label: 'NAV.CONTACT', href: '#contact' },
  ]);

  private scrollObserver: IntersectionObserver | null = null;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  ngOnInit(): void {
    this.initSectionObserver();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.closeMobileMenu();
  }

  scrollToSection(href: string): void {
    this.closeMobileMenu();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initSectionObserver(): void {
    const sections = ['home', 'about', 'services', 'reviews', 'contact'];

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.scrollObserver?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
  }
}
