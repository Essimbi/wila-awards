import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent implements AfterViewInit {
  infos = [
    { icon: 'map-pin', label: 'Adresse', value: 'Hôtel Platinum Cocotiers, Boulevard de la Liberté, Akwa, Douala, Cameroun' },
    { icon: 'calendar', label: 'Date', value: 'Vendredi 03 Juillet 2026' },
    { icon: 'clock', label: 'Horaires', value: '18h00 – 23h00 (Accueil à partir de 17h30)' },
    { icon: 'shirt', label: 'Tenue recommandée', value: 'Tenue de soirée / Élégante' },
    { icon: 'circle-parking', label: 'Parking', value: 'Disponible sur place (capacité limitée)' },
  ];

  constructor(private sa: ScrollAnimationService, private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    // Désactiver les animations GSAP problématiques, garder seulement les effets visuels subtils
    // Le contenu est maintenant visible par défaut
    
    /*
    this.sa.initReveal('.venue-header > *', { y: 0, opacity: 1, blur: 0, stagger: 0.12, ease: 'power3.out' });
    this.sa.horizontalStagger('.venue-info-item', { x: 60, stagger: 0.1, duration: 0.85, start: 'top 80%' });
    this.sa.scaleReveal('.venue-map-placeholder', { fromScale: 0.95, toScale: 1, duration: 1, start: 'top 80%' });
    */
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: Record<string, string> = {
      'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
      'calendar': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
      'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      'shirt': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.4a1.6 1.6 0 0 0-2.22 0l-1.62 1.62a1.6 1.6 0 0 0 0 2.22l1.62 1.62a1.6 1.6 0 0 0 2.22 0l1.62-1.62a1.6 1.6 0 0 0 0-2.22z"/><path d="M9.62 3.4a1.6 1.6 0 0 0-2.22 0l-1.62 1.62a1.6 1.6 0 0 0 0 2.22l1.62 1.62a1.6 1.6 0 0 0 2.22 0l1.62-1.62a1.6 1.6 0 0 0 0-2.22z"/><path d="M12 12v8"/><path d="M12 18h4"/><path d="M12 14l4-4"/><path d="M12 14l-4-4"/></svg>`,
      'circle-parking': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 10v5"/><path d="M12 10h3a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-3"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
