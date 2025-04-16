import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistType } from '@model/artist-type';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ArtistRepository } from '@repository/artist.repository';
import { CreateArtistRequest } from '@dto/request/create-artist.request';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadImageUseCase } from 'app/domain/usecase/upload-image.usecase';

@Component({
  selector: 'drawer-form-artist',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
  ],
  template: `
    <form (submit)="onSubmit($event)" class="pt-2 flex flex-col gap-4">
      <p-floatlabel variant="on">
        <input
          pInputText
          id="name"
          [formControl]="name"
          autocomplete="off"
          class="w-full"
        />
        <label for="name">Name</label>
      </p-floatlabel>

      <p-select
        [options]="listArtistType"
        [formControl]="selectedArtistType"
        optionLabel="name"
        placeholder="Select Type"
        class="w-full"
      />

      <p-floatlabel variant="on">
        <textarea
          pTextarea
          id="descrip"
          [formControl]="descrip"
          rows="5"
          cols="30"
          style="resize: none"
          class="h-full"
        ></textarea>
        <label for="descrip">Description</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <textarea
          pTextarea
          id="biography"
          [formControl]="biography"
          rows="5"
          cols="30"
          style="resize: none"
          class="h-full"
        ></textarea>
        <label for="biography">Biography</label>
      </p-floatlabel>
      <p-fileUpload
        name="file"
        accept="image/*"
        mode="basic"
        chooseLabel="Subir Imagen"
        [auto]="false"
        (onSelect)="onSelectImage($event)"
      />
      <p-button
        type="submit"
        label="Guardar"
        styleClass="w-full"
        [loading]="isLoading"
      />
    </form>
  `,
})
export class DrawerFormArtistComponent implements OnInit {
  listArtistType: ArtistType[] = [];

  name = new FormControl('');
  selectedArtistType = new FormControl<ArtistType | undefined>(undefined);
  descrip = new FormControl('');
  biography = new FormControl('');

  artistTypeRepo = inject(ArtistTypeRepository);
  artistRepo = inject(ArtistRepository);
  private readonly uploadImage = inject(UploadImageUseCase);

  @Output() onSaved = new EventEmitter<void>();

  ngOnInit() {
    this.getAllArtistType();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.createArtist();
  }

  async getAllArtistType() {
    try {
      this.listArtistType = await this.artistTypeRepo.fetchAll();
    } catch (error) {
      console.log(error);
    }
  }

  isLoading = false;

  async createArtist() {
    try {
      if (this.name.invalid) {
        this.name.markAsTouched();
        return;
      }

      if (this.selectedArtistType.invalid) {
        this.selectedArtistType.markAsTouched();
        return;
      }
      this.isLoading = true;
      var imageUrl: string | null = null;
      if (this.selectedImageFile) {
        imageUrl = await this.uploadImage.uploadImage(this.selectedImageFile);
      }
      const request: CreateArtistRequest = {
        name: this.name.value!,
        idArtistType: this.selectedArtistType.value!.id,
        description: this.descrip.value,
        biography: this.biography.value,
        profileUrl: imageUrl,
      };
      await this.artistRepo.create(request);
      this.onSaved.emit();
      this.resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  resetForm() {
    this.name.reset();
    this.selectedArtistType.reset();
    this.descrip.reset();
    this.biography.reset();
  }
  selectedImageFile: File | null = null;

  onSelectImage(event: any) {
    this.selectedImageFile = event.files[0];
  }
}
