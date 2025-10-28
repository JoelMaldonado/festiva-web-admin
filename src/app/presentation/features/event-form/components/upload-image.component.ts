import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'event-upload-image',
  template: `
    <section class="mt-4">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-sm font-semibold text-slate-200">Imagen del evento</h2>
        <span class="text-xs text-rose-300/90">Obligatoria (1)</span>
      </div>

      @if (!imagePreview) {
      <div
        class="relative rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center"
      >
        <p class="text-sm text-slate-300">Arrastra y suelta una imagen aquí</p>
        <p class="text-xs text-slate-400 mt-1">o</p>
        <label
          class="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-fuchsia-600 shadow-[0_10px_30px_-10px_rgba(236,72,153,0.6)] hover:from-pink-400 hover:to-fuchsia-500"
        >
          <input
            type="file"
            class="hidden"
            accept="image/*"
            (change)="onImageSelected($event)"
          />
          Subir imagen
        </label>

        <!-- Drag & drop -->
        <div
          class="absolute inset-0"
          (dragover)="onDragOver($event)"
          (drop)="onDrop($event)"
        ></div>
      </div>
      } @else {
      <div class="relative overflow-hidden rounded-2xl border border-white/10">
        <img
          [src]="imagePreview"
          class="w-full h-60 object-cover"
          alt="Preview"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        ></div>
        <div class="absolute bottom-3 right-3 flex gap-2">
          <label
            class="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15"
          >
            <input
              type="file"
              class="hidden"
              accept="image/*"
              (change)="onImageSelected($event)"
            />
            Cambiar
          </label>
          <button
            type="button"
            class="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-200 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-400/30"
            (click)="removeImage()"
          >
            Eliminar
          </button>
        </div>
      </div>
      }
    </section>
  `,
})
export class EventUploadImageComponent {
  imageFile: File | null = null;
  imagePreview: string | null = null;

  onImageSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.setImage(file);
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) this.setImage(file);
  }
  setImage(file: File) {
    this.imageFile = file;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = URL.createObjectURL(file);
  }
  removeImage() {
    this.imageFile = null;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = null;
  }
}
