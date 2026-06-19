import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService, ReservationResult } from '../../core/services/reservation.service';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type Step = 'form' | 'loading' | 'success';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements AfterViewInit, OnInit, OnDestroy {
  readonly Math = Math;
  step: Step = 'form';
  form!: FormGroup;
  result?: ReservationResult;
  readonly PRIX_PLACE = ReservationService.PRIX_PLACE;
  private destroy$ = new Subject<void>();
  montantCached = 0;
  readonly beneficiaryName = environment.beneficiaryName;
  readonly contactEmail = environment.contactEmail;
  readonly contactPhone = environment.contactPhone;

  constructor(
    private fb: FormBuilder,
    private reservationSvc: ReservationService,
    private sa: ScrollAnimationService,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      prenom:       ['', [Validators.required, Validators.minLength(2)]],
      nom:          ['', [Validators.required, Validators.minLength(2)]],
      email:        ['', [Validators.required, Validators.email]],
      telephone:    ['', [Validators.required, Validators.pattern(/^(\+237|237)?\s?[6789]\d{8}$/)]],
      organisation: ['', Validators.required],
      poste:        [''],
      nombrePlaces: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      consentementRgpd: [false, Validators.requiredTrue],
      consentementMarketing: [false]
    });
  }

  ngOnInit(): void {
    this.form.get('nombrePlaces')?.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.montantCached = this.reservationSvc.calculerMontant(
          this.form.get('nombrePlaces')?.value || 1
        );
      });
    // Set initial cache
    this.montantCached = this.montant;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.sa.initReveal('.resa-header > *', { y: 0, opacity: 1, blur: 0, stagger: 0.12, ease: 'power3.out' });
    this.sa.scaleReveal('.resa-form-wrap', { fromScale: 0.95, toScale: 1, duration: 1, start: 'top 80%' });
    this.sa.horizontalStagger('.resa-sidebar > *', { x: 50, stagger: 0.15, duration: 0.9, start: 'top 85%' });
  }

  get montant(): number {
    return this.montantCached || this.reservationSvc.calculerMontant(
      this.form.get('nombrePlaces')?.value || 1
    );
  }

  get codePaiementPreview(): string {
    return this.reservationSvc.genererCodePaiement(this.montant);
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.step = 'loading';
    const payload = {
      ...this.form.value,
      montant: this.montant,
    };
    this.reservationSvc.envoyerReservation(payload).subscribe({
      next: (res) => {
        this.result = res;
        this.step = 'success';
      },
      error: () => {
        this.result = {
          success: true,
          codePaiement: this.reservationSvc.genererCodePaiement(this.montant),
          emailSent: false,
          sheetSaved: false,
        };
        this.step = 'success';
      }
    });
  }

  getMontantFromCode(code: string): number {
    const parts = code.replace(/#/g, '').split('*');
    return +(parts[3] || '0');
  }

  formatMontant(n: number): string {
    return n.toLocaleString('fr-FR') + ' FCFA';
  }

  copyCode(): void {
    if (this.result?.codePaiement) {
      navigator.clipboard.writeText(this.result.codePaiement).then(() => {
        const btn = document.getElementById('copy-btn');
        if (btn) {
          btn.textContent = '✓ Copié !';
          setTimeout(() => { btn.textContent = 'Copier le code'; }, 2000);
        }
      });
    }
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: Record<string, string> = {
      'ticket': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6Z"/><path d="M13 5V2"/><path d="M6 5V2"/><path d="M10 5V2"/></svg>`,
      'phone': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
      'mail': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
      'message-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
