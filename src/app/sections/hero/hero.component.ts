import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') heroCanvas!: ElementRef<HTMLCanvasElement>;

  private countdownIntervalId?: number;
  private canvasRafId?: number;
  private resizeListener?: () => void;
  eventPassed = false;

  ngAfterViewInit(): void {
    this.initCountdown();
    this.animateHeroEntrance();
    this.initParticles();
  }

  ngOnDestroy(): void {
    if (this.countdownIntervalId) clearInterval(this.countdownIntervalId);
    if (this.canvasRafId) cancelAnimationFrame(this.canvasRafId);
    if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
  }

  private animateHeroEntrance(): void {
    const tl = gsap.timeline({ delay: 0.3 });
    
    // Animation plus sophistiquée avec blur et scale
    tl.to('.hero-eyebrow',   { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' })
      .to('.hero-title',     { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.6')
      .to('.hero-subtitle',  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }, '-=0.7')
      .to('.hero-meta',      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .to('.hero-cta',       { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'back.out(1.7)' }, '-=0.5')
      .to('.hero-scroll-hint', { opacity: 1, duration: 0.8 }, '-=0.3');
  }

  private initCountdown(): void {
    const eventDate = new Date(environment.eventDate);
    const update = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        this.eventPassed = true;
        const el = (id: string) => document.getElementById(id);
        if (el('cd-days'))    el('cd-days')!.textContent    = '00';
        if (el('cd-hours'))   el('cd-hours')!.textContent   = '00';
        if (el('cd-minutes')) el('cd-minutes')!.textContent = '00';
        if (el('cd-seconds')) el('cd-seconds')!.textContent = '00';
        if (el('countdown-msg')) {
          el('countdown-msg')!.style.display = 'block';
          el('countdown-msg')!.setAttribute('aria-live', 'polite');
          el('countdown-msg')!.textContent = '✓ Événement terminé - Merci d\'avoir participé aux WILA Awards 2026!';
        }
        if (this.countdownIntervalId) clearInterval(this.countdownIntervalId);
        return;
      }
      
      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const el = (id: string) => document.getElementById(id);
      if (el('cd-days'))    el('cd-days')!.textContent    = String(days).padStart(2,'0');
      if (el('cd-hours'))   el('cd-hours')!.textContent   = String(hours).padStart(2,'0');
      if (el('cd-minutes')) el('cd-minutes')!.textContent = String(minutes).padStart(2,'0');
      if (el('cd-seconds')) el('cd-seconds')!.textContent = String(seconds).padStart(2,'0');
    };
    update();
    this.countdownIntervalId = window.setInterval(update, 1000);
  }

  private initParticles(): void {
    const canvas = this.heroCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: {x:number;y:number;r:number;vx:number;vy:number;a:number}[] = [];
    
    this.resizeListener = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    this.resizeListener();
    window.addEventListener('resize', this.resizeListener);
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.6 + 0.1,
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.a})`;
        ctx.fill();
      });
      this.canvasRafId = requestAnimationFrame(draw);
    };
    draw();
  }

  scrollToReservation(): void {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
