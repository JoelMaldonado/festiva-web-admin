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
import { EventCategory } from '@model/event-category';
import { DatePickerModule } from 'primeng/datepicker';
import { ClubService } from 'app/services/club.service';
import { EventModel } from '@model/event';
import { EventService } from '@services/event.service';
import { InputComponent } from '@components/input.component';
import { AppTextAreaComponent } from "@components/text-area.component";

@Component({
  selector: 'drawer-form-event',
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
    AppTextAreaComponent
],
  templateUrl: './drawer-form-event.component.html',
})
export class DrawerFormEvent implements OnInit, OnChanges {
  private readonly clubService = inject(ClubService);
  private readonly commonRepository = inject(CommonRepository);
  private readonly uploadImage = inject(UploadImageUseCase);
  private readonly eventService = inject(EventService);

  listClub: Club[] = [];
  listEventCategory: EventCategory[] = [];

  @Input() event?: EventModel;

  selectedClub = new FormControl<Club | undefined>(undefined);
  selectedEventCategory = new FormControl<EventCategory | undefined>(undefined);

  title = '';
  descrip = '';

  eventDate = new FormControl(new Date());

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

      const request = {
        clubId: this.selectedClub.value?.id!,
        title: this.title,
        description: this.descrip,
        imageUrl: imageUrl ?? '',
        eventDatetime: this.eventDate.value?.toISOString() ?? '',
        eventCategoryId: this.selectedEventCategory.value?.id!,
      };

      if (this.event) {
        //await this.artistRepo.update(this.artist.id, request);
        this.onSaved.emit();
        this.resetForm();
      } else {
        this.eventService.add(request).subscribe({
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
    this.selectedImageFile = null;
  }

  onSelectImage(event: any) {
    this.selectedImageFile = event.files[0];
  }
}
