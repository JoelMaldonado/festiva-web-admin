import { Component, Input } from '@angular/core';

type Club = {
  id: number | string;
  name: string;
  logoUrl?: string;
  coverUrl?: string;
};

@Component({
  standalone: true,
  selector: 'event-preview',
  imports: [],
  template: `
    <aside class="lg:col-span-1 space-y-6">
      <div
        class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-xl p-4"
      >
        <h3 class="text-sm font-semibold text-slate-200">Preview</h3>
        <div class="mt-3 overflow-hidden rounded-xl border border-white/10">
          <div class="relative aspect-[16/10] bg-neutral-900">
            <!--
            <img
              *ngIf="imagePreview"
              [src]="imagePreview"
              class="h-full w-full object-cover"
              alt=""
            />
            -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            ></div>
            <div
              class="absolute left-3 bottom-3 flex flex-wrap items-center gap-2"
            >
              @for (item of selectedCategories; track $index) {
              <span
                class="inline-flex items-center px-3 py-1 rounded-full bg-black/50 text-white text-xs ring-1 ring-white/15"
                >{{ item }}</span
              >
              }
            </div>
          </div>
          <div class="p-3">
            <p class="text-xs text-slate-400">
              {{ selectedClub?.name || 'Club no seleccionado' }}
            </p>
            <p class="font-extrabold text-slate-100 leading-snug mt-1">
              {{ title || 'Título del evento' }}
            </p>
            <p class="mt-1 text-sm text-slate-400 line-clamp-3">
              {{ description || 'Descripción del evento…' }}
            </p>
            <!--
            @if (selectedArtists.length > 0) {
            <div class="mt-3 flex -space-x-2">
              @for (a of selectedArtists; track a.id) {
              <img
                [src]="a.avatarUrl || '/assets/placeholder-artist.png'"
                class="h-7 w-7 rounded-full border-2 border-neutral-800 object-cover"
                alt=""
              />
              }
            </div>
            }
            -->
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class EventPreviewComponent {
  // Club
  clubQuery = '';
  filteredClubs: Club[] = [];
  selectedClub: Club | null = null;
  selectedCategories = new Set<string>();

  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
}
