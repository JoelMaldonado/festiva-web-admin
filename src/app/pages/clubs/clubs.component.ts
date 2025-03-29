import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClubService } from '../../services/club.service';
import { Club } from '../../interfaces/club';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ClubLocationComponent } from './components/club-location/club-location.component';

@Component({
  selector: 'app-clubs',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ClubLocationComponent,
  ],
  templateUrl: './clubs.component.html',
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];

  clubService = inject(ClubService);

  ngOnInit(): void {
    this.getClubs();
  }

  value: string | undefined;
  visible = false;
  selectedClubId: number | null = null;

  getClubs() {
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clubs = res.data;
        } else {
          console.error(res.message);
        }
      },
    });
  }

  openDrawer(id: number) {
    this.selectedClubId = id;
    this.visible = true;
  }

  findPhones(id: number) {
    this.clubService.fetchClubPhones(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res.data);
        } else {
          console.error(res.message);
        }
      },
    });
  }
}
