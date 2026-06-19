import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  constructor(private sa: ScrollAnimationService) {}
  
  ngAfterViewInit(): void {
    // Désactiver les animations GSAP qui causent les problèmes de visibilité
    // Le contenu est maintenant visible par défaut avec animations CSS
    
    /*
    // Animations pour les éléments de texte à gauche
    this.sa.initReveal('.about-left > *', { 
      y: 30, 
      opacity: 0, 
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
    
    // Animation pour les statistiques
    this.sa.initReveal('.about-stat', { 
      y: 20, 
      opacity: 0, 
      stagger: 0.12,
      duration: 0.7,
      start: 'top 80%'
    });
    
    // Animation pour le logo et ses décorations
    this.sa.initReveal('.about-visual', { 
      opacity: 0, 
      scale: 0.9,
      duration: 1.2,
      ease: 'power3.out',
      start: 'top 75%' 
    });
    */
    
    // Garder seulement le parallax subtil qui ne casse pas la visibilité
    this.sa.parallax('.about-section', '.logo-container', -5);
  }
}
