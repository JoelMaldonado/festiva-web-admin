import { Component, inject, Input } from '@angular/core';
import { EventInfoCardComponent } from '../events-old/components/event-info-card.component';
import { AppTopComponent } from '@components/app-top.component';
import { AppButtonComponent } from '@components/app-button.component';
import { EventCategory } from '@model/event-category';
import { EventCategoryService } from '@services/event-category.service';
import { EventsOldService } from '../events-old/events-old.service';

@Component({
  selector: 'events-categories-component',
  imports: [EventInfoCardComponent, AppTopComponent, AppButtonComponent],
  standalone: true,
  templateUrl: './events-categories.component.html',
})
export class EventsCategoriesComponent {
  @Input() idEvent?: string;

  private readonly eventCategoryService = inject(EventCategoryService);
  readonly service = inject(EventsOldService);

  listEventCategories: EventCategory[] = [];

  ngOnInit() {
    if (!this.idEvent) {
      alert('Invalid event ID');
      return;
    }
    this.loadEventCategories();
  }

  loadEventCategories() {
    if (!this.idEvent) return;
    this.eventCategoryService.allEventCategories(this.idEvent!).subscribe({
      next: (result) => {
        if (result?.isSuccess) {
          this.listEventCategories = result.data || [];
        }
      },
      error: (err) => {
        console.error('Error fetching event categories', err);
      },
    });
  }

  isSelected(id: number): boolean {
    return this.listEventCategories.some((c) => c.categoryId === id);
  }

  toggleCategory(id: number): void {
    const exists = this.isSelected(id);
    if (exists) {
      this.listEventCategories = this.listEventCategories.filter(
        (c) => c.categoryId !== id
      );
    } else {
      this.listEventCategories.push({ categoryId: id });
    }
  }

  clear() {
    this.listEventCategories = [];
  }

  isLoadingSave = false;

  save() {
    if (!this.idEvent) return;
    this.isLoadingSave = true;
    this.eventCategoryService
      .saveEventCategories(this.idEvent, this.listEventCategories)
      .subscribe({
        next: (result) => {
          if (result?.isSuccess) {
            alert('Categories saved successfully');
          } else {
            alert(result?.message || 'Error saving categories');
          }
        },
        error: (err) => {
          console.error('Error saving event categories', err);
          alert('Error saving categories');
        },
        complete: () => {
          this.isLoadingSave = false;
        },
      });
  }
}
