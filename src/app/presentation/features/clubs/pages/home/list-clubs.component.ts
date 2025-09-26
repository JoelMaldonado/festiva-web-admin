import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddClubComponent } from './components/add-club.component';
import { ClubService } from 'app/services/club.service';
import { Club } from '@dto/club';
import { FileUploadModule } from 'primeng/fileupload';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppFestButtonComponent } from "@components/fest-button.component";

@Component({
  selector: 'app-list-clubs',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    AddClubComponent,
    InputTextModule,
    FileUploadModule,
    DrawerModule,
    FloatLabelModule,
    AppFestButtonComponent
],
  templateUrl: './list-clubs.component.html',
})
export class ListClubsComponent implements OnInit {
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
  isLoading = false;
  router = inject(Router);

  onSavedClub() {
    this.showForm = false;
    this.getClubs();
  }

  getClubs() {
    this.isLoading = true;
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clubs = res.data ?? [];
          this.clubsFiltered = res.data ?? [];
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

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'clubs', id, path]);
  }

  toDetail(id: number) {
    this.router.navigate(['menu', 'clubs', id]);
  }

  clubSelected?: Club;
}
