import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FestInputComponent } from '@components/fest-input.component';
import { ClubService } from '@services/club.service';

interface Club {
  id: number;
  name: string;
  logoUrl?: string;
}

@Component({
  standalone: true,
  selector: 'event-club',
  imports: [CommonModule, FormsModule, FestInputComponent],
  template: `
    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm font-semibold text-slate-200">Club</h2>
        <span class="text-xs text-rose-300/90">Obligatorio</span>
      </div>

      @if (!selectedClub) {
      <div class="relative">
        <fest-input
          placeholder="Select a club"
          [maxLength]="50"
          [value]="clubQuery"
          (valueChange)="filterClubs($event)"
        />

        @if (clubQuery.trim().length > 0) {
        <ul
          class="absolute z-20 overflow-auto rounded-xl border border-white/10 bg-neutral-900/95 ring-1 ring-white/10 w-full max-h-[300px]"
        >
          @for (c of filteredClubs; track c.id) {
          <li>
            <button
              type="button"
              class="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10"
              (click)="selectClub(c)"
            >
              <img
                [src]="c.logoUrl || '/assets/placeholder-club.png'"
                class="h-8 w-8 rounded-lg object-cover border border-white/10"
                alt=""
              />
              <span class="text-sm text-slate-100">{{ c.name }}</span>
            </button>
          </li>
          }
        </ul>
        }
      </div>

      } @else {
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img
            [src]="selectedClub.logoUrl || '/assets/placeholder-club.png'"
            class="h-12 w-12 rounded-xl object-cover border border-white/10"
            alt="Logo club"
          />
          <div class="min-w-0">
            <p class="text-xs text-slate-400">Seleccionado</p>
            <p class="font-semibold text-slate-100 truncate">
              {{ selectedClub.name }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10"
          (click)="clearClub()"
        >
          Cambiar
        </button>
      </div>

      }
    </section>
  `,
})
export class EventClubComponent implements OnInit {
  private readonly clubService = inject(ClubService);
  ngOnInit(): void {
    this.clubService.fetchAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clubs = res.data || [];
        }
      },
    });
  }
  selectedClub: Club | null = null;
  filteredClubs: Club[] = [];
  clubQuery = '';

  clubs: Club[] = [];

  // --- Métodos UI (maquetación) ---
  filterClubs(query: string) {
    this.clubQuery = query;
    const q = this.clubQuery.toLowerCase().trim();
    this.filteredClubs = this.clubs.filter((c) =>
      c.name.toLowerCase().includes(q)
    );
  }
  selectClub(c: Club) {
    this.selectedClub = c;
    this.clubQuery = '';
    this.filteredClubs = [];
  }
  clearClub() {
    this.selectedClub = null;
  }
}
