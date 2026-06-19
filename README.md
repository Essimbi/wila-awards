# WILA Awards 2026 — Site Officiel

Site vitrine premium en **scrollytelling** pour la 1ère édition des **WILA Awards** (Women in Logistics Africa), le **03 juillet 2026** à l'Hôtel Platinum Cocotiers, Douala.

Construit en **Angular 18** (standalone components), animé avec **GSAP + ScrollTrigger** et **Lenis** (smooth scrolling).

---

## 🚀 Démarrage rapide

```bash
npm install
npm start
```

Le site sera accessible sur `http://localhost:4200`.

Pour un build de production :

```bash
npm run build
```

Les fichiers statiques sont générés dans `dist/wila-app/browser/` — prêts à déployer sur **Vercel** ou **Netlify** (drag & drop du dossier, ou connexion au repo Git).

---

## ⚙️ Configuration OBLIGATOIRE avant mise en ligne

Le formulaire de réservation (`src/app/core/services/reservation.service.ts`) envoie chaque réservation vers **deux services externes gratuits**, sans aucun backend à héberger :

| Service | Rôle | Fichier à modifier |
|---|---|---|
| **Formspree** | Envoie un email aux organisatrices à chaque réservation | `reservation.service.ts` → `FORMSPREE` |
| **Google Apps Script** | Écrit chaque réservation dans un Google Sheet partagé | `reservation.service.ts` → `APPS_SCRIPT` |

### 1. Configurer Formspree (email automatique)

1. Créer un compte gratuit sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire, renseigner l'email de **Blandine Flore Fobasso Tchoffo Epse Kochele** (ou l'email officiel WILA) comme destinataire
3. Copier l'URL du endpoint (format `https://formspree.io/f/xxxxxxxx`)
4. Remplacer dans `src/app/core/services/reservation.service.ts` :
   ```typescript
   private readonly FORMSPREE = 'https://formspree.io/f/VOTRE_FORMSPREE_ID';
   ```

> Le plan gratuit Formspree permet 50 soumissions/mois. Pour 200 invités potentiels, prévoir le plan payant (~10$/mois) ou utiliser un deuxième formulaire en relais si besoin.

### 2. Configurer Google Apps Script (Google Sheet)

1. Créer un nouveau Google Sheet, nommer l'onglet `Réservations`
2. Dans le Sheet : **Extensions → Apps Script**
3. Coller ce code dans `Code.gs` :

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

4. **Déployer → Nouveau déploiement → Type : Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
5. Copier l'URL du déploiement (format `https://script.google.com/macros/s/xxxxx/exec`)
6. Remplacer dans `reservation.service.ts` :
   ```typescript
   private readonly APPS_SCRIPT = 'https://script.google.com/macros/s/VOTRE_ID/exec';
   ```

> ⚠️ Si vous modifiez plus tard le script, il faut **redéployer une nouvelle version** (Déployer → Gérer les déploiements → Modifier) pour que les changements soient pris en compte par l'URL existante.

### 3. Ajuster le tarif par place

Dans `reservation.service.ts` :

```typescript
static readonly PRIX_PLACE = 25000; // FCFA — à ajuster selon le tarif réel
```

### 4. Vérifier le code de paiement

Le code de paiement est généré dynamiquement : `#150*46*3786250*{montant}#`, au nom de **Blandine Flore Fobasso Tchoffo Epse Kochele**. Il s'affiche automatiquement à l'écran après soumission du formulaire — aucune configuration additionnelle requise pour cette partie.

---

## 📁 Structure du projet

```
src/app/
├── core/
│   └── services/
│       ├── reservation.service.ts      # Orchestration Formspree + Apps Script
│       └── scroll-animation.service.ts # Helpers GSAP/ScrollTrigger réutilisables
├── shared/
│   ├── navbar/                         # Navigation fixe avec détection de section active
│   └── footer/
├── sections/
│   ├── hero/          # Écran d'accueil, countdown, particules animées
│   ├── theme/          # Thème de l'édition + chiffres clés
│   ├── about/          # À propos de WILA
│   ├── programme/      # Timeline du déroulé de la soirée (18h-23h)
│   ├── jury/            # 6 catégories de prix
│   ├── sponsors/        # Partenaires (PLACEHOLDERS — logos à intégrer)
│   ├── venue/           # Lieu, carte stylisée, infos pratiques
│   └── reservation/     # Formulaire + écran de paiement (le cœur fonctionnel)
├── app.component.ts     # Bootstrap Lenis (smooth scroll) + GSAP ScrollTrigger
```

---

## 🎨 Système de design

Variables CSS centralisées dans `src/styles.scss` :

- **Couleurs** : bleu nuit (`--midnight`), or (`--gold`), rouge cramoisi (`--crimson`), ivoire (`--ivory`) — fidèles à la charte de l'affiche officielle
- **Typographies** : Fraunces (titres), Inter (corps), Playfair Display italique (accents/labels de section)
- **Easings** : `--ease-smooth`, `--ease-bounce`, `--ease-out-expo` — courbes cubic-bezier cohérentes sur tout le site

## 🖼️ Visuels à remplacer

Pour des raisons de droits d'auteur, **aucune photo n'a été intégrée** depuis des banques d'images tierces. Le site utilise actuellement :
- Des illustrations SVG générées sur-mesure (silhouettes, cartes, réseaux)
- Des placeholders stylés pour la section Sponsors

**Avant mise en ligne**, il est recommandé de remplacer ces éléments par :
- De vraies photos des éditions précédentes ou des nominées (si disponibles)
- Les logos réels des sponsors/partenaires (section `sponsors`)
- Éventuellement des visuels achetés sur une banque d'images sous licence (Unsplash Plus, Getty, Adobe Stock) pour renforcer l'aspect premium

## ✨ Animations

- **Smooth scroll global** : Lenis, avec easing exponentiel personnalisé
- **Reveal au scroll** : Fade-in + Slide-up via GSAP ScrollTrigger, déclenché à `top 80-85%` du viewport
- **Staggering** : décalage de 0.1–0.15s sur les grilles (cartes catégories, piliers, timeline)
- **Parallaxe** : éléments de fond (cercles, rubans) qui se déplacent en `scrub` lors du scroll
- **Cubic-bezier** : toutes les transitions interactives (hover, boutons) utilisent des courbes douces définies en variables CSS

---

## 📞 Support

Pour toute question technique sur ce site, contacter le développeur en charge du projet.
