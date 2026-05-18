import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { AddClubComponent } from './components/add-club.component';
import { ClubService } from 'app/services/club.service';
import { Club } from '@dto/club';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-clubs',
  imports: [
    FormsModule,
    DrawerModule,
    AddClubComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './list-clubs.component.html',
})
export class ListClubsComponent implements OnInit {
  clubs: Club[] = [];
  clubsFiltered: Club[] = [];
  clubSelected?: Club;
  showForm = false;
  isLoading = false;
  filter = '';

  private readonly clubService = inject(ClubService);
  private readonly router = inject(Router);

  get hasFilter(): boolean {
    return this.filter.trim().length > 0;
  }

  ngOnInit(): void {
    this.getClubs();
  }

  search() {
    const term = this.filter.toLowerCase().trim();
    this.clubsFiltered = !term
      ? this.clubs
      : this.clubs.filter((c) => c.name.toLowerCase().includes(term));
  }

  clearFilter() {
    this.filter = '';
    this.clubsFiltered = [...this.clubs];
  }

  getClubs() {
    this.isLoading = true;
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clubs = res.data ?? [];
          this.clubsFiltered = res.data ?? [];
        }
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoading = false),
    });
  }

  newClub() {
    this.clubSelected = undefined;
    this.showForm = true;
  }

  editClub(club: Club) {
    this.clubSelected = club;
    this.showForm = true;
  }

  toDetail(id: number) {
    this.router.navigate(['menu', 'clubs', id]);
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'clubs', id, path]);
  }

  onSavedClub() {
    this.showForm = false;
    this.getClubs();
  }
}
