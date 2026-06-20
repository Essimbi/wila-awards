import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
  consentementRgpd: boolean;
  consentementMarketing: boolean;
}

export interface ConfirmationPayload extends ReservationPayload {
  numeroTransaction: string;
  codePaiement: string;
  dateReservation: string;
}

export interface ReservationResult {
  success: boolean;
  codePaiement: string;
}

export interface ConfirmationResult {
  success: boolean;
  sheetSaved: boolean;
  emailSent: boolean;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly APPS_SCRIPT = environment.appsScriptUrl;

  static readonly PRIX_PLACE = environment.prixPlace;

  constructor(private http: HttpClient) {}

  genererCodePaiement(montant: number): string {
    return `#150*46*3786250*${montant}#`;
  }

  calculerMontant(nombrePlaces: number): number {
    return nombrePlaces * ReservationService.PRIX_PLACE;
  }

  /**
   * Étape 1 : Soumettre le formulaire → retourne le code de paiement
   * Aucun appel réseau à ce stade, le code est généré localement.
   */
  soumettreDemande(payload: ReservationPayload): ReservationResult {
    return {
      success: true,
      codePaiement: this.genererCodePaiement(payload.montant),
    };
  }

  /**
   * Étape 2 : Confirmer avec le numéro de transaction
   * → Envoie vers Google Sheets + email Formspree
   */
  confirmerPaiement(payload: ConfirmationPayload): Observable<ConfirmationResult> {
    const sheetsData = {
      prenom:              payload.prenom,
      nom:                 payload.nom,
      email:               payload.email,
      telephone:           payload.telephone,
      organisation:        payload.organisation,
      poste:               payload.poste || '—',
      nombrePlaces:        payload.nombrePlaces,
      montant:             payload.montant,
      codePaiement:        payload.codePaiement,
      numeroTransaction:   payload.numeroTransaction,
      dateReservation:     payload.dateReservation,
      consentementMarketing: payload.consentementMarketing ? 'Oui' : 'Non',
      statut:              'Paiement confirmé — En attente de vérification',
    };

    const sheets$ = this.http.post(this.APPS_SCRIPT, JSON.stringify(sheetsData), {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain;charset=utf-8'
      })
    }).pipe(catchError(() => of({ error: true })));

    return new Observable(observer => {
      sheets$.subscribe({
        next: (sheetsRes: any) => {
          observer.next({
            success: true,
            sheetSaved: !sheetsRes?.error,
            emailSent: true, // Email est géré par Apps Script maintenant
          });
          observer.complete();
        },
        error: () => {
          observer.next({ success: true, sheetSaved: false, emailSent: false });
          observer.complete();
        }
      });
    });
  }
}
