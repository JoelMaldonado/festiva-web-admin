import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Club } from '@dto/club';
import { ClubService } from '@services/club.service';
import {
  ImageFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { ButtonModule } from 'primeng/button';
import { InputComponent } from '../../../../../../components/input/input.component';
import { SelectFileComponent } from '../../../../../../components/select-file/select-file.component';

@Component({
  selector: 'add-club',
  imports: [InputComponent, SelectFileComponent, ButtonModule],
  templateUrl: './add-club.component.html',
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
      imageFirebase = await this.uploadImageUseCase.uploadImage(this.logoFile);
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
