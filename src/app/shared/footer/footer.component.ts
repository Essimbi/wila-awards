import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
<footer class="footer">
  <div class="footer-ribbon" aria-hidden="true">
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30" fill="none" stroke="rgba(212,175,55,0.15)" stroke-width="1"/>
    </svg>
  </div>
  <div class="footer-inner container">
    <div class="footer-brand">
      <img src="/logo_wila.png" alt="WILA Awards 2026" class="footer-logo">
      <p>1ère Édition · 03 Juillet 2026 · Douala, Cameroun</p>
    </div>
    <div class="footer-links">
      <a (click)="scrollTo('theme')">Thème</a>
      <a (click)="scrollTo('programme')">Programme</a>
      <a (click)="scrollTo('jury')">Catégories</a>
      <a (click)="scrollTo('venue')">Lieu</a>
      <a (click)="scrollTo('reservation')">Réservation</a>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Women in Logistics Africa · Tous droits réservés</p>
      <p class="footer-org">Organisé par WILA Cameroun</p>
    </div>
  </div>
</footer>
  `,
  styles: [`
.footer {
  background: var(--midnight-deep);
  border-top: 1px solid rgba(212,175,55,0.1);
  position: relative;
  overflow: hidden;
}
.footer-ribbon { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; svg { width: 100%; display: block; } }
.footer-inner { padding: 3rem 0 2rem; display: flex; flex-direction: column; gap: 2rem; }
.footer-brand {
  .footer-logo {
    height: 50px;
    width: auto;
    max-width: 250px;
    object-fit: contain;
    margin-bottom: 0.5rem;
    
    // Améliorer la visibilité sur fond sombre
    filter: brightness(1.1) saturate(1.1);
  }
  p { font-size: 0.78rem; color: var(--ivory-dim); letter-spacing: 0.1em; margin-top: 0.3rem; text-transform: uppercase; }
}
.footer-links { display: flex; flex-wrap: wrap; gap: 1.5rem;
  a { font-size: 0.8rem; color: var(--ivory-dim); text-decoration: none; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; transition: color 0.2s;
    &:hover { color: var(--gold); }
  }
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  p { font-size: 0.75rem; color: rgba(255,255,255,0.2); }
  .footer-org { color: rgba(212,175,55,0.4); }
}

@media (max-width: 768px) {
  .footer-inner { padding: 2.5rem 0 1.5rem; gap: 1.5rem; }
  .footer-links { gap: 1rem; }
  .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 0.8rem; }
}

@media (max-width: 480px) {
  .footer-inner { padding: 2rem 0 1rem; }
  .footer-brand {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    .footer-logo { max-width: 200px; height: 40px; }
  }
  .footer-links { justify-content: center; a { font-size: 0.75rem; } }
}
  `]
})
export class FooterComponent {
  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
