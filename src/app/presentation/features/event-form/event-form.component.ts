import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FestInputComponent } from '@components/fest-input.component';
import { FestTextAreaComponent } from '@components/fest-text-area.component';
import { FolderFirebase, UploadImageUseCase } from 'app/domain/usecase/upload-image.usecase';
import { EventService } from 'app/services/event.service';
import Swal from 'sweetalert2';
import { EventArtistsComponent } from './components/artists.component';
import { EventCategoriesComponent } from './components/categories.component';
import { EventClubComponent } from './components/club.component';
import { EventHeaderComponent } from './components/header.component';
import { EventPreviewComponent } from './components/preview.component';
import { EventScheduleComponent } from './components/schedule.component';
import { EventUploadImageComponent } from './components/upload-image.component';

@Component({
  standalone: true,
  selector: 'app-event-form',
  imports: [
    FormsModule,
    FestInputComponent,
    FestTextAreaComponent,
    EventScheduleComponent,
    EventUploadImageComponent,
    EventArtistsComponent,
    EventHeaderComponent,
    EventPreviewComponent,
    EventClubComponent,
    EventCategoriesComponent,
  ],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  private readonly eventService = inject(EventService);
  private readonly uploadImageUseCase = inject(UploadImageUseCase);
  private readonly router = inject(Router);

  @ViewChild(EventUploadImageComponent) uploadCmp!: EventUploadImageComponent;
  @ViewChild(EventClubComponent) clubCmp!: EventClubComponent;
  @ViewChild(EventArtistsComponent) artistsCmp!: EventArtistsComponent;
  @ViewChild(EventCategoriesComponent) categoriesCmp!: EventCategoriesComponent;
  @ViewChild(EventScheduleComponent) scheduleCmp!: EventScheduleComponent;

  title = '';
  description = '';
  isSaving = false;

  // Preview state
  previewImage: string | null = null;
  previewClub: { name: string; logoUrl?: string } | null = null;
  previewCategories: string[] = [];

  async onSubmit() {
    const club = this.clubCmp.selectedClub;
    const imageFile = this.uploadCmp.imageFile;
    const selectedCategories = this.categoriesCmp.categories.filter((c) => c.isSelected);
    const schedules = this.scheduleCmp.schedules;

    // Validaciones básicas
    if (!imageFile) {
      return this.showWarning('Falta la imagen', 'Selecciona una imagen para el evento.');
    }
    if (!club) {
      return this.showWarning('Falta el club', 'Selecciona el club del evento.');
    }
    if (!this.title.trim()) {
      return this.showWarning('Falta el título', 'Escribe un título para el evento.');
    }
    if (selectedCategories.length === 0) {
      return this.showWarning('Falta la categoría', 'Selecciona al menos una categoría.');
    }
    if (schedules.some((s) => !s.date || !s.startTime)) {
      return this.showWarning('Fechas incompletas', 'Completa la fecha y hora de inicio de cada slot.');
    }

    this.isSaving = true;

    try {
      // 1. Subir imagen a Firebase
      const { url: imageUrl } = await this.uploadImageUseCase.uploadImage(
        imageFile,
        FolderFirebase.events,
      );

      // 2. Construir payload y llamar al API
      const dto = {
        clubId: club.id,
        title: this.title.trim(),
        description: this.description.trim() || undefined,
        imageUrl,
        categoryIds: selectedCategories.map((c) => c.id),
        schedules: schedules.map((s) => ({ date: s.date, startTime: s.startTime })),
        artistIds: this.artistsCmp.selectedArtists.map((a) => a.id),
      };

      this.eventService.createV2(dto).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.router.navigate(['menu', 'events']);
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: '¡Evento creado correctamente!',
              showConfirmButton: false,
              timer: 3500,
              timerProgressBar: true,
              background: '#222222',
              color: '#ffffff',
            });
          } else {
            this.showError('No se pudo crear el evento.');
          }
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
          this.showError('Ocurrió un error al guardar el evento.');
        },
        complete: () => (this.isSaving = false),
      });
    } catch (err) {
      console.error(err);
      this.showError('Error al subir la imagen.');
      this.isSaving = false;
    }
  }

  private showWarning(title: string, text: string) {
    Swal.fire({ icon: 'warning', title, text, confirmButtonColor: '#e91e63', background: '#222222', color: '#ffffff' });
  }

  private showError(text: string) {
    Swal.fire({ icon: 'error', title: 'Error', text, confirmButtonColor: '#e91e63', background: '#222222', color: '#ffffff' });
  }
}
