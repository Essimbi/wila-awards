import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;
  activeSection = 'hero';

  navLinks = [
    { id: 'theme',       label: 'Thème' },
    { id: 'about',       label: 'WILA' },
    { id: 'programme',   label: 'Programme' },
    { id: 'jury',        label: 'Jury' },
    { id: 'sponsors',    label: 'Partenaires' },
    { id: 'venue',       label: 'Lieu' },
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
    // Active section detection
    const sections = this.navLinks.map(l => l.id).concat(['hero', 'reservation']);
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection = sections[i];
        break;
      }
    }
  }

  @HostListener('document:keydown.escape')
  closeMenuOnEscape(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.menuOpen = false;
  }
}
