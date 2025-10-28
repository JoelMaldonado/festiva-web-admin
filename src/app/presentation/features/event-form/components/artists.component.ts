import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FestInputComponent } from '@components/fest-input.component';
import { ArtistService } from '@services/artist.service';

@Component({
  standalone: true,
  selector: 'event-artists',
  imports: [CommonModule, FormsModule, FestInputComponent],
  template: `
    <section class="mt-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-200">Artistas invitados</h2>
        <span class="text-xs text-slate-400">Opcional</span>
      </div>

      <div class="mt-3 relative">
        <fest-input
          type="text"
          [(value)]="artistQuery"
          (input)="filterArtists()"
          placeholder="Search by name...."
          autocomplete="off"
        />
        @if (artistQuery.trim().length > 0) {
        <ul
          class="absolute z-20 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-white/10 bg-neutral-900/95 ring-1 ring-white/10"
        >
          @for (a of filteredArtists; track a.id) {
          <li>
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10"
              (click)="addArtist(a)"
            >
              <img
                [src]="a.profileUrl || '/assets/placeholder-artist.png'"
                class="h-8 w-8 rounded-full object-cover border border-white/10"
                alt=""
              />
              <span class="text-sm text-slate-100">{{ a.name }}</span>
            </button>
          </li>
          } @if (filteredArtists.length === 0) {
          <li class="px-3 py-2 text-sm text-slate-400">Sin resultados…</li>
          }
        </ul>
        }
      </div>

      <!-- Lista de artistas agregados -->
      @if (selectedArtists.length > 0) {
      <div class="mt-3 flex flex-wrap gap-3">
        @for (a of selectedArtists; track a.id) {
        <div
          class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5"
        >
          <img
            [src]="a.profileUrl || '/assets/placeholder-artist.png'"
            class="h-6 w-6 rounded-full object-cover border border-white/10"
            alt=""
          />
          <span class="text-sm text-slate-100">{{ a.name }}</span>
          <button
            type="button"
            class="ml-1 rounded-md px-1.5 py-0.5 text-xs text-slate-300 hover:bg-white/10"
            (click)="removeArtist(a)"
            aria-label="Quitar artista"
          >
            ✕
          </button>
        </div>
        }
      </div>
      }
    </section>
  `,
})
export class EventArtistsComponent implements OnInit {
  private readonly artistService = inject(ArtistService);

  ngOnInit(): void {
    this.artistService.fetchAll().subscribe({
      next: (res) => {
        this.artistsDb = res.data || [];
      },
    });
  }
  artistQuery = '';
  filteredArtists: any[] = [];
  selectedArtists: any[] = [];

  // Artistas
  artistsDb: any[] = [];

  // Imagen única

  filterArtists() {
    const q = this.artistQuery.toLowerCase().trim();
    this.filteredArtists = this.artistsDb.filter((a) =>
      a.name.toLowerCase().includes(q)
    );
  }
  addArtist(a: any) {
    if (!this.selectedArtists.find((x) => x.id === a.id)) {
      this.selectedArtists.push(a);
    }
    this.artistQuery = '';
    this.filteredArtists = [];
  }
  removeArtist(a: any) {
    this.selectedArtists = this.selectedArtists.filter((x) => x.id !== a.id);
  }
}
