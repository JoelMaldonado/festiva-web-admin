import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@model/category';
import { EventModel } from '@model/event';
import { CategoryService } from '@services/category.service';
import { EventService } from '@services/event.service';
import { StatusEnum } from 'app/data/enum/status-enum';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsDashboardService {
  private readonly categoryService = inject(CategoryService);
  private readonly eventService = inject(EventService);

  // form
  selectedEvent: EventModel | null = null;
  showForm = false;

  onSaved() {
    this.showForm = false;
    this.resetPagination();
    this.loadNextPage();
  }

  // filters
  searchInput = signal<string>('');
  selectedCategory = signal<Category | null>(null);
  listCategory = signal<Category[]>([]);

  // rango de fechas (strings YYYY-MM-DD, vacío = sin filtro)
  dateFrom = signal<string>('');
  dateTo = signal<string>('');

  // pagination
  listEvents: any[] = [];
  page = 1;
  limit = 20;
  loading = false;
  endReached = false;

  constructor() {
    this.getAllCategories();
    this.loadNextPage();
  }

  getAllCategories() {
    this.categoryService.fetchAll(StatusEnum.active).subscribe({
      next: (res) => {
        if (res.isSuccess) this.listCategory.set(res.data || []);
      },
      error: (err) => console.error(err),
    });
  }

  resetPagination() {
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
  }

  loadNextPage() {
    if (this.loading || this.endReached) return;
    this.loading = true;

    const search = this.searchInput().trim() || undefined;

    // Si hay búsqueda activa, ignorar el rango de fechas
    // (el backend devolverá desde hoy en adelante sin filtro de fecha)
    const dateFrom = !search ? (this.dateFrom() || undefined) : undefined;
    const dateTo   = !search ? (this.dateTo()   || undefined) : undefined;

    this.eventService
      .fetchAllPaged(
        this.page,
        this.limit,
        this.selectedCategory()?.id,
        search,
        dateFrom,
        dateTo,
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const items = res?.data?.items ?? [];
          if (res?.isSuccess && items.length > 0) {
            const currentIds = new Set(
              this.listEvents.map((e) => e.id ?? e.eventId)
            );
            const toAppend = items.filter(
              (e: any) => !currentIds.has(e.id ?? e.eventId)
            );
            this.listEvents = [...this.listEvents, ...toAppend];
            this.page += 1;
          } else {
            this.endReached = true;
          }
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  async deleteEvent(eventId: number): Promise<void> {
    const res = await firstValueFrom(this.eventService.delete(eventId));
    if (res.isSuccess) {
      this.resetPagination();
      this.loadNextPage();
    }
  }

  setDateRange(from: string, to: string) {
    this.dateFrom.set(from);
    this.dateTo.set(to);
    this.resetPagination();
    this.loadNextPage();
  }

  selectCategory(category: Category) {
    this.selectedCategory.set(
      this.selectedCategory() === category ? null : category
    );
    this.resetPagination();
    this.loadNextPage();
  }
}
