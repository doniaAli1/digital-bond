import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { LanguageService } from '../../core/services/language.service';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AnimateOnScrollDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly translateService = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  readonly isRtl = this.languageService.isRtl;
  readonly isLoading = this.contactService.isLoading;
  readonly isSubmitted = this.contactService.isSubmitted;
  readonly hasError = this.contactService.hasError;

  readonly services = [
    'SERVICES.SOCIAL_MEDIA.TITLE',
    'SERVICES.WEB_DEV.TITLE',
    'SERVICES.MOBILE_APPS.TITLE',
    'SERVICES.SEO.TITLE',
    'SERVICES.INFLUENCERS.TITLE',
    'SERVICES.SMS.TITLE',
    'SERVICES.MEDIA.TITLE',
  ];

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\+]?[\d\s\-\(\)]{8,15}$/)]],
    service: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field?.errors || !field.touched) return '';

    if (field.errors['required']) return this.translateService.instant('CONTACT.FORM.REQUIRED');
    if (field.errors['email']) return this.translateService.instant('CONTACT.FORM.EMAIL_INVALID');
    if (field.errors['pattern']) return this.translateService.instant('CONTACT.FORM.PHONE_INVALID');
    return '';
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactService.sendMessage(this.contactForm.value as any).subscribe({
      next: () => this.contactForm.reset(),
      error: () => {},
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.contactService.resetState();
  }
}
