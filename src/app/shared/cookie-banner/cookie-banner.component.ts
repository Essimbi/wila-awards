import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cookie-banner" *ngIf="showBanner">
      <div class="cookie-content">
        <div class="cookie-text">
          <h3 class="cookie-title">Respect de votre vie privée</h3>
          <p class="cookie-description">
            Conformément aux lois camerounaises sur la protection des données personnelles, nous utilisons des cookies 
            et collectons des données personnelles pour améliorer votre expérience et gérer vos réservations. 
            En continuant à naviguer, vous acceptez notre 
            <a href="#" (click)="openPrivacyModal()" class="privacy-link">Politique de Confidentialité</a>.
          </p>
          <p class="cookie-details">
            <strong>Données collectées :</strong> Nom, prénom, email, téléphone (pour réservations uniquement).<br>
            <strong>Finalité :</strong> Gestion des réservations WILA Awards 2026 et communications liées.<br>
            <strong>Durée :</strong> Conservation 3 ans après l'événement, effacement sur demande.<br>
            <strong>Vos droits :</strong> Accès, rectification, suppression selon la loi camerounaise.
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
          Siège social : Douala, Cameroun<br>
          Email : contact&#64;wila-awards.com<br>
          Dans le cadre de l'organisation des WILA Awards 2026.</p>

          <h3>2. Données collectées</h3>
          <p>Conformément à la loi n° 2010/012 du 21 décembre 2010 sur la cybersécurité et la cybercriminalité 
          et à la loi n° 2010/013 du 21 décembre 2010 régissant les communications électroniques au Cameroun :</p>
          <ul>
            <li><strong>Données d'identification :</strong> Nom, prénom, adresse email, numéro de téléphone</li>
            <li><strong>Données professionnelles :</strong> Organisation d'appartenance, poste occupé</li>
            <li><strong>Données de réservation :</strong> Nombre de places, montant, informations de paiement</li>
            <li><strong>Données techniques :</strong> Adresse IP, cookies de navigation, journaux d'accès</li>
          </ul>

          <h3>3. Finalités du traitement</h3>
          <ul>
            <li><strong>Gestion des réservations :</strong> Traitement des inscriptions pour l'événement du 3 juillet 2026</li>
            <li><strong>Communication événementielle :</strong> Envoi d'informations relatives à l'événement</li>
            <li><strong>Suivi administratif :</strong> Gestion des paiements et émission des billets</li>
            <li><strong>Obligations légales :</strong> Respect des obligations comptables et fiscales camerounaises</li>
            <li><strong>Amélioration des services :</strong> Optimisation de l'expérience utilisateur</li>
          </ul>

          <h3>4. Base légale</h3>
          <p>Le traitement est fondé sur votre <strong>consentement libre et éclairé</strong> pour les réservations 
          et les communications marketing, conformément aux dispositions de la loi camerounaise sur les données personnelles.</p>

          <h3>5. Durée de conservation</h3>
          <p>En conformité avec les obligations légales camerounaises :</p>
          <ul>
            <li><strong>Données de réservation :</strong> 3 ans après la fin de l'événement (31 décembre 2029)</li>
            <li><strong>Données comptables :</strong> 10 ans conformément au droit comptable camerounais</li>
            <li><strong>Cookies et logs :</strong> 12 mois maximum</li>
            <li><strong>Communications marketing :</strong> Jusqu'à retrait du consentement</li>
          </ul>

          <h3>6. Vos droits sur vos données</h3>
          <p>Conformément à la législation camerounaise en vigueur, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit de suppression :</strong> Demander l'effacement de vos données</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation :</strong> Limiter le traitement dans certains cas</li>
            <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format utilisable</li>
          </ul>
          <p><strong>Comment exercer vos droits :</strong> Envoyez votre demande à <strong>contact&#64;wila-awards.com</strong> 
          avec une pièce d'identité. Réponse garantie sous 30 jours.</p>

          <h3>7. Sécurité et confidentialité</h3>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
          <ul>
            <li><strong>Chiffrement :</strong> Transmission sécurisée par protocole HTTPS</li>
            <li><strong>Accès restreint :</strong> Limitation aux seuls organisateurs autorisés</li>
            <li><strong>Sauvegarde :</strong> Copies de sécurité régulières et restauration</li>
            <li><strong>Audit :</strong> Surveillance des accès et des modifications</li>
            <li><strong>Formation :</strong> Sensibilisation du personnel aux enjeux de confidentialité</li>
          </ul>

          <h3>8. Transferts de données</h3>
          <p>Les données peuvent être hébergées et traitées par Google (États-Unis) via Google Sheets. 
          Ce transfert s'effectue dans le respect des garanties appropriées et des accords de transfert 
          internationaux reconnus par les autorités camerounaises.</p>

          <h3>9. Cookies et technologies similaires</h3>
          <p>Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences 
          via le bandeau de cookies. Les cookies essentiels ne peuvent être désactivés car nécessaires au fonctionnement.</p>

          <h3>10. Contact et réclamations</h3>
          <p><strong>Délégué à la Protection des Données :</strong><br>
          Email : dpo&#64;wila-awards.com<br>
          Courrier : WILA Cameroun, Douala</p>
          
          <p><strong>Autorité de contrôle compétente :</strong><br>
          Agence Nationale des Technologies de l'Information et de la Communication (ANTIC)<br>
          Adresse : Yaoundé, Cameroun<br>
          En cas de litige non résolu, vous pouvez saisir cette autorité.</p>

          <h3>11. Modifications</h3>
          <p>Cette politique peut être modifiée. La version en vigueur est datée du <strong>19 juin 2026</strong>. 
          Toute modification substantielle vous sera notifiée par email.</p>
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