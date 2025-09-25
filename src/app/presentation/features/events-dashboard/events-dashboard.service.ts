import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@model/category';
import { EventModel } from '@model/event';
import { CategoryService } from '@services/category.service';
import { EventService } from '@services/event.service';
import { format } from 'date-fns';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsDashboardService {
  private readonly categoryService = inject(CategoryService);
  private readonly eventService = inject(EventService);

  // form
  drawerForm = false;
  selectedEvent: EventModel | null = null;
  showForm = false;

  onSaved() {
    this.drawerForm = false;
  }

  // filters
  selectedCategory = signal<Category | null>(null);
  daySelected = signal<Date>(new Date());
  listCategory = signal<Category[]>([]);

  // pagination
  listEvents: any[] = [];
  page = 1; // página actual (1-based)
  limit = 20; // tamaño de lote
  loading = false; // para bloquear llamadas concurrentes
  endReached = false; // true cuando el backend ya no devuelve más items

  constructor() {
    this.getAllCategories();
    this.loadNextPage();
  }

  getAllCategories() {
    this.categoryService.fetchAll(1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.listCategory.set(res.data || []);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadNextPage() {
    if (this.loading || this.endReached) return;
    this.loading = true;

    this.eventService
      .fetchAllPaged(
        this.page,
        this.limit,
        this.selectedCategory()?.id,
        format(this.daySelected(), 'yyyy-MM-dd')
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

  // Setters
  setDay(date: Date) {
    if (!date) return;
    this.daySelected.set(date);
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
    this.loadNextPage();
  }

  selectCategory(category: Category) {
    if (this.selectedCategory() === category) {
      this.selectedCategory.set(null);
    } else {
      this.selectedCategory.set(category);
    }
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
    this.loadNextPage();
  }
}
