import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'event-upload-image',
  imports: [MatIconModule],
  template: `
    <section class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
      <!-- Header de sección -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-b4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-p1 !text-[18px] !w-[18px] !h-[18px]">add_photo_alternate</mat-icon>
          <h2 class="text-sm font-semibold text-t1">Imagen del evento</h2>
        </div>
        <span class="text-xs text-red-400 font-medium">Obligatoria</span>
      </div>

      <div class="p-5">
        @if (!imagePreview) {
          <!-- Upload area -->
          <label class="flex flex-col items-center justify-center gap-4 w-full h-52 bg-b3 border-2 border-dashed border-b4 hover:border-p1/50 rounded-2xl cursor-pointer transition-all group">
            <input
              type="file"
              class="hidden"
              accept="image/*"
              (change)="onImageSelected($event)"
            />
            <div class="w-14 h-14 rounded-2xl bg-b4 group-hover:bg-p1/10 flex items-center justify-center transition-colors">
              <mat-icon class="text-t3 group-hover:text-p1 !text-[28px] !w-[28px] !h-[28px] transition-colors">add_photo_alternate</mat-icon>
            </div>
            <div class="text-center">
              <p class="text-sm font-semibold text-t2 group-hover:text-t1 transition-colors">Seleccionar imagen</p>
              <p class="text-xs text-t3 mt-1">JPG, PNG, WEBP · Máx. 10 MB</p>
            </div>
          </label>
        } @else {
          <!-- Preview de imagen -->
          <div class="relative overflow-hidden rounded-2xl">
            <img
              [src]="imagePreview"
              class="w-full h-64 object-cover"
              alt="Preview del evento"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <!-- Acciones -->
            <div class="absolute bottom-3 right-3 flex gap-2">
              <label
                class="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 text-xs font-semibold text-t1 bg-b2/80 hover:bg-b2 border border-b4 rounded-xl backdrop-blur-sm transition-colors"
              >
                <input type="file" class="hidden" accept="image/*" (change)="onImageSelected($event)" />
                <mat-icon class="!text-[14px] !w-[14px] !h-[14px]">edit</mat-icon>
                Cambiar
              </label>
              <button
                type="button"
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-300 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 rounded-xl backdrop-blur-sm transition-colors"
                (click)="removeImage()"
              >
                <mat-icon class="!text-[14px] !w-[14px] !h-[14px]">delete</mat-icon>
                Eliminar
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class EventUploadImageComponent {
  @Output() imageChange = new EventEmitter<string | null>();

  imageFile: File | null = null;
  imagePreview: string | null = null;

  onImageSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.setImage(file);
  }

  setImage(file: File) {
    this.imageFile = file;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = URL.createObjectURL(file);
    this.imageChange.emit(this.imagePreview);
  }

  removeImage() {
    this.imageFile = null;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = null;
    this.imageChange.emit(null);
  }
}
