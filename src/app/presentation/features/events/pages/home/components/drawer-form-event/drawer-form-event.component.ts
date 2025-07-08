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
import { FolderFirebase, UploadImageUseCase } from 'app/domain/usecase/upload-image.usecase';
import { Artist } from '@dto/artist';
import { StatusEnum } from 'app/data/enum/status-enum';
import { Club } from '@dto/club';
import { EventCategory } from '@model/event-category';
import { DatePickerModule } from 'primeng/datepicker';
import { ClubService } from 'app/services/club.service';

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
  ],
  templateUrl: './drawer-form-event.component.html',
})
export class DrawerFormEvent implements OnInit, OnChanges {
  private readonly clubService = inject(ClubService);
  private readonly commonRepository = inject(CommonRepository);
  private readonly uploadImage = inject(UploadImageUseCase);

  listClub: Club[] = [];
  listEventCategory: EventCategory[] = [];

  @Input() artist?: Artist;

  selectedClub = new FormControl<Club | undefined>(undefined);
  selectedEventCategory = new FormControl<EventCategory | undefined>(undefined);
  title = new FormControl('');
  descrip = new FormControl('');
  eventDate = new FormControl(new Date());
  selectedImageFile: File | null = null;
  isLoading = false;

  @Output() onSaved = new EventEmitter<void>();

  ngOnInit() {
    this.getAllClub();
    this.getAllEventCategory();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['club'] && this.artist) {
      this.title.setValue(this.artist.name);
      this.descrip.setValue(this.artist.description);
      //const type = this.listClub.find(
      //  (e) => e.id == this.artist?.idArtistType
      //);
      //this.selectedClub.setValue(this.artist.idClub);
      //this.selectedEventCategory.setValue(this.artist.idEventCategory);
    } else {
      this.title.reset();
      this.descrip.reset();
      this.eventDate.reset();
      this.selectedClub.reset();
      this.selectedEventCategory.reset();
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (this.title.invalid) {
      this.title.markAsTouched();
      return;
    }

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
        name: this.title.value!,
        idArtistType: this.selectedClub.value?.id,
        description: this.descrip.value,
        profileUrl: imageUrl,
      };
      if (this.artist) {
        //TODO await this.artistRepo.update(this.artist.id, request);
        this.onSaved.emit();
        this.resetForm();
      } else {
        //TODO await this.artistRepo.create(request);
        this.onSaved.emit();
        this.resetForm();
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
    this.title.reset();
    this.selectedClub.reset();
    this.selectedEventCategory.reset();
    this.descrip.reset();
    this.eventDate.reset();
    this.selectedImageFile = null;
  }

  onSelectImage(event: any) {
    this.selectedImageFile = event.files[0];
  }
}
