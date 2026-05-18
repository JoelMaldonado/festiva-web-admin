import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArtistService } from '@services/artist.service';

@Component({
  standalone: true,
  selector: 'event-artists',
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-b4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-p1 !text-[18px] !w-[18px] !h-[18px]">mic</mat-icon>
          <h2 class="text-sm font-semibold text-t1">Artistas invitados</h2>
        </div>
        <span class="text-xs text-t3 font-medium">
          Opcional
          @if (selectedArtists.length > 0) {
            · <span class="text-t1 font-semibold">{{ selectedArtists.length }} seleccionado{{ selectedArtists.length > 1 ? 's' : '' }}</span>
          }
        </span>
      </div>

      <div class="p-5 space-y-4">
        <!-- Buscador -->
        <div class="relative">
          <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-t3 !text-[18px] !w-[18px] !h-[18px] pointer-events-none">search</mat-icon>
          <input
            type="text"
            [(ngModel)]="artistQuery"
            (ngModelChange)="filterArtists($event)"
            placeholder="Filtrar por nombre..."
            autocomplete="off"
            class="w-full pl-9 pr-4 py-2.5 bg-b3 border border-b4 rounded-xl text-t1 text-sm placeholder-t3 focus:outline-none focus:border-p1 focus:ring-1 focus:ring-p1 transition-all"
          />
        </div>

        <!-- Grid de artistas -->
        @if (isLoading) {
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            @for (_ of [1,2,3,4,5,6,7,8]; track $index) {
              <div class="flex flex-col items-center gap-2 p-4 bg-b3 border border-b4 rounded-2xl animate-pulse">
                <div class="w-12 h-12 rounded-full bg-b4"></div>
                <div class="h-3 bg-b4 rounded w-14"></div>
              </div>
            }
          </div>
        } @else if (filteredArtists.length === 0) {
          <div class="flex flex-col items-center justify-center py-8 text-center">
            <mat-icon class="text-t3 !text-[32px] !w-[32px] !h-[32px] mb-2">search_off</mat-icon>
            <p class="text-t2 text-sm font-semibold">Sin resultados</p>
            <p class="text-t3 text-xs mt-0.5">Prueba con otro nombre</p>
          </div>
        } @else {
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-0.5">
            @for (a of filteredArtists; track a.id) {
              <button
                type="button"
                (click)="toggleArtist(a)"
                class="relative group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all text-center"
                [class.bg-b3]="!isSelected(a)"
                [class.border-b4]="!isSelected(a)"
                [class.hover:border-t3]="!isSelected(a)"
                [class.bg-b4]="isSelected(a)"
                [class.border-t1]="isSelected(a)"
              >
                <!-- Checkmark badge -->
                @if (isSelected(a)) {
                  <div class="absolute top-2 right-2 w-5 h-5 bg-t1 rounded-full flex items-center justify-center shadow-md">
                    <mat-icon class="text-b1 !text-[13px] !w-[13px] !h-[13px]">check</mat-icon>
                  </div>
                }

                <!-- Avatar -->
                @if (a.profileUrl) {
                  <img
                    [src]="a.profileUrl"
                    [alt]="a.name"
                    class="w-12 h-12 rounded-full object-cover ring-2 transition-all"
                    [class.ring-b4]="!isSelected(a)"
                    [class.ring-t1]="isSelected(a)"
                  />
                } @else {
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center ring-2 transition-all"
                    [class.bg-b4]="!isSelected(a)"
                    [class.ring-b4]="!isSelected(a)"
                    [class.bg-b2]="isSelected(a)"
                    [class.ring-t1]="isSelected(a)"
                  >
                    <mat-icon class="text-t3 !text-[22px] !w-[22px] !h-[22px]">person</mat-icon>
                  </div>
                }

                <p class="text-xs font-semibold leading-snug line-clamp-2 transition-colors w-full"
                   [class.text-t1]="isSelected(a)"
                   [class.text-t2]="!isSelected(a)">
                  {{ a.name }}
                </p>
                @if (a.artistType) {
                  <span class="text-[10px] text-t3 leading-none">{{ a.artistType }}</span>
                }
              </button>
            }
          </div>
        }

        <!-- Seleccionados -->
        @if (selectedArtists.length > 0) {
          <div class="flex flex-wrap gap-2 pt-3 border-t border-b4">
            @for (a of selectedArtists; track a.id) {
              <div class="flex items-center gap-1.5 px-3 py-1.5 bg-b3 border border-b4 rounded-xl">
                @if (a.profileUrl) {
                  <img [src]="a.profileUrl" class="w-4 h-4 rounded-full object-cover" alt="" />
                }
                <span class="text-xs font-medium text-t1">{{ a.name }}</span>
                <button
                  type="button"
                  (click)="toggleArtist(a)"
                  class="text-t3 hover:text-t1 transition-colors"
                >
                  <mat-icon class="!text-[13px] !w-[13px] !h-[13px]">close</mat-icon>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class EventArtistsComponent implements OnInit {
  private readonly artistService = inject(ArtistService);

  artistQuery = '';
  filteredArtists: any[] = [];
  selectedArtists: any[] = [];
  artistsDb: any[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.artistService.fetchAll().subscribe({
      next: (res) => {
        this.artistsDb = res.data || [];
        this.filteredArtists = [...this.artistsDb];
      },
      complete: () => (this.isLoading = false),
    });
  }

  filterArtists(query: string) {
    const q = query.toLowerCase().trim();
    this.filteredArtists = !q
      ? [...this.artistsDb]
      : this.artistsDb.filter((a) => a.name.toLowerCase().includes(q));
  }

  toggleArtist(a: any) {
    if (this.isSelected(a)) {
      this.selectedArtists = this.selectedArtists.filter((x) => x.id !== a.id);
    } else {
      this.selectedArtists.push(a);
    }
  }

  isSelected(a: any): boolean {
    return !!this.selectedArtists.find((x) => x.id === a.id);
  }
}
