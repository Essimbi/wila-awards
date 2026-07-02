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
  partners = [
    { name: 'Port Autonome de Douala', logo: '/assets/partners/port_autonome_de_douala.png' },
    { name: 'Direction Générale des Douanes', logo: '/assets/partners/direction_generale_des_douanes.jpeg' },
    { name: 'Ministère de la Promotion de la Femme et de la Famille', logo: '/assets/partners/minister_de_la_formation_professionnelle_dej_la_femme_et_de_la_famille.png' },
    { name: 'Ministère des Postes et Télécommunications', logo: '/assets/partners/ministere_des_posts_et_telecom.jpeg' },
    { name: 'Terminal Bois du Port de Douala', logo: '/assets/partners/terminal_bois_du_port_de_douala.png' },
    { name: 'Agora Shipping & Logistics', logo: '/assets/partners/agora_shipping_logistics.jpeg' },
    { name: 'Maersk', logo: '/assets/partners/maersk_group.jpg' },
    { name: 'Konnex', logo: '/assets/partners/konnex.jpeg' },
    { name: 'Destiny Marine Survey', logo: '/assets/partners/destiny_marine_survey.jpeg' },
    { name: '3CM Communications & Technologies', logo: '/assets/partners/3cm_communications_et_technologies.jpeg' },
    { name: 'Balafon TV', logo: '/assets/partners/balafon_tv.jpeg' },
    { name: 'Projecteur Magazine', logo: '/assets/partners/projecteur_magazine.png' },
    { name: 'Platinum Cocotiers Hôtel', logo: '/assets/partners/platinum_cocotiers_hotel.jpg' },
    { name: 'Ecobank', logo: '/assets/partners/ecobank.jpeg' },
  ];

  constructor(private sa: ScrollAnimationService) {}
  ngAfterViewInit(): void {
    this.sa.initReveal('.sponsors-header > *', { y: 0, opacity: 1, stagger: 0.12 });
    this.sa.initReveal('.partner-card', { y: 0, opacity: 1, stagger: 0.1, start: 'top 80%' });
    this.sa.initReveal('.sponsors-contact', { y: 0, opacity: 1, start: 'top 85%' });
  }
}
