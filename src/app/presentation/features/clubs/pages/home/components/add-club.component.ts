import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Club } from '@dto/club';
import { ClubService } from 'app/services/club.service';
import {
  FolderFirebase,
  ImageFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { ButtonModule } from 'primeng/button';
import { SelectFileComponent } from '@components/select-file.component';
import { InputComponent } from '@components/input.component';

@Component({
  selector: 'add-club',
  imports: [InputComponent, SelectFileComponent, ButtonModule],
  template: `
    <form
      (submit)="onSubmit($event)"
      class="flex flex-col items-center gap-6 pt-2"
    >
      <app-input
        label="Name"
        placeholder="Ingresa el nombre del club"
        [model]="name"
        (modelChange)="onNameChanged($event)"
        class="w-full"
        [error]="nameError"
      />

      <app-input
        label="Description"
        placeholder="Ingresa una breve descripción del club"
        [model]="description"
        (modelChange)="onDescriptionChanged($event)"
        class="w-full"
        [error]="descriptionError"
      />

      <app-select-file class="w-full" label="Logo" [(value)]="logoFile" />

      <p-button type="submit" label="Guardar" [loading]="isLoadingSave" />
    </form>
  `,
})
export class AddClubComponent {
  private readonly uploadImageUseCase = inject(UploadImageUseCase);
  private readonly clubService = inject(ClubService);

  @Input() clubSelected?: Club;
  @Output() onSave = new EventEmitter<void>();

  name = '';
  description = '';
  logoFile?: File;

  nameError?: string;
  descriptionError?: string;

  onNameChanged(value: string) {
    this.name = value;
    this.nameError = undefined;
  }

  onDescriptionChanged(value: string) {
    this.description = value;
    this.descriptionError = undefined;
  }

  isLoadingSave = false;

  onLogoChange(event?: File) {
    this.logoFile = event;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name) {
      this.nameError = 'Campo requerido.';
      return;
    }

    this.isLoadingSave = true;

    var imageFirebase: ImageFirebase | undefined;

    if (this.logoFile) {
      imageFirebase = await this.uploadImageUseCase.uploadImage(
        this.logoFile,
        FolderFirebase.clubs
      );
    }

    if (this.clubSelected) {
      // TODO Update club logic
    } else {
      this.clubService
        .add(this.name, this.description, imageFirebase?.url ?? '')
        .subscribe({
          next: () => {
            this.name = '';
            this.description = '';
            this.logoFile = undefined;
            this.nameError = undefined;
            this.descriptionError = undefined;

            this.onSave.emit();
          },
          error: (err) => {},
          complete: () => (this.isLoadingSave = false),
        });
    }
  }
}
