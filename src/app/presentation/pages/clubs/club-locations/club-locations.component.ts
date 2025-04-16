import { Location } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardClubLocation } from './components/card-club-location';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormClubLocation } from './components/drawer-form-club-location';
import { ClubService } from '@services/club.service';
import { ClubLocationService } from '@services/club-location.service';
import { ClubLocation } from '@interfaces/club-location';

@Component({
  selector: 'app-club-locations',
  imports: [
    ButtonModule,
    CardClubLocation,
    DrawerModule,
    DrawerFormClubLocation,
  ],
  templateUrl: './club-locations.component.html',
  styleUrl: './club-locations.component.css',
})
export class ClubLocationsComponent implements OnInit {
  locations: ClubLocation[] = [];

  @Input() idClub!: string;

  router = inject(Router);
  location = inject(Location);
  clubService = inject(ClubService);
  clubLocationService = inject(ClubLocationService);

  ngOnInit(): void {
    this.getClubLocations();
  }

  back() {
    this.location.back();
  }

  isFormVisible = false;
  selectedClubLocation?: ClubLocation = undefined;

  addNewClubLocation() {
    this.selectedClubLocation = undefined;
    this.isFormVisible = true;
  }

  editClubLocation(location: ClubLocation) {
    this.selectedClubLocation = location;
    this.isFormVisible = true;
  }

  getClubLocations() {
    this.clubLocationService.fetchByIdClub(this.idClub).subscribe({
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
