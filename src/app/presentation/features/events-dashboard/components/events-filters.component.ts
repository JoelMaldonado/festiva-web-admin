import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppSelectDateComponent } from '@components/app-select-date.component';
import { EventsDashboardService } from '../events-dashboard.service';
import { AppFestButtonComponent } from '@components/fest-button.component';
import { EventsMetricsComponent } from './events-metrics.component';
import { FormsModule } from '@angular/forms';
import { FestInputComponent } from '@components/fest-input.component';

@Component({
  standalone: true,
  selector: 'events-filters',
  imports: [
    CommonModule,
    FormsModule,
    AppSelectDateComponent,
    AppFestButtonComponent,
    EventsMetricsComponent,
    FestInputComponent,
  ],
  template: `
    <section class="max-w-6xl mx-auto px-4">
      <article
        class="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 overflow-hidden"
      >
        <!-- blobs suaves -->
        <div
          class="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
        ></div>

        <div class="relative p-5 md:p-6">
          <!-- Título + CTA -->
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-lg md:text-xl font-extrabold text-white">
                Gestiona tus eventos
              </h2>
              <p class="text-sm text-slate-400">
                Crea, busca y filtra eventos del club.
              </p>
            </div>

            <fest-button label="Add Event" (clicked)="showForm()" />
          </div>

          <div class="mt-4">
            <fest-input
              label="Search"
              placeholder="Search events by name"
              [(value)]="service.searchInput"
              (enter)="search()"
              [loading]="service.loading"
            />
          </div>

          <events-metrics />

          <p class="text-sm text-slate-400 m-2">Categories</p>
          <div class="flex flex-wrap gap-2 gap-y-3">
            @for (item of service.listCategory(); track $index) {
            <button
              type="button"
              class="inline-flex items-center px-5 py-1.5 rounded-full border text-sm font-medium transition focus:outline-none select-none whitespace-nowrap"
              [ngClass]="
                service.selectedCategory() === item
                  ? 'border-pink-500 text-white bg-pink-600/20'
                  : 'border-gray-500 text-gray-300 hover:bg-gray-700/30'
              "
              (click)="service.selectCategory(item)"
            >
              {{ item.title }}
            </button>
            }
          </div>

          <div class="mt-4">
            <app-select-date
              [daySelected]="service.daySelected()"
              (daySelectedChange)="service.setDay($event)"
            />
          </div>
        </div>
      </article>
    </section>
  `,
})
export class EventsFiltersComponent {
  readonly service = inject(EventsDashboardService);

  search() {
    this.service.resetPagination();
    this.service.loadNextPage();
  }

  showForm() {
    this.service.showForm = true;
  }
}
