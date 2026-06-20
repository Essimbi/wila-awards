import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-jury',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.scss']
})
export class JuryComponent implements AfterViewInit {
  categoriesEntreprises = [
    { icon: 'package', label: 'Prix de l\'excellence en logistique et Performance Opérationnelle', desc: 'Récompense la meilleure performance opérationnelle.' },
    { icon: 'leaf', label: 'Prix de la Durabilité et de l\'Impact Responsable', desc: 'Récompense l\'engagement écologique et sociétal.' },
    { icon: 'users', label: 'Parité & Leadership Féminin', desc: 'Entreprise favorisant la parité et l\'inclusion.' },
    { icon: 'laptop', label: 'Prix de l\'innovation et de la Transformation Opérationnelle', desc: 'Récompense la digitalisation et l\'innovation technologique.' },
    { icon: 'truck', label: 'Prix de l\'Excellence en Gestion de la Chaîne d\'Approvisionnement', desc: 'Gestion fluide et optimisée de bout en bout.' },
    { icon: 'globe', label: 'Prix de la Contribution au Développement de l\'écosystème', desc: 'Entreprise structurante pour le secteur logistique.' },
    { icon: 'sprout', label: 'Prix de l\'entreprise engagée pour l\'inclusion et le Développement des Talents', desc: 'Développement du capital humain et intégration.' },
  ];

  categoriesIndividuelles = [
    { icon: 'crown', label: 'Prix du Leadership en Supply Chain', desc: 'Leadership visionnaire dans la supply chain.' },
    { icon: 'truck', label: 'Prix du Leadership en Transport & Logistique', desc: 'Impact et direction dans le transport.' },
    { icon: 'award', label: 'Prix de l\'excellence Opérationnelle', desc: 'Rigueur et résultats remarquables au quotidien.' },
    { icon: 'zap', label: 'Prix du Leadership Innovant', desc: 'Pionnière des nouvelles approches métier.' },
    { icon: 'star', label: 'Prix de la Révélation Professionnelle', desc: 'Jeune talent avec un parcours exceptionnel.' },
  ];

  prixSpeciaux = [
    { icon: 'star', label: 'Prix Spécial 1', desc: 'Dévoilé lors de la cérémonie de gala.' },
    { icon: 'star', label: 'Prix Spécial 2', desc: 'Dévoilé lors de la cérémonie de gala.' },
    { icon: 'star', label: 'Prix Spécial 3', desc: 'Dévoilé lors de la cérémonie de gala.' },
  ];

  constructor(private sa: ScrollAnimationService, private sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.sa.initReveal('.jury-header > *', { y: 0, opacity: 1, blur: 0, stagger: 0.12, ease: 'power3.out' });
    this.sa.scaleReveal('.cat-card', { fromScale: 0.9, toScale: 1, duration: 1, start: 'top 80%' });
    this.sa.rotateReveal('.jury-cta-block', { fromRotation: -5, toRotation: 0, duration: 0.9, start: 'top 85%' });
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: Record<string, string> = {
      'truck': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M18 20h2a1 1 0 0 0 1-1v-3"/><path d="M18 11V6a2 2 0 0 0-2-2H4"/><path d="M14 15h4"/><path d="M2 20h20"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
      'package': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22v-9"/></svg>`,
      'laptop': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`,
      'leaf': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
      'crown': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
      'sprout': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.2-4.5-.1-1.1-.4-2-1.1-2.6-2.1-.3-1.1-.1-2.2.6-3.1 1.3-1.6 3.6-1.6 5.2 0 1.7 1.6 1.7 4.1 0 5.7"/></svg>`,
      'users': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      'globe': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
      'award': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      'zap': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      'star': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
