import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cookie-banner" *ngIf="showBanner">
      <div class="cookie-content">
        <div class="cookie-text">
          <h3 class="cookie-title">Respect de votre vie privée</h3>
          <p class="cookie-description">
            Nous utilisons des cookies et collectons des données personnelles pour améliorer votre expérience, 
            analyser notre trafic et personnaliser le contenu. En continuant à naviguer, vous acceptez notre 
            <a href="#" (click)="openPrivacyModal()" class="privacy-link">Politique de Confidentialité</a>.
          </p>
          <p class="cookie-details">
            <strong>Données collectées :</strong> Email, nom, téléphone (uniquement lors de réservations).<br>
            <strong>Finalité :</strong> Gestion des réservations WILA Awards 2026.<br>
            <strong>Durée :</strong> Conservation jusqu'à fin 2027, suppression sur demande.
          </p>
        </div>
        <div class="cookie-actions">
          <button class="btn-accept" (click)="acceptAll()">
            Accepter tout
          </button>
          <button class="btn-customize" (click)="openCustomizeModal()">
            Personnaliser
          </button>
          <button class="btn-decline" (click)="declineAll()">
            Refuser
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Politique de Confidentialité -->
    <div class="privacy-modal" *ngIf="showPrivacyModal" (click)="closePrivacyModal()">
      <div class="privacy-modal-content" (click)="$event.stopPropagation()">
        <div class="privacy-modal-header">
          <h2>Politique de Confidentialité - WILA Awards 2026</h2>
          <button class="modal-close" (click)="closePrivacyModal()">×</button>
        </div>
        <div class="privacy-modal-body">
          <h3>1. Responsable du traitement</h3>
          <p><strong>WILA Cameroun</strong><br>
          Email : contact@wila-awards.com<br>
          Dans le cadre de l'organisation des WILA Awards 2026.</p>

          <h3>2. Données collectées</h3>
          <ul>
            <li><strong>Données d'identification :</strong> Nom, prénom, email, téléphone</li>
            <li><strong>Données professionnelles :</strong> Organisation, poste</li>
            <li><strong>Données techniques :</strong> Adresse IP, cookies analytiques</li>
            <li><strong>Données de réservation :</strong> Nombre de places, montant, code de paiement</li>
          </ul>

          <h3>3. Finalités du traitement</h3>
          <ul>
            <li>Gestion des réservations pour l'événement du 3 juillet 2026</li>
            <li>Communication événementielle et suivi des paiements</li>
            <li>Amélioration de l'expérience utilisateur du site web</li>
            <li>Respect des obligations légales et comptables</li>
          </ul>

          <h3>4. Base légale</h3>
          <p>Consentement libre et éclairé pour les réservations et communications marketing.</p>

          <h3>5. Durée de conservation</h3>
          <ul>
            <li><strong>Données de réservation :</strong> Jusqu'au 31 décembre 2027</li>
            <li><strong>Cookies analytiques :</strong> 13 mois maximum</li>
            <li><strong>Logs techniques :</strong> 12 mois maximum</li>
          </ul>

          <h3>6. Vos droits RGPD</h3>
          <ul>
            <li><strong>Droit d'accès :</strong> Consulter vos données</li>
            <li><strong>Droit de rectification :</strong> Corriger vos données</li>
            <li><strong>Droit à l'effacement :</strong> Supprimer vos données</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement</li>
            <li><strong>Droit à la portabilité :</strong> Récupérer vos données</li>
          </ul>
          <p>Pour exercer vos droits : <strong>contact@wila-awards.com</strong></p>

          <h3>7. Sécurité des données</h3>
          <ul>
            <li>Stockage sécurisé via Google Sheets (chiffrement HTTPS)</li>
            <li>Accès restreint aux organisateurs authentifiés</li>
            <li>Sauvegarde automatique et restauration possible</li>
            <li>Audit régulier des accès aux données</li>
          </ul>

          <h3>8. Transferts internationaux</h3>
          <p>Les données peuvent être traitées par Google (États-Unis) dans le cadre de Google Sheets, 
          sous couvert des clauses contractuelles types de la Commission européenne.</p>

          <h3>9. Contact DPO</h3>
          <p>Pour toute question relative à la protection de vos données :<br>
          <strong>Email :</strong> dpo@wila-awards.com<br>
          <strong>Autorité de contrôle :</strong> CNIL (France) ou autorité locale compétente</p>
        </div>
        <div class="privacy-modal-footer">
          <button class="btn-primary" (click)="closePrivacyModal()">J'ai compris</button>
        </div>
      </div>
    </div>

    <!-- Modal Personnalisation -->
    <div class="customize-modal" *ngIf="showCustomizeModal" (click)="closeCustomizeModal()">
      <div class="customize-modal-content" (click)="$event.stopPropagation()">
        <div class="customize-modal-header">
          <h2>Personnaliser mes préférences</h2>
          <button class="modal-close" (click)="closeCustomizeModal()">×</button>
        </div>
        <div class="customize-modal-body">
          <div class="cookie-category">
            <div class="category-header">
              <h3>Cookies essentiels</h3>
              <span class="category-status required">Requis</span>
            </div>
            <p>Nécessaires au fonctionnement du site et au processus de réservation.</p>
          </div>
          
          <div class="cookie-category">
            <div class="category-header">
              <h3>Cookies analytiques</h3>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="analyticsAccepted">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <p>Nous aident à comprendre comment vous utilisez le site pour l'améliorer.</p>
          </div>
          
          <div class="cookie-category">
            <div class="category-header">
              <h3>Communication marketing</h3>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="marketingAccepted">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <p>Autorisation d'envoi d'emails sur les futurs événements WILA.</p>
          </div>
        </div>
        <div class="customize-modal-footer">
          <button class="btn-outline" (click)="closeCustomizeModal()">Annuler</button>
          <button class="btn-primary" (click)="savePreferences()">Enregistrer mes choix</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  showPrivacyModal = false;
  showCustomizeModal = false;
  analyticsAccepted = false;
  marketingAccepted = false;

  ngOnInit(): void {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('wila-cookie-consent');
    if (!consent) {
      // Délai pour laisser la page se charger
      setTimeout(() => {
        this.showBanner = true;
      }, 2000);
    } else {
      this.loadSavedPreferences();
    }
  }

  acceptAll(): void {
    const consent = {
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: true,
      marketing: true,
      version: '1.0'
    };
    localStorage.setItem('wila-cookie-consent', JSON.stringify(consent));
    this.showBanner = false;
    this.initializeTracking(true, true);
  }

  declineAll(): void {
    const consent = {
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: false,
      marketing: false,
      version: '1.0'
    };
    localStorage.setItem('wila-cookie-consent', JSON.stringify(consent));
    this.showBanner = false;
    this.initializeTracking(false, false);
  }

  openPrivacyModal(): void {
    this.showPrivacyModal = true;
  }

  closePrivacyModal(): void {
    this.showPrivacyModal = false;
  }

  openCustomizeModal(): void {
    this.loadSavedPreferences();
    this.showCustomizeModal = true;
  }

  closeCustomizeModal(): void {
    this.showCustomizeModal = false;
  }

  savePreferences(): void {
    const consent = {
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: this.analyticsAccepted,
      marketing: this.marketingAccepted,
      version: '1.0'
    };
    localStorage.setItem('wila-cookie-consent', JSON.stringify(consent));
    this.showBanner = false;
    this.showCustomizeModal = false;
    this.initializeTracking(this.analyticsAccepted, this.marketingAccepted);
  }

  private loadSavedPreferences(): void {
    const consent = localStorage.getItem('wila-cookie-consent');
    if (consent) {
      const parsed = JSON.parse(consent);
      this.analyticsAccepted = parsed.analytics || false;
      this.marketingAccepted = parsed.marketing || false;
      this.initializeTracking(this.analyticsAccepted, this.marketingAccepted);
    }
  }

  private initializeTracking(analytics: boolean, marketing: boolean): void {
    // Initialiser les outils d'analyse si acceptés
    if (analytics) {
      // Google Analytics, etc.
      console.log('Analytics tracking enabled');
    }
    
    if (marketing) {
      // Outils marketing
      console.log('Marketing tracking enabled');
    }
  }

  // Méthode statique pour vérifier le consentement depuis d'autres composants
  static hasConsent(type: 'analytics' | 'marketing'): boolean {
    const consent = localStorage.getItem('wila-cookie-consent');
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed[type] || false;
  }
}