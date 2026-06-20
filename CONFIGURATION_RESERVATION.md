# Configuration de la Fonctionnalité de Réservation

## ✅ État Actuel du Système

Le système de réservation est **architecturalement complet** mais nécessite une configuration des services externes avant la mise en production.

### Architecture Existante

**Frontend (Angular 18)**
- ✅ Service `ReservationService` fonctionnel
- ✅ Formulaire de réservation avec validation complète
- ✅ Génération automatique du code de paiement USSD
- ✅ Interface utilisateur premium avec feedback visuel
- ✅ Gestion d'erreurs robuste

**Backend (Sans serveur - Serverless)**
- ✅ Double intégration : Formspree + Google Apps Script
- ✅ Fallback gracieux en cas d'échec partiel
- ✅ Code de paiement toujours fourni même en cas d'erreur

## 🔧 Configuration Requise Avant Production

### 1. Configurer Formspree (Email automatique)

**Étapes :**
1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un formulaire avec email destinataire : `wilacameroun@gmail.com`
3. Récupérer l'URL du endpoint : `https://formspree.io/f/YOUR_FORM_ID`
4. Mettre à jour dans `src/environments/environment.ts` et `environment.prod.ts` :

```typescript
formspreeId: 'YOUR_FORM_ID',
formspreeUrl: 'https://formspree.io/f/YOUR_FORM_ID',
```

### 2. Configurer Google Apps Script (Excel automatique)

**Étapes :**
1. Créer un Google Sheet nommé "WILA Awards 2026 - Réservations"
2. Créer un onglet "Réservations" avec les colonnes :
   - Date de Réservation
   - Prénom
   - Nom
   - Email
   - Téléphone
   - Organisation
   - Poste
   - Nombre de Places
   - Montant
   - Code de Paiement
   - Statut

3. Dans Google Sheets : Extensions → Apps Script
4. Coller ce code dans `Code.gs` :

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Réservations');
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.dateReservation,
    data.prenom,
    data.nom,
    data.email,
    data.telephone,
    data.organisation,
    data.poste,
    data.nombrePlaces,
    data.montant,
    data.codePaiement,
    data.statut
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Déployer : Déployer → Nouveau déploiement → Application Web
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**

6. Copier l'URL du déploiement et mettre à jour dans `environment.ts` :

```typescript
appsScriptId: 'YOUR_SCRIPT_ID',
appsScriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
```

### 3. Ajuster les Paramètres

Dans `src/environments/environment.ts` et `environment.prod.ts` :

```typescript
export const environment = {
  production: false, // true pour prod
  formspreeId: 'YOUR_FORMSPREE_ID',
  appsScriptId: 'YOUR_APPS_SCRIPT_ID',
  formspreeUrl: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
  appsScriptUrl: 'https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec',
  prixPlace: 25000, // FCFA - À ajuster selon le tarif final
  eventDate: '2026-07-03T18:00:00',
  beneficiaryName: 'Blandine Flore Fobasso Tchoffo Epse Kochele',
  contactEmail: 'wilacameroun@gmail.com', // Email réel WILA
  contactPhone: '237600000000', // Téléphone réel WILA
};
```

## 📊 Fonctionnalités du Système

### Données Collectées par Réservation
- **Informations personnelles** : Prénom, nom, email, téléphone
- **Informations professionnelles** : Organisation, poste
- **Détails réservation** : Nombre de places, montant calculé
- **Métadonnées** : Date/heure, code de paiement, statut

### Code de Paiement Mobile Money
- **Format** : `#150*46*3786250*{montant}#`
- **Bénéficiaire** : Blandine Flore Fobasso Tchoffo Epse Kochele
- **Génération** : Automatique basée sur le montant total

### Gestion d'Erreurs
- ✅ **Email échoue** : Réservation enregistrée dans Excel uniquement
- ✅ **Excel échoue** : Email envoyé, notification d'erreur Excel
- ✅ **Les deux échouent** : Code de paiement fourni, alerte technique
- ✅ **Réseau complètement down** : Code de paiement fourni quand même

## 🧪 Test du Système

### Test en Mode Développement
1. Lancer le serveur : `npm start`
2. Naviguer vers la section Réservation
3. Remplir le formulaire avec des données test
4. Vérifier que le code de paiement s'affiche
5. Contrôler les logs de la console pour les erreurs

### Test en Mode Production
1. Configurer Formspree et Google Apps Script
2. Déployer le site : `npm run build`
3. Effectuer une réservation test
4. Vérifier l'email reçu
5. Contrôler l'ajout de ligne dans le Google Sheet

## 💰 Considérations Financières

### Coûts des Services
- **Formspree Gratuit** : 50 soumissions/mois
- **Formspree Payant** : ~10$/mois pour volume illimité
- **Google Apps Script** : Gratuit (quotas généreux)
- **Hébergement site** : Vercel/Netlify gratuit

### Recommandations
- **< 50 réservations** : Configuration gratuite suffisante
- **> 50 réservations** : Prévoir Formspree payant
- **Backup** : Créer un second formulaire Formspree en relais si nécessaire

## 🔒 Sécurité & Confidentialité

### Données Personnelles
- **RGPD** : Ajouter une clause de consentement au formulaire
- **Stockage** : Données dans Google Sheets (sécurisé Google)
- **Accès** : Limiter l'accès au Google Sheet aux organisateurs uniquement

### Configuration de Production
- **URLs** : Utiliser les vraies URLs de production dans `environment.prod.ts`
- **HTTPS** : S'assurer que le site est en HTTPS (automatique avec Vercel/Netlify)
- **CSP** : Configurer Content Security Policy pour autoriser Formspree et Google

## ✅ Checklist Avant Lancement

- [ ] Compte Formspree créé et configuré
- [ ] Google Apps Script déployé et testé
- [ ] Variables d'environnement mises à jour
- [ ] Test complet du processus de réservation
- [ ] Vérification de la réception d'emails
- [ ] Vérification de l'écriture Excel
- [ ] Test du code de paiement Mobile Money
- [ ] Validation des informations de contact
- [ ] Configuration du tarif final par place

---

**Le système est prêt techniquement. Seule la configuration des services externes est nécessaire pour le déploiement en production.**