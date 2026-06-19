import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements AfterViewInit {
  tiers = [
    {
      name: 'Sponsors Platine',
      colorClass: 'tier-platinum',
      count: 3,
    },
    {
      name: 'Sponsors Or',
      colorClass: 'tier-gold',
      count: 4,
    },
    {
      name: 'Partenaires Médias',
      colorClass: 'tier-media',
      count: 5,
    },
    {
      name: 'Partenaires Institutionnels',
      colorClass: 'tier-inst',
      count: 4,
    },
  ];

  constructor(private sa: ScrollAnimationService) {}
  ngAfterViewInit(): void {
    this.sa.initReveal('.sponsors-header > *', { y: 0, opacity: 1, stagger: 0.12 });
    this.sa.initReveal('.tier-block', { y: 0, opacity: 1, stagger: 0.15, start: 'top 80%' });
    this.sa.initReveal('.sponsors-contact', { y: 0, opacity: 1, start: 'top 85%' });
  }
}
