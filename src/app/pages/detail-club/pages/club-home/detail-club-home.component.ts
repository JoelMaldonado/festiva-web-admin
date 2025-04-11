import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detail-club-home',
  imports: [ButtonModule],
  templateUrl: './detail-club-home.component.html',
  styleUrl: './detail-club-home.component.css',
})
export class DetailClubHomeComponent {
  router = inject(Router);

  toLocations() {
    this.router.navigate(['menu', 'clubs', 4, 'locations']);
  }
}
