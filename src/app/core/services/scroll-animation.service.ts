import { Injectable, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService implements OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  // Reveal amélioré avec plus d'options
  initReveal(selector: string, options: Partial<{
    y: number; x: number; scale: number; opacity: number;
    stagger: number; duration: number; delay: number; start: string;
    rotation: number; skewX: number; skewY: number; blur: number;
    ease: string;
  }> = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      y: 0, x: 0, scale: 1, opacity: 1, rotation: 0, skewX: 0, skewY: 0, blur: 0,
      stagger: 0.12, duration: 0.9, delay: 0, start: 'top 85%', ease: 'power3.out',
      ...options
    };

    const animationProps: any = {
      y: cfg.y, x: cfg.x, scale: cfg.scale, opacity: cfg.opacity,
      rotation: cfg.rotation, skewX: cfg.skewX, skewY: cfg.skewY,
      duration: cfg.duration, delay: cfg.delay,
      stagger: cfg.stagger,
      ease: cfg.ease,
      scrollTrigger: {
        trigger: selector,
        start: cfg.start,
        toggleActions: 'play none none none',
      }
    };

    if (cfg.blur > 0) {
      animationProps.filter = `blur(${cfg.blur}px)`;
    }

    gsap.to(selector, animationProps);
  }

  // Parallax 3D amélioré
  parallax3D(trigger: string, target: string, options: {
    yPercent?: number; xPercent?: number; rotation?: number; scale?: number;
    scrub?: number; ease?: string;
  } = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      yPercent: -20, xPercent: 0, rotation: 0, scale: 1,
      scrub: 1.5, ease: 'none',
      ...options
    };

    gsap.to(target, {
      yPercent: cfg.yPercent,
      xPercent: cfg.xPercent,
      rotation: cfg.rotation,
      scale: cfg.scale,
      ease: cfg.ease,
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: cfg.scrub,
      }
    });
  }

  // Parallax générique
  parallax(trigger: string, target: string, yPercent: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.to(target, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  }

  // Scrub de texte (pin + scroll lié)
  pinSection(trigger: string, duration: string = '200%'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: duration,
      pin: true,
      pinSpacing: true,
    });
  }

  // Animation de scale progressif
  scaleReveal(selector: string, options: Partial<{
    fromScale: number; toScale: number; duration: number; start: string;
  }> = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      fromScale: 0.8, toScale: 1, duration: 1, start: 'top 80%',
      ...options
    };

    gsap.fromTo(selector,
      { scale: cfg.fromScale, opacity: 0 },
      {
        scale: cfg.toScale,
        opacity: 1,
        duration: cfg.duration,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: selector,
          start: cfg.start,
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // Animation de rotation progressive
  rotateReveal(selector: string, options: Partial<{
    fromRotation: number; toRotation: number; duration: number; start: string;
  }> = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      fromRotation: -10, toRotation: 0, duration: 1, start: 'top 80%',
      ...options
    };

    gsap.fromTo(selector,
      { rotation: cfg.fromRotation, opacity: 0 },
      {
        rotation: cfg.toRotation,
        opacity: 1,
        duration: cfg.duration,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: selector,
          start: cfg.start,
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // Animation de blur reveal
  blurReveal(selector: string, options: Partial<{
    fromBlur: number; toBlur: number; duration: number; start: string;
  }> = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      fromBlur: 10, toBlur: 0, duration: 1, start: 'top 80%',
      ...options
    };

    gsap.fromTo(selector,
      { filter: `blur(${cfg.fromBlur}px)`, opacity: 0 },
      {
        filter: `blur(${cfg.toBlur}px)`,
        opacity: 1,
        duration: cfg.duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: selector,
          start: cfg.start,
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // Animation de stagger horizontal
  horizontalStagger(selector: string, options: Partial<{
    x: number; stagger: number; duration: number; start: string;
  }> = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const cfg = {
      x: 100, stagger: 0.15, duration: 0.8, start: 'top 85%',
      ...options
    };

    gsap.fromTo(selector,
      { x: cfg.x, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: cfg.duration,
        stagger: cfg.stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: selector,
          start: cfg.start,
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // Refresh ScrollTrigger (appeler après changement DOM)
  refresh(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }
}
