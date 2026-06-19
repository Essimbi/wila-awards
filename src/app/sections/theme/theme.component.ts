import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements AfterViewInit {
  particles: Array<{x: number, y: number, delay: number}> = [];
  
  stats = [
    { 
      icon: 'users', 
      number: 200, 
      display: '200+', 
      label: 'Invités Prestigieux', 
      desc: 'Leaders et décideuses de toute l\'Afrique' 
    },
    { 
      icon: 'globe', 
      number: 25, 
      display: '25+', 
      label: 'Pays Représentés', 
      desc: 'Une couverture panafricaine inédite' 
    },
    { 
      icon: 'award', 
      number: 6, 
      display: '6', 
      label: 'Catégories de Prix', 
      desc: 'Célébrant tous les aspects du leadership' 
    },
    { 
      icon: 'star', 
      number: 1, 
      display: '1ère', 
      label: 'Édition Historique', 
      desc: 'Le début d\'une tradition d\'excellence' 
    }
  ];

  pillars = [
    { 
      icon: 'award', 
      title: 'Excellence', 
      desc: 'Honorer les femmes qui transforment la logistique africaine par leur leadership exceptionnel et leur vision innovante.' 
    },
    { 
      icon: 'zap', 
      title: 'Innovation', 
      desc: 'Célébrer les initiatives qui digitalisent et modernisent les chaînes d\'approvisionnement du continent africain.' 
    },
    { 
      icon: 'globe', 
      title: 'Impact Continental', 
      desc: 'Des lauréates de 25+ pays, incarnant la vision d\'une supply chain africaine intégrée et performante.' 
    },
    { 
      icon: 'users', 
      title: 'Réseautage', 
      desc: 'Créer les connexions stratégiques qui feront les partenariats et collaborations de demain entre professionnelles.' 
    },
  ];

  constructor(
    private sa: ScrollAnimationService,
    private sanitizer: DomSanitizer
  ) {
    this.generateParticles();
  }

  ngAfterViewInit(): void {
    // Désactivation temporaire des animations GSAP ScrollTrigger problématiques
    // Garder seulement les effets de parallax qui ne causent pas de disparition
    
    // this.initScrollAnimations(); // DÉSACTIVÉ
    // this.initCounterAnimations(); // DÉSACTIVÉ  
    // this.initPillarStoryTelling(); // DÉSACTIVÉ
    
    // Garder seulement les effets visuels non-invasifs
    this.initParallaxEffects();
    this.initScrollProgressBar();
    this.initScrollStateEffects();
    
    // S'assurer que tous les éléments restent visibles
    this.ensureAllVisible();
  }

  private ensureAllVisible(): void {
    // Force la visibilité de tous les éléments
    const section = document.querySelector('.theme-section') as HTMLElement;
    if (section) {
      section.classList.add('force-visible');
    }
    
    // Démarrer les compteurs après 2 secondes (quand les stats sont visibles)
    setTimeout(() => {
      this.initSimpleCounters();
    }, 2000);
  }

  private initSimpleCounters(): void {
    // Animation des compteurs sans ScrollTrigger
    this.stats.forEach((stat, index) => {
      const selector = `.stat-card:nth-child(${index + 1}) .stat-number`;
      const element = document.querySelector(selector) as HTMLElement;
      
      if (element && element.textContent) {
        // Vérifier si l'élément est visible avant d'animer
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          this.animateCounterSimple(element, stat.number, stat.display);
        } else {
          // Si pas visible, utiliser IntersectionObserver
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.animateCounterSimple(element, stat.number, stat.display);
                observer.unobserve(entry.target);
              }
            });
          });
          observer.observe(element);
        }
      }
    });
  }

  private animateCounterSimple(element: HTMLElement, finalNumber: number, displayFormat: string): void {
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(finalNumber * easedProgress);
      
      // Mise à jour du texte selon le format
      element.textContent = displayFormat.replace(/\d+/, currentValue.toString());
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = displayFormat; // Valeur finale exacte
      }
    };
    
    requestAnimationFrame(animate);
  }

  private initScrollProgressBar(): void {
    // Barre de progression basée sur le scroll de la section
    if (typeof window !== 'undefined') {
      const progressBar = document.querySelector('.progress-fill') as HTMLElement;
      
      if (progressBar) {
        window.addEventListener('scroll', () => {
          const section = document.querySelector('.theme-section') as HTMLElement;
          if (section) {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculer le pourcentage de progression dans la section
            const progress = Math.max(0, Math.min(1, 
              (windowHeight - rect.top) / (sectionHeight + windowHeight)
            ));
            
            progressBar.style.width = `${progress * 100}%`;
          }
        });
      }
    }
  }

  private initScrollStateEffects(): void {
    // Effet sur la section selon l'état de scroll
    if (typeof window !== 'undefined') {
      let scrollTimeout: number;
      
      window.addEventListener('scroll', () => {
        const section = document.querySelector('.theme-section') as HTMLElement;
        if (section) {
          section.classList.add('scrolling');
          
          clearTimeout(scrollTimeout);
          scrollTimeout = window.setTimeout(() => {
            section.classList.remove('scrolling');
          }, 150);
        }
      });
    }
  }

  private initScrollAnimations(): void {
    // Animation de l'eyebrow (qui était manquante)
    this.sa.initReveal('.theme-eyebrow', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      start: 'top 90%',
      ease: 'power2.out'
    });

    // Animation séquentielle du titre au scroll
    this.sa.initReveal('.theme-title .title-line', {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      start: 'top 85%',
      ease: 'power3.out'
    });

    // Animation du badge année avec rotation
    this.sa.rotateReveal('.theme-badge-year', {
      fromRotation: -15,
      toRotation: 0,
      duration: 1,
      start: 'top 90%'
    });

    // Animation du sous-titre avec blur
    this.sa.blurReveal('.theme-subtitle', {
      fromBlur: 8,
      toBlur: 0,
      duration: 1.2,
      start: 'top 80%'
    });

    // Animation du corps de texte
    this.sa.initReveal('.theme-body', {
      y: 60,
      opacity: 0,
      duration: 1,
      start: 'top 75%',
      ease: 'power2.out'
    });

    // Animation du bouton CTA avec scale
    this.sa.scaleReveal('.theme-cta', {
      fromScale: 0.8,
      toScale: 1,
      duration: 0.8,
      start: 'top 70%'
    });

    // Animation de l'image avec parallax et scale
    this.sa.scaleReveal('.theme-visual-frame', {
      fromScale: 0.85,
      toScale: 1,
      duration: 1.5,
      start: 'top 80%'
    });

    // Fallback de sécurité : s'assurer que tous les éléments sont visibles après 3 secondes
    setTimeout(() => {
      this.ensureVisibility();
    }, 3000);
  }

  private ensureVisibility(): void {
    // Fonction de sécurité pour rendre visibles tous les éléments
    const selectors = [
      '.theme-eyebrow',
      '.theme-title .title-line',
      '.theme-badge-year',
      '.theme-subtitle',
      '.theme-body',
      '.theme-cta',
      '.theme-visual-frame',
      '.stats-title',
      '.pillars-title',
      '.pillars-subtitle'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const element = el as HTMLElement;
        if (element && element.style.opacity === '0') {
          element.style.opacity = '1';
          element.style.transform = 'none';
        }
      });
    });
  }

  private initParallaxEffects(): void {
    // Parallax très subtil sur l'image principale seulement
    this.sa.parallax3D('.theme-section', '.theme-visual-frame', {
      yPercent: -8,
      scrub: 2
    });

    // Parallax léger sur les éléments géométriques de fond
    this.sa.parallax3D('.theme-section', '.geometry-ring.ring-1', {
      yPercent: -12,
      rotation: 15,
      scrub: 3
    });

    this.sa.parallax3D('.theme-section', '.geometry-ring.ring-2', {
      yPercent: -18,
      rotation: -20,
      scrub: 2.5
    });

    // Parallax sur les particules - très léger
    this.sa.parallax3D('.theme-section', '.particle:nth-child(odd)', {
      yPercent: -10,
      scrub: 2
    });

    this.sa.parallax3D('.theme-section', '.particle:nth-child(even)', {
      yPercent: -15,
      scrub: 2.5
    });
  }

  private initCounterAnimations(): void {
    // Animation des statistiques avec compteur
    this.sa.initReveal('.stat-card', {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      start: 'top 80%',
      ease: 'power3.out'
    });

    // Animation des titres de stats
    this.sa.initReveal('.stats-title', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      start: 'top 85%',
      ease: 'power2.out'
    });

    // Animation des compteurs avec effet numérique
    this.initStatCounters();
  }

  private initStatCounters(): void {
    // Animation des compteurs numériques au scroll
    this.stats.forEach((stat, index) => {
      setTimeout(() => {
        const selector = `.stat-card:nth-child(${index + 1}) .stat-number`;
        this.animateCounter(selector, 0, stat.number, 2000);
      }, index * 200 + 1000); // Délai basé sur l'index
    });
  }

  private animateCounter(selector: string, start: number, end: number, duration: number): void {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(selector) as HTMLElement;
      if (!element) return;

      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Fonction d'easing pour un effet plus naturel
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easedProgress);
        
        // Mise à jour du texte avec formatage
        if (selector.includes(':nth-child(1)')) {
          element.textContent = `${currentValue}+`;
        } else if (selector.includes(':nth-child(2)')) {
          element.textContent = `${currentValue}+`;
        } else if (selector.includes(':nth-child(4)')) {
          element.textContent = `${currentValue}ère`;
        } else {
          element.textContent = currentValue.toString();
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      // Démarrer l'animation quand l'élément est visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(element);
    }
  }

  private initPillarStoryTelling(): void {
    // Animation du header des piliers
    this.sa.initReveal('.pillars-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      start: 'top 85%',
      ease: 'power3.out'
    });

    this.sa.initReveal('.pillars-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      start: 'top 80%',
      ease: 'power2.out'
    });

    // Animation simplifiée des piliers - tous ensemble
    this.sa.initReveal('.theme-pillar', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      start: 'top 75%',
      ease: 'power3.out'
    });

    // Animation progressive des éléments internes des piliers
    setTimeout(() => {
      this.initProgressiveReveal();
    }, 1500);
  }

  private initProgressiveReveal(): void {
    // Animation progressive des icônes de piliers - plus simple
    this.sa.initReveal('.pillar-icon', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      start: 'top 70%',
      ease: 'back.out(1.7)'
    });

    // Animation des numéros de piliers - plus simple
    this.sa.initReveal('.pillar-number', {
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      start: 'top 65%',
      ease: 'power2.out'
    });
  }

  // Méthode pour créer un effet de "typewriter" sur les titres
  private initTypewriterEffect(): void {
    // Cette méthode peut être appelée pour des effets de texte avancés
    // Sera implémentée si nécessaire
  }

  private generateParticles(): void {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4
      });
    }
  }

  onPillarHover(index: number, isHover: boolean): void {
    // Animation interactive pour les piliers
    const pillar = document.querySelectorAll('.theme-pillar')[index] as HTMLElement;
    if (pillar) {
      if (isHover) {
        pillar.style.transform = 'translateY(-8px) scale(1.02)';
        pillar.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.15)';
      } else {
        pillar.style.transform = 'translateY(0) scale(1)';
        pillar.style.boxShadow = 'none';
      }
    }
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: Record<string, string> = {
      award: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      zap: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      globe: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
      users: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      star: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
