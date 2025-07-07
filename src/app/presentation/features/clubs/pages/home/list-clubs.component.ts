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

  isLoadingSave = false;

  onSelectImage(event: any) {
    this.clubImageFile = event.files[0];
  }

  async onSubmit(event: any) {
    event.preventDefault();
    if (!this.nameClub.value) {
      console.log('El nombre del club es requerido.');
      return;
    }

    if (!this.descriptionClub.value) {
      console.log('La descripción del club es requerida.');
      return;
    }

    this.isLoadingSave = true;

    var imageFirebase: ImageFirebase | undefined;

    if (this.clubImageFile) {
      imageFirebase = await this.uploadImageUseCase.uploadImage(
        this.clubImageFile
      );
    }

    if (this.clubSelected) {
      // TODO Update club logic
    } else {
      this.clubService
        .add(
          this.nameClub.value,
          this.descriptionClub.value,
          imageFirebase?.url ?? ''
        )
        .subscribe({
          next: () => {
            this.onSavedClub();
          },
          error: (err) => {},
          complete: () => (this.isLoadingSave = false),
        });
    }
  }
}
