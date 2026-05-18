import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FolderFirebase,
  UploadImageUseCase,
} from 'app/domain/usecase/upload-image.usecase';
import { Club } from '@dto/club';
import { ClubService } from 'app/services/club.service';
import { EventModel } from '@model/event';
import { EventService } from '@services/event.service';
import { Category } from '@model/category';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

const INPUT_CLS = `
  w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
  px-4 py-3 text-white text-sm placeholder-white/25
  outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
  transition-all duration-200 appearance-none
`.replace(/\s+/g, ' ').trim();

@Component({
  standalone: true,
  selector: 'events-form',
  imports: [CommonModule, FormsModule, MatIconModule],
  // Sin providers: MessageService se hereda del componente padre (dashboard)
  template: `
    <form
      class="flex flex-col gap-5"
      (submit)="$event.preventDefault(); onSubmit()"
      autocomplete="off"
    >
      <!-- ── Imagen de portada ── -->
      <div
        class="relative w-full h-48 rounded-2xl overflow-hidden cursor-pointer group
               border border-white/[0.08] bg-white/[0.03]
               hover:border-pink-500/40 hover:bg-white/[0.06] transition-all duration-300"
        [class.border-pink-500!]="previewUrl"
        (click)="fileInput.click()"
      >
        @if (previewUrl) {
          <img [src]="previewUrl" alt="Preview" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
            <mat-icon class="text-white" style="font-size:2rem;width:2rem;height:2rem">photo_camera</mat-icon>
            <span class="text-white text-sm font-semibold">Cambiar imagen</span>
          </div>
        } @else {
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
            <div class="w-14 h-14 rounded-full bg-pink-500/15 border border-pink-500/30
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300">
              <mat-icon class="text-pink-400" style="font-size:1.75rem;width:1.75rem;height:1.75rem">add_photo_alternate</mat-icon>
            </div>
            <div class="text-center">
              <p class="text-white/70 text-sm font-semibold">Subir imagen del evento</p>
              <p class="text-white/30 text-xs mt-0.5">PNG, JPG, WEBP</p>
            </div>
          </div>
          <div class="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl"></div>
          <div class="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
        }
        <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileChange($event)" />
      </div>

      <!-- ── Organización ── -->
      <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 flex flex-col gap-4">
        <p class="text-[10px] font-bold text-pink-400/80 uppercase tracking-[0.15em] flex items-center gap-1.5">
          <mat-icon style="font-size:0.85rem;width:0.85rem;height:0.85rem">place</mat-icon>
          Organización
        </p>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Club</label>
          <select
            [(ngModel)]="clubId"
            name="clubId"
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200 appearance-none cursor-pointer"
          >
            <option [ngValue]="null" disabled class="bg-[#292929]">Seleccionar club</option>
            @for (club of listClub; track club.id) {
              <option [ngValue]="club.id" class="bg-[#292929]">{{ club.name }}</option>
            }
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Categoría</label>
          <select
            [(ngModel)]="categoryId"
            name="categoryId"
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200 appearance-none cursor-pointer"
          >
            <option [ngValue]="null" disabled class="bg-[#292929]">Seleccionar categoría</option>
            @for (cat of listCategory; track cat.id) {
              <option [ngValue]="cat.id" class="bg-[#292929]">{{ cat.title }}</option>
            }
          </select>
        </div>
      </div>

      <!-- ── Información del evento ── -->
      <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 flex flex-col gap-4">
        <p class="text-[10px] font-bold text-pink-400/80 uppercase tracking-[0.15em] flex items-center gap-1.5">
          <mat-icon style="font-size:0.85rem;width:0.85rem;height:0.85rem">event_note</mat-icon>
          Información del evento
        </p>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Título</label>
          <input
            type="text"
            [(ngModel)]="title"
            name="title"
            placeholder="Nombre del evento"
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm placeholder-white/25
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Descripción</label>
          <textarea
            [(ngModel)]="descrip"
            name="descrip"
            rows="4"
            placeholder="Describe el evento..."
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm placeholder-white/25 resize-none
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200"
          ></textarea>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">URL de tickets</label>
          <input
            type="url"
            [(ngModel)]="ticketUrl"
            name="ticketUrl"
            placeholder="https://..."
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm placeholder-white/25
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200"
          />
        </div>
      </div>

      <!-- ── Fecha y hora ── -->
      <div class="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 flex flex-col gap-4">
        <p class="text-[10px] font-bold text-pink-400/80 uppercase tracking-[0.15em] flex items-center gap-1.5">
          <mat-icon style="font-size:0.85rem;width:0.85rem;height:0.85rem">schedule</mat-icon>
          Fecha y hora
        </p>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Fecha del evento</label>
          <input
            type="date"
            [(ngModel)]="eventDate"
            name="eventDate"
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200 date-input"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-xs text-white/40 font-medium">Hora de inicio</label>
          <input
            type="time"
            [(ngModel)]="startTime"
            name="startTime"
            class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                   px-4 py-3 text-white text-sm
                   outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                   transition-all duration-200 date-input"
          />
        </div>
      </div>

      <!-- ── Botón guardar ── -->
      <button
        type="button"
        (click)="onSubmit()"
        [disabled]="isLoading"
        class="relative w-full py-4 rounded-2xl font-bold text-sm text-white overflow-hidden
               disabled:opacity-50 disabled:cursor-not-allowed
               active:scale-[0.98] transition-transform duration-150 select-none
               shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30"
      >
        <!-- Fondo degradado animado -->
        <span class="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600"></span>
        <!-- Brillo al hover -->
        <span class="absolute inset-0 bg-white/0 hover:bg-white/[0.07] transition-colors duration-300"></span>
        <!-- Contenido -->
        <span class="relative z-10 flex items-center justify-center gap-2">
          @if (isLoading) {
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"/>
            </svg>
            <span>Guardando...</span>
          } @else {
            <mat-icon style="font-size:1.1rem;width:1.1rem;height:1.1rem">check_circle</mat-icon>
            <span>Guardar evento</span>
          }
        </span>
      </button>

    </form>
  `,
  styles: [`
    input[type="date"]::-webkit-calendar-picker-indicator,
    input[type="time"]::-webkit-calendar-picker-indicator {
      filter: invert(1) opacity(0.35);
      cursor: pointer;
      border-radius: 4px;
      padding: 2px;
      transition: opacity 0.2s;
    }
    input[type="date"]::-webkit-calendar-picker-indicator:hover,
    input[type="time"]::-webkit-calendar-picker-indicator:hover {
      opacity: 0.6;
    }
    select option {
      background-color: #292929;
      color: white;
    }
  `],
})
export class EventsFormComponent implements OnInit, OnChanges {
  private readonly clubService = inject(ClubService);
  private readonly uploadImage = inject(UploadImageUseCase);
  private readonly eventService = inject(EventService);
  private readonly messageService = inject(MessageService);

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  @Input({ required: true }) listCategory: Category[] = [];
  @Input() event?: EventModel;

