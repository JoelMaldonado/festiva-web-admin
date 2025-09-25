import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@model/category';
import { EventModel } from '@model/event';
import { CategoryService } from '@services/category.service';
import { EventService } from '@services/event.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly categoryService = inject(CategoryService);
  private readonly eventService = inject(EventService);

  constructor() {
    this.getAllCategories();
  }

  listCategory = signal<Category[]>([]);

  eventSelected = signal<EventModel | null>(null);
  isLoadingEvent = signal<boolean>(false);

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

  getEvent(eventId: number) {
    if (this.eventSelected()?.id === eventId) {
      return;
    }
    this.isLoadingEvent.set(true);
    this.eventService
      .getById(eventId.toString())
      .pipe(delay(1500))
      .subscribe({
        next: (res) => this.eventSelected.set(res.data),
        error: (err) => console.log(err),
        complete: () => this.isLoadingEvent.set(false),
      });
  }
}
