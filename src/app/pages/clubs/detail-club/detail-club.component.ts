import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detail-club',
  imports: [ButtonModule],
  templateUrl: './detail-club.component.html',
  styleUrl: './detail-club.component.css',
})
export class DetailClubComponent {
  @Input() idClub!: string;
  router = inject(Router);

  toLocations() {
    this.router.navigate(['menu', 'clubs', this.idClub, 'locations']);
  }
}
