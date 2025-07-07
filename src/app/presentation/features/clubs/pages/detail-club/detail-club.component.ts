import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-detail-club',
  imports: [ButtonModule],
  templateUrl: './detail-club.component.html',
})
export class DetailClubComponent {
  @Input() idClub!: string;
}
