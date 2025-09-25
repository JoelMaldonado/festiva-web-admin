import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonRepository } from '@repository/common.repository';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import {
  FolderFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { StatusEnum } from 'app/data/enum/status-enum';
import { Club } from '@dto/club';
import { DatePickerModule } from 'primeng/datepicker';
import { ClubService } from 'app/services/club.service';
import { EventModel } from '@model/event';
import { EventService } from '@services/event.service';
import { InputComponent } from '@components/input.component';
import { AppTextAreaComponent } from '@components/text-area.component';
import { format, isValid, parse } from 'date-fns';
import { Category } from '@model/category';

@Component({
  standalone: true,
  selector: 'events-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
    DatePickerModule,
    InputComponent,
    AppTextAreaComponent,
  ],
  template: `
    <form (submit)="onSubmit($event)" class="flex flex-col gap-4 pt-2">
      <!-- Select Club -->
      <p-select
        [options]="listClub"
        [formControl]="selectedClub"
        optionLabel="name"
        placeholder="Select Club"
        class="w-full"
      />

      <!-- Select Category -->
      <p-select
        [options]="listEventCategory"
        [formControl]="selectedEventCategory"
        optionLabel="title"
        placeholder="Select Category"
        class="w-full"
      />

      <app-input id="title" label="Title" [(model)]="title" />

      <app-text-area id="descrip" label="Description" [(model)]="descrip" />

      <!-- FECHA -->
      <p-floatlabel variant="on">
        <p-datepicker
          [formControl]="eventDate"
          inputId="eventDate"
          showIcon
          iconDisplay="input"
          styleClass="w-full"
          dateFormat="dd/mm/yy"
        />
        <label for="eventDate">Event Date</label>
      </p-floatlabel>

      <!-- HORA DE INICIO -->
      <p-floatlabel variant="on" class="mt-3">
        <p-datepicker
          [formControl]="startTime"
          inputId="startTime"
          timeOnly="true"
          hourFormat="24"
          showIcon
          iconDisplay="input"
          styleClass="w-full"
        />
        <label for="startTime">Start Time</label>
      </p-floatlabel>

      <!-- Upload File Image -->
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
export class EventsFormComponent implements OnInit, OnChanges {
  private readonly clubService = inject(ClubService);
  private readonly commonRepository = inject(CommonRepository);
  private readonly uploadImage = inject(UploadImageUseCase);
  private readonly eventService = inject(EventService);

  listClub: Club[] = [];
  listEventCategory: Category[] = [];

  @Input() event?: EventModel;

  selectedClub = new FormControl<Club | undefined>(undefined);
  selectedEventCategory = new FormControl<Category | undefined>(undefined);

  title = '';
  descrip = '';

  eventDate = new FormControl(new Date());
  startTime = new FormControl('19:00');

  minDate = new Date();

  selectedImageFile: File | null = null;
  isLoading = false;

  @Output() onSaved = new EventEmitter<void>();

  ngOnInit() {
    this.getAllClub();
    this.getAllEventCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['club'] && this.event) {
      this.title = this.event.nameClub;
      this.descrip = this.event.description;
      //const type = this.listClub.find(
      //  (e) => e.id == this.artist?.idArtistType
      //);
      //this.selectedClub.setValue(this.artist.idClub);
      //this.selectedEventCategory.setValue(this.artist.idEventCategory);
    } else {
      this.title = '';
      this.descrip = '';
      this.eventDate.reset();
      this.selectedClub.reset();
      this.selectedEventCategory.reset();
    }
  }

  async onSubmit(e: any) {
    e.preventDefault();

    if (this.selectedClub.invalid) {
      this.selectedClub.markAsTouched();
      return;
    }

    if (this.selectedEventCategory.invalid) {
      this.selectedEventCategory.markAsTouched();
      return;
    }

    if (this.eventDate.value === null) {
      alert('Please select a valid event date.');
      return;
    }

    if (this.startTime.value === null) {
      alert('Please select a valid start time.');
      return;
    }

    try {
      this.isLoading = true;
      var imageUrl: string | null = null;
      if (this.selectedImageFile) {
        const { url, filePath } = await this.uploadImage.uploadImage(
          this.selectedImageFile,
          FolderFirebase.events
        );
        imageUrl = url;
      }

      const body = {
        clubId: this.selectedClub.value?.id!,
        title: this.title,
        description: this.descrip,
        imageUrl: imageUrl ?? '',
        eventDate: this.formatTime(this.eventDate.value, 'yyyy-MM-dd'),
        startTime: this.formatTime(this.startTime.value, 'HH:mm'),
        eventCategoryId: this.selectedEventCategory.value?.id!,
      };

      console.log(body);

      if (this.event) {
        this.onSaved.emit();
        this.resetForm();
      } else {
        this.eventService.add(body).subscribe({
          next: (res) => {
            if (res.isSuccess) {
              this.onSaved.emit();
              this.resetForm();
            }
          },
          error: (err) => console.error(err),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  formatTime(value: Date | string, pattern: string): string {
    const d =
      value instanceof Date
        ? value
        : parse(String(value).trim(), pattern, new Date()); // usa el mismo patrón para parsear

    return isValid(d) ? format(d, pattern) : '';
  }

  async getAllClub() {
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        this.listClub = res.data ?? [];
      },
      error: (err) => console.error(err),
    });
  }

  async getAllEventCategory() {
    this.commonRepository.fetchAllEventCategory(StatusEnum.active).subscribe({
      next: (res) => {
        this.listEventCategory = res;
      },
      error: (err) => console.error(err),
    });
  }

  resetForm() {
    this.title = '';
    this.descrip = '';
    this.selectedClub.reset();
    this.selectedEventCategory.reset();
    this.eventDate.reset();
    this.startTime = new FormControl('19:00');
    this.selectedImageFile = null;
  }

  onSelectImage(event: any) {
    this.selectedImageFile = event.files[0];
  }
}
