import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'event-header',
  imports: [MatIconModule],
  template: `
    <div class="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-t1">Crear evento</h1>
        <p class="text-sm text-t3 mt-1">
          Sube una imagen, asocia un club, agrega artistas y programa las fechas.
        </p>
      </div>
      <button
        type="button"
        (click)="onSave.emit()"
        [disabled]="isSaving"
        class="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-p1 hover:bg-pink-600 active:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-p1/20"
      >
        @if (isSaving) {
          <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Guardando...
        } @else {
          <mat-icon class="!text-[18px] !w-[18px] !h-[18px]">check</mat-icon>
          Guardar evento
        }
      </button>
    </div>
  `,
})
export class EventHeaderComponent {
  @Input() isSaving = false;
  @Output() onSave = new EventEmitter<void>();
}
