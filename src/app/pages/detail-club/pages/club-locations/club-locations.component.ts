import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ClubLocation } from '../../../../interfaces/club-location';
import { ClubService } from '../../../../services/club.service';
import { ClubLocationService } from '../../../../services/club-location.service';
import { CardClubLocation } from './components/card-club-location';

@Component({
  selector: 'app-club-locations',
  imports: [ButtonModule, CardClubLocation],
  templateUrl: './club-locations.component.html',
  styleUrl: './club-locations.component.css',
})
export class ClubLocationsComponent implements OnInit {
  locations: ClubLocation[] = [];

  location = inject(Location);
  clubService = inject(ClubService);
  clubLocationService = inject(ClubLocationService);

  ngOnInit(): void {
    this.getClubLocations();
  }

  back() {
    this.location.back();
  }

  getClubLocations() {
    this.clubLocationService.fetchByIdClub(4).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.locations = res.data ?? [];
        } else {
          console.error('Error fetching club locations:', res.message);
        }
      },
      error: (error) => {
        console.error('Error fetching club locations:', error);
      },
    });
  }
}
