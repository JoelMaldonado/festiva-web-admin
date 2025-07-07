import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddClubComponent } from './components/add-club/add-club.component';
import { ClubLocationComponent } from './components/club-location/club-location.component';
import { ClubService } from '@services/club.service';
import { Club } from '@dto/club';
import { BtnUploadImageComponent } from '../../../../components/btn-upload-image.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  ImageFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { InputComponent } from '../../../../components/input/input.component';

@Component({
  selector: 'app-list-clubs',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ClubLocationComponent,
    DialogModule,
    AddClubComponent,
    InputTextModule,
    FileUploadModule,
    DrawerModule,
    FloatLabelModule,
    InputComponent,
  ],
  templateUrl: './list-clubs.component.html',
})
export class ListClubsComponent implements OnInit {
  private readonly uploadImageUseCase = inject(UploadImageUseCase);

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

  openDrawer(id: number) {
    this.selectedClubId = id;
    this.visible = true;
  }

  dialogEditLogo = false;

  openEditLogo() {
    this.dialogEditLogo = true;
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

  clubSelected?: Club;
  nameClub = new FormControl('');
  descriptionClub = new FormControl('');
  clubImageFile: File | null = null;

  myValor = '';
  myValorError?: string;

  newValor(event: any) {
  
    this.myValor = event;
    this.myValorError =
      this.myValor.length < 3
        ? 'El valor debe tener al menos 3 caracteres.'
        : undefined;
  }
}
