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
  categories = [
    { icon: 'truck', label: 'Leader en Transport & Mobilité', desc: 'Innovations et impact dans le transport de marchandises et la mobilité logistique.' },
    { icon: 'package', label: 'Leader en Gestion de la Chaîne', desc: 'Excellence dans l\'optimisation de la supply chain end-to-end.' },
    { icon: 'laptop', label: 'Innovation Digitale', desc: 'Transformation numérique des opérations logistiques et supply chain.' },
    { icon: 'leaf', label: 'Supply Chain Durable', desc: 'Engagement environnemental et pratiques logistiques responsables.' },
    { icon: 'crown', label: 'Leadership Exceptionnel', desc: 'Impact organisationnel et leadership transformatif au féminin.' },
    { icon: 'sprout', label: 'Jeune Talent Prometteuse', desc: 'Femme de moins de 35 ans avec un parcours remarquable.' },
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
      'sprout': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.2-4.5-.1-1.1-.4-2-1.1-2.6-2.1-.3-1.1-.1-2.2.6-3.1 1.3-1.6 3.6-1.6 5.2 0 1.7 1.6 1.7 4.1 0 5.7"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
