import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReservationPayload {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  organisation: string;
  poste: string;
  nombrePlaces: number;
  montant: number;
}

export interface ReservationResult {
  success: boolean;
  codePaiement: string;
  emailSent: boolean;
  sheetSaved: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly FORMSPREE = environment.formspreeUrl;
  private readonly APPS_SCRIPT = environment.appsScriptUrl;

  // Tarif par place (en FCFA)
  static readonly PRIX_PLACE = environment.prixPlace;

  constructor(private http: HttpClient) {}

  genererCodePaiement(montant: number): string {
    return `#150*46*3786250*${montant}#`;
  }

  calculerMontant(nombrePlaces: number): number {
    return nombrePlaces * ReservationService.PRIX_PLACE;
  }

  envoyerReservation(payload: ReservationPayload): Observable<ReservationResult> {
    const codePaiement = this.genererCodePaiement(payload.montant);
    const dateReservation = new Date().toLocaleString('fr-FR');

    const formspreePayload = {
      ...payload,
      codePaiement,
      dateReservation,
      _subject: `WILA Awards 2026 — Réservation de ${payload.prenom} ${payload.nom}`,
      _replyto: payload.email,
    };

    const sheetsPayload = {
      ...payload,
      codePaiement,
      dateReservation,
      statut: 'En attente de paiement',
    };

    const emailCall$ = this.http.post(this.FORMSPREE, formspreePayload, {
      headers: new HttpHeaders({ Accept: 'application/json' })
    }).pipe(catchError(() => of({ error: true })));

    const sheetsCall$ = this.http.post(this.APPS_SCRIPT, sheetsPayload)
      .pipe(catchError(() => of({ error: true })));

    return new Observable(observer => {
      forkJoin([emailCall$, sheetsCall$]).subscribe({
        next: ([emailRes, sheetsRes]: any[]) => {
          observer.next({
            success: true,
            codePaiement,
            emailSent: !emailRes?.error,
            sheetSaved: !sheetsRes?.error,
          });
          observer.complete();
        },
        error: () => {
          // Même en cas d'erreur réseau totale, on donne le code de paiement
          observer.next({
            success: true,
            codePaiement,
            emailSent: false,
            sheetSaved: false,
          });
          observer.complete();
        }
      });
    });
  }
}
