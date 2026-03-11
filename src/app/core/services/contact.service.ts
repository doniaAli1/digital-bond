import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  readonly isLoading = signal(false);
  readonly isSubmitted = signal(false);
  readonly hasError = signal(false);

  sendMessage(form: ContactForm): Observable<ApiResponse> {
    this.isLoading.set(true);
    this.hasError.set(false);

    return this.http.post<ApiResponse>('/api/contact', form).pipe(
      tap(() => {
        this.isLoading.set(false);
        this.isSubmitted.set(true);
      }),
      catchError((err) => {
        this.isLoading.set(false);
        this.hasError.set(true);
        return throwError(() => err);
      })
    );
  }

  resetState(): void {
    this.isSubmitted.set(false);
    this.hasError.set(false);
  }
}
