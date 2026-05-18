import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClubService } from '@services/club.service';

interface Club {
  id: number;
  name: string;
  logoUrl?: string;
  description?: string;
}

@Component({
  standalone: true,
  selector: 'event-club',
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
      <!-- Header de sección -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-b4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-p1 !text-[18px] !w-[18px] !h-[18px]">nightlife</mat-icon>
          <h2 class="text-sm font-semibold text-t1">Club</h2>
        </div>
        <span class="text-xs text-red-400 font-medium">Obligatorio</span>
      </div>

      <div class="p-5">
        <!-- Club ya seleccionado -->
        @if (selectedClub) {
          <div class="flex items-center gap-4 p-4 bg-b3 border border-b4 rounded-2xl">
            @if (selectedClub.logoUrl) {
              <img
                [src]="selectedClub.logoUrl"
                [alt]="selectedClub.name"
                class="w-14 h-14 rounded-xl object-cover ring-2 ring-b4 shrink-0"
              />
            } @else {
              <div class="w-14 h-14 rounded-xl bg-b4 flex items-center justify-center shrink-0 ring-2 ring-b4">
                <mat-icon class="text-t3 !text-[26px] !w-[26px] !h-[26px]">nightlife</mat-icon>
              </div>
            }
            <div class="flex-1 min-w-0">
              <p class="text-xs text-t3 font-medium mb-0.5">Club seleccionado</p>
              <p class="text-base font-bold text-t1 truncate">{{ selectedClub.name }}</p>
              @if (selectedClub.description) {
                <p class="text-xs text-t3 mt-0.5 truncate">{{ selectedClub.description }}</p>
              }
            </div>
            <button
              type="button"
              (click)="clearClub()"
              class="shrink-0 px-3 py-1.5 text-xs font-semibold text-t3 hover:text-t1 border border-b4 hover:border-b4 bg-b3 hover:bg-b4 rounded-xl transition-colors"
            >
              Cambiar
            </button>
          </div>
        } @else {
          <!-- Buscador -->
          <div class="relative mb-4">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-t3 !text-[18px] !w-[18px] !h-[18px] pointer-events-none">search</mat-icon>
            <input
              type="text"
              [(ngModel)]="clubQuery"
              (ngModelChange)="filterClubs($event)"
              placeholder="Buscar club por nombre..."
              class="w-full pl-9 pr-4 py-2.5 bg-b3 border border-b4 rounded-xl text-t1 text-sm placeholder-t3 focus:outline-none focus:border-p1 focus:ring-1 focus:ring-p1 transition-all"
            />
          </div>

          <!-- Grid de cards -->
          @if (isLoading) {
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              @for (_ of [1,2,3,4,5,6]; track $index) {
                <div class="flex flex-col items-center gap-2 p-4 bg-b3 border border-b4 rounded-2xl animate-pulse">
                  <div class="w-12 h-12 rounded-xl bg-b4"></div>
                  <div class="h-3 bg-b4 rounded w-16"></div>
                </div>
              }
            </div>
          } @else if (filteredClubs.length === 0) {
            <div class="flex flex-col items-center justify-center py-10 text-center">
              <div class="w-12 h-12 bg-b3 rounded-2xl flex items-center justify-center mb-3">
                <mat-icon class="text-t3 !text-[24px] !w-[24px] !h-[24px]">search_off</mat-icon>
              </div>
              <p class="text-t2 text-sm font-semibold">Sin resultados</p>
              <p class="text-t3 text-xs mt-1">Prueba con otro nombre</p>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-0.5">
              @for (c of filteredClubs; track c.id) {
                <button
                  type="button"
                  (click)="selectClub(c)"
                  class="group flex flex-col items-center gap-2.5 p-4 bg-b3 hover:bg-b4 border border-b4 hover:border-p1/40 rounded-2xl transition-all text-center"
                >
                  @if (c.logoUrl) {
                    <img
                      [src]="c.logoUrl"
                      [alt]="c.name"
                      class="w-12 h-12 rounded-xl object-cover ring-2 ring-b4 group-hover:ring-p1/40 transition-all"
                    />
                  } @else {
                    <div class="w-12 h-12 rounded-xl bg-b4 group-hover:bg-p1/10 flex items-center justify-center ring-2 ring-b4 group-hover:ring-p1/30 transition-all">
                      <mat-icon class="text-t3 group-hover:text-p1 !text-[22px] !w-[22px] !h-[22px] transition-colors">nightlife</mat-icon>
                    </div>
                  }
                  <p class="text-xs font-semibold text-t2 group-hover:text-t1 leading-snug line-clamp-2 transition-colors w-full">
                    {{ c.name }}
                  </p>
                </button>
              }
            </div>
          }
        }
      </div>
    </section>
  `,
})
export class EventClubComponent implements OnInit {
  @Output() clubChange = new EventEmitter<Club | null>();

  private readonly clubService = inject(ClubService);

  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  selectedClub: Club | null = null;
  clubQuery = '';
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clubs = res.data || [];
          this.filteredClubs = [...this.clubs];
        }
      },
      complete: () => (this.isLoading = false),
    });
  }

  filterClubs(query: string) {
    const q = query.toLowerCase().trim();
    this.filteredClubs = !q
      ? [...this.clubs]
      : this.clubs.filter((c) => c.name.toLowerCase().includes(q));
  }

  selectClub(c: Club) {
    this.selectedClub = c;
    this.clubQuery = '';
    this.filteredClubs = [...this.clubs];
    this.clubChange.emit(c);
  }

  clearClub() {
    this.selectedClub = null;
    this.clubChange.emit(null);
  }
}
