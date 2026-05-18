import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'event-preview',
  imports: [MatIconModule],
  template: `
    <aside class="lg:sticky lg:top-6 space-y-4">
      <div class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center gap-2 px-4 py-3.5 border-b border-b4">
          <mat-icon class="text-t3 !text-[16px] !w-[16px] !h-[16px]">preview</mat-icon>
          <h3 class="text-xs font-semibold text-t3 uppercase tracking-wider">Vista previa</h3>
        </div>

        <!-- Card del evento -->
        <div class="p-4">
          <div class="overflow-hidden rounded-xl border border-b4 bg-b3">

            <!-- Imagen -->
            <div class="relative aspect-[16/10] bg-b4">
              @if (imageUrl) {
                <img [src]="imageUrl" class="w-full h-full object-cover" alt="Preview" />
              } @else {
                <div class="w-full h-full flex flex-col items-center justify-center gap-2">
                  <mat-icon class="!text-[40px] !w-[40px] !h-[40px]" style="color:#3a3a3a">add_photo_alternate</mat-icon>
                  <p class="text-[11px]" style="color:#3a3a3a">Sin imagen</p>
                </div>
              }

              <!-- Gradient bottom -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <!-- Pills de categorías -->
              @if (categories.length > 0) {
                <div class="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
                  @for (cat of categories; track cat) {
                    <span class="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm ring-1 ring-white/15">
                      {{ cat }}
                    </span>
                  }
                </div>
              }
            </div>

            <!-- Info -->
            <div class="p-3.5">
              <!-- Club -->
              <div class="flex items-center gap-2 mb-2">
                @if (club?.logoUrl) {
                  <img [src]="club!.logoUrl" class="w-5 h-5 rounded-full object-cover ring-1 ring-b4" alt="" />
                } @else {
                  <div class="w-5 h-5 rounded-full bg-b4 flex items-center justify-center">
                    <mat-icon class="text-t3 !text-[11px] !w-[11px] !h-[11px]">nightlife</mat-icon>
                  </div>
                }
                <p class="text-[11px] text-t3 truncate">
                  {{ club?.name || 'Club no seleccionado' }}
                </p>
              </div>

              <!-- Título -->
              <p class="font-bold text-t1 leading-snug text-sm">
                {{ title || 'Título del evento' }}
              </p>

              <!-- Descripción -->
              @if (description) {
                <p class="mt-1.5 text-xs text-t3 line-clamp-2 leading-relaxed">{{ description }}</p>
              } @else {
                <p class="mt-1.5 text-xs italic" style="color:#3a3a3a">Descripción del evento…</p>
              }

              <!-- Footer -->
              <div class="mt-3 pt-3 border-t border-b4 flex items-center gap-1 text-t3">
                <mat-icon class="!text-[13px] !w-[13px] !h-[13px]">calendar_today</mat-icon>
                <span class="text-[11px]">Sin fecha aún</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="bg-b2 rounded-2xl border border-b4 p-4 space-y-3">
        <p class="text-xs font-semibold text-t3 uppercase tracking-wider">Consejos</p>
        <div class="space-y-2.5">
          <div class="flex items-start gap-2">
            <mat-icon class="text-p1 !text-[14px] !w-[14px] !h-[14px] mt-0.5 shrink-0">check_circle</mat-icon>
            <p class="text-xs text-t3 leading-relaxed">Usa una imagen horizontal de alta calidad (16:9).</p>
          </div>
          <div class="flex items-start gap-2">
            <mat-icon class="text-p1 !text-[14px] !w-[14px] !h-[14px] mt-0.5 shrink-0">check_circle</mat-icon>
            <p class="text-xs text-t3 leading-relaxed">El título debe ser corto y atractivo.</p>
          </div>
          <div class="flex items-start gap-2">
            <mat-icon class="text-p1 !text-[14px] !w-[14px] !h-[14px] mt-0.5 shrink-0">check_circle</mat-icon>
            <p class="text-xs text-t3 leading-relaxed">Selecciona al menos una categoría para mejor visibilidad.</p>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class EventPreviewComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() imageUrl: string | null = null;
  @Input() club: { name: string; logoUrl?: string } | null = null;
  @Input() categories: string[] = [];
}
