import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClubService } from '../../services/club.service';
import { Club } from '../../interfaces/club';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClubLocationComponent } from './components/club-location/club-location.component';
import { DialogModule } from 'primeng/dialog';
import { AddClubComponent } from './components/add-club/add-club.component';
import { delay } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-clubs',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ClubLocationComponent,
    DialogModule,
    AddClubComponent,
    InputTextModule,
  ],
  templateUrl: './clubs.component.html',
})
export class ClubsComponent implements OnInit {
  clubs: Club[] = [];
  clubsFiltered: Club[] = [];

  clubService = inject(ClubService);

  filter = '';

  showForm = false;

  search() {
    if (this.filter.length === 0) {
      this.clubsFiltered = this.clubs;
    } else {
      this.clubsFiltered = this.clubs.filter((club) =>
        club.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  ngOnInit(): void {
    this.getClubs();
  }

  value: string | undefined;
  visible = false;
  selectedClubId: number | null = null;
  isLoading = false;

  onSavedClub() {
    this.showForm = false;
    this.getClubs();
  }

  getClubs() {
    this.isLoading = true;
    this.clubService
      .fetchAll()
      .pipe(delay(500))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.clubs = res.data;
            this.clubsFiltered = res.data;
          } else {
            console.error(res.message);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
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
