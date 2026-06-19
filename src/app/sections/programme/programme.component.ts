import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-programme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})
export class ProgrammeComponent implements AfterViewInit {
  timeline = [
    { time: '18h00', icon: 'door-open', title: 'Accueil & Cocktail de bienvenue', desc: 'Arrivée des invités, cocktail dînatoire, séances photos et networking.' },
    { time: '18h45', icon: 'mic', title: 'Cérémonie d\'ouverture officielle', desc: 'Discours de la Présidente de WILA, mot des partenaires institutionnels.' },
    { time: '19h15', icon: 'masks', title: 'Intermède culturel', desc: 'Performance artistique célébrant la femme africaine dans le monde professionnel.' },
    { time: '19h30', icon: 'award', title: 'Remise des WILA Awards', desc: 'Présentation des nominées, témoignages, remise des trophées par catégorie.' },
    { time: '21h00', icon: 'utensils', title: 'Dîner de gala', desc: 'Dîner officiel avec animation, échanges et réseautage entre participants.' },
    { time: '22h00', icon: 'music', title: 'Soirée musicale & Networking', desc: 'Clôture musicale, séances photos officielles, échanges libres entre invités.' },
    { time: '23h00', icon: 'star', title: 'Fin de la cérémonie', desc: 'Clôture officielle de la 1ère édition des WILA Awards 2026.' },
  ];

  constructor(private sa: ScrollAnimationService, private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.sa.initReveal('.prog-header > *', { y: 0, opacity: 1, blur: 0, stagger: 0.12, ease: 'power3.out' });
    this.sa.horizontalStagger('.prog-item', { x: 80, stagger: 0.15, duration: 0.9, start: 'top 85%' });
    this.sa.scaleReveal('.prog-dot', { fromScale: 0.6, toScale: 1, duration: 0.8, start: 'top 85%' });
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: Record<string, string> = {
      'door-open': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 22h-5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/><path d="M13 2v20"/><path d="M18 15v3a2 2 0 0 1-2 2H5"/><path d="M22 6v8a2 2 0 0 1-2 2H6"/></svg>`,
      'mic': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
      'masks': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="8" height="6" x="8" y="9" rx="1"/></svg>`,
      'award': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      'utensils': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,
      'music': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
      'star': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
