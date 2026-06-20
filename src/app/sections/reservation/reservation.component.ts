import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService, ReservationPayload, ConfirmationResult } from '../../core/services/reservation.service';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type Step = 'form' | 'payment' | 'confirming' | 'success';

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

  // Formulaire principal
  form!: FormGroup;

  // Formulaire de confirmation (numéro de transaction)
  confirmForm!: FormGroup;

  // Résultat de la confirmation finale
  confirmResult?: ConfirmationResult;

  // Données de la réservation en cours (entre étape 1 et 2)
  private pendingPayload?: ReservationPayload;
  codePaiement = '';
  dateReservation = '';

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
      prenom:               ['', [Validators.required, Validators.minLength(2)]],
      nom:                  ['', [Validators.required, Validators.minLength(2)]],
      email:                ['', [Validators.required, Validators.email]],
      telephone:            ['', [Validators.required, Validators.pattern(/^(\+237|237)?\s?[6789]\d{8}$/)]],
      organisation:         ['', Validators.required],
      poste:                [''],
      nombrePlaces:         [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      consentementRgpd:     [false, Validators.requiredTrue],
      consentementMarketing:[false]
    });

    this.confirmForm = this.fb.group({
      numeroTransaction: ['', [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z]{2}\d{6}\.\d{4}\.[a-zA-Z]\d{5}$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.form.get('nombrePlaces')?.valueChanges
      .pipe(debounceTime(100), takeUntil(this.destroy$))
      .subscribe(() => {
        this.montantCached = this.reservationSvc.calculerMontant(
          this.form.get('nombrePlaces')?.value || 1
        );
      });
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

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  isConfirmInvalid(): boolean {
    const ctrl = this.confirmForm.get('numeroTransaction');
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /** Étape 1 : soumission du formulaire → affichage du code USSD */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pendingPayload = {
      ...this.form.value,
      montant: this.montant,
    };

    const result = this.reservationSvc.soumettreDemande(this.pendingPayload!);
    this.codePaiement = result.codePaiement;
    this.dateReservation = new Date().toLocaleString('fr-FR');
    this.step = 'payment';
  }

  /** Étape 2 : confirmation avec le numéro de transaction */
  onConfirmer(): void {
    if (this.confirmForm.invalid) {
      this.confirmForm.markAllAsTouched();
      return;
    }

    this.step = 'confirming';

    const confirmPayload = {
      ...this.pendingPayload!,
      numeroTransaction: this.confirmForm.get('numeroTransaction')!.value.trim(),
      codePaiement: this.codePaiement,
      dateReservation: this.dateReservation,
    };

    this.reservationSvc.confirmerPaiement(confirmPayload).subscribe({
      next: (res) => {
        this.confirmResult = res;
        this.step = 'success';
      },
      error: () => {
        this.confirmResult = { success: true, sheetSaved: false, emailSent: false };
        this.step = 'success';
      }
    });
  }

  /** Retour au formulaire depuis l'étape paiement */
  retourFormulaire(): void {
    this.step = 'form';
    this.codePaiement = '';
    this.pendingPayload = undefined;
    this.confirmForm.reset();
  }

  formatMontant(n: number): string {
    return n.toLocaleString('fr-FR') + ' FCFA';
  }

  copyCode(): void {
    if (this.codePaiement) {
      navigator.clipboard.writeText(this.codePaiement).then(() => {
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