  @Output() onSaved = new EventEmitter<void>();

  listClub: Club[] = [];

  clubId: number | null = null;
  categoryId: number | null = null;
  title = '';
  descrip = '';
  ticketUrl = '';
  eventDate = '';
  startTime = '19:00';

  selectedImageFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;

  ngOnInit() {
    this.loadClubs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.event) {
      this.title = this.event.nameClub;
      this.descrip = this.event.description;
    } else {
      this.resetForm();
    }
  }

  async onSubmit() {
    if (this.isLoading) return;
    if (!this.clubId)            { this.warn('Selecciona un club.');            return; }
    if (!this.categoryId)        { this.warn('Selecciona una categoría.');      return; }
    if (!this.title.trim())      { this.warn('El título es requerido.');        return; }
    if (!this.eventDate)         { this.warn('Selecciona una fecha.');          return; }
    if (!this.startTime)         { this.warn('Selecciona una hora de inicio.'); return; }

    try {
      this.isLoading = true;

      let imageUrl: string | undefined;
      if (this.selectedImageFile) {
        const { url } = await this.uploadImage.uploadImage(
          this.selectedImageFile,
          FolderFirebase.events
        );
        imageUrl = url;
      }

      const body = {
        clubId: this.clubId,
        title: this.title.trim(),
        description: this.descrip,
        imageUrl,
        eventDate: this.eventDate,
        startTime: this.startTime,
        eventCategoryId: this.categoryId,
        ticketUrl: this.ticketUrl,
      };

      const res = await firstValueFrom(this.eventService.add(body));
      if (res.isSuccess) {
        this.messageService.add({
          severity: 'success',
          summary: 'Evento creado',
          detail: 'El evento se guardó correctamente.',
          life: 4000,
        });
        this.onSaved.emit();
        this.resetForm();
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo guardar el evento. Inténtalo de nuevo.',
        life: 4000,
      });
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.selectedImageFile = file;
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = URL.createObjectURL(file);
  }

  private warn(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail, life: 3000 });
  }

  private loadClubs() {
    this.clubService.fetchAll().subscribe({
      next: (res) => { this.listClub = res.data ?? []; },
      error: (err) => console.error(err),
    });
  }

  private resetForm() {
    this.clubId = null;
    this.categoryId = null;
    this.title = '';
    this.descrip = '';
    this.ticketUrl = '';
    this.eventDate = '';
    this.startTime = '19:00';
    this.selectedImageFile = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }
}
