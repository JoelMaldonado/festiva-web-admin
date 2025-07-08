import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppTopComponent } from '@components/app-top.component';
import { ClubService } from 'app/services/club.service';

@Component({
  selector: 'app-detail-club',
  imports: [ButtonModule, AppTopComponent],
  templateUrl: './detail-club.component.html',
})
export class DetailClubComponent implements OnInit {
  private readonly clubService = inject(ClubService);
  @Input() idClub!: string;

  club: any;

  ngOnInit(): void {
    this.clubService.getById(this.idClub).subscribe({
      next: (result) => {
        this.club = result.data;
      },
      error: (error) => {
        console.error('Error fetching club details:', error);
      },
    });
  }
}
