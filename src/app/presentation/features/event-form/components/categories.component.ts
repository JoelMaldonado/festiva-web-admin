import { Component, inject, OnInit } from '@angular/core';
import { AppChipComponent } from '@components/app-chip.component';
import { CategoryService } from '@services/category.service';

@Component({
  standalone: true,
  selector: 'event-categories',
  template: `
    <section class="mt-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-200">Categorías</h2>
        <span class="text-xs text-rose-300/90">Al menos 1</span>
      </div>

      <div class="mt-3 flex flex-wrap gap-2">
        @for (cat of categories; track cat) {
        <app-chip [title]="cat.title" [(value)]="cat.isSelected" />
        }
      </div>
    </section>
  `,
  imports: [AppChipComponent],
})
export class EventCategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  categories: any[] = [];

  getAllCategories() {
    this.categoryService.fetchAll(1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.categories = res.data || [];
        }
      },
    });
  }
}
