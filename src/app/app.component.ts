import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ThemeComponent } from './sections/theme/theme.component';
import { AboutComponent } from './sections/about/about.component';
import { ProgrammeComponent } from './sections/programme/programme.component';
import { JuryComponent } from './sections/jury/jury.component';
import { SponsorsComponent } from './sections/sponsors/sponsors.component';
import { VenueComponent } from './sections/venue/venue.component';
import { ReservationComponent } from './sections/reservation/reservation.component';
import { FooterComponent } from './shared/footer/footer.component';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, NavbarComponent, HeroComponent, ThemeComponent,
    AboutComponent, ProgrammeComponent, JuryComponent, SponsorsComponent,
    VenueComponent, ReservationComponent, FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private lenis?: Lenis;
  private rafId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger);
    this.initLenis();
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    // Connecter Lenis à GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };
    this.rafId = requestAnimationFrame(raf);
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
  }
}
