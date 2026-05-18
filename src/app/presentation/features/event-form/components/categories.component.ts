import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '@services/category.service';

interface Category {
  id: number;
  title: string;
  isSelected: boolean;
}

@Component({
  standalone: true,
  selector: 'event-categories',
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-b4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-p1 !text-[18px] !w-[18px] !h-[18px]">sell</mat-icon>
          <h2 class="text-sm font-semibold text-t1">Categorías</h2>
        </div>
        <span class="text-xs text-red-400 font-medium">
          Al menos 1
          @if (selectedCount > 0) {
            · <span class="text-t1">{{ selectedCount }} elegida{{ selectedCount > 1 ? 's' : '' }}</span>
          }
        </span>
      </div>

      <div class="p-5 space-y-4">
        <!-- Buscador -->
        <div class="relative">
          <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-t3 !text-[18px] !w-[18px] !h-[18px] pointer-events-none">search</mat-icon>
          <input
            type="text"
            [(ngModel)]="catQuery"
            (ngModelChange)="filterCategories($event)"
            placeholder="Filtrar categorías..."
            class="w-full pl-9 pr-4 py-2.5 bg-b3 border border-b4 rounded-xl text-t1 text-sm placeholder-t3 focus:outline-none focus:border-p1 focus:ring-1 focus:ring-p1 transition-all"
          />
        </div>

        <!-- Pills -->
        @if (categories.length === 0) {
          <div class="flex flex-wrap gap-2">
            @for (_ of [1,2,3,4,5,6,7]; track $index) {
              <div class="h-8 bg-b3 rounded-xl animate-pulse" [style.width.px]="60 + ($index * 15 % 50)"></div>
            }
          </div>
        } @else if (filteredCategories.length === 0) {
          <p class="text-sm text-t3 text-center py-4">Sin resultados para "{{ catQuery }}"</p>
        } @else {
          <div class="flex flex-wrap gap-2">
            @for (cat of filteredCategories; track cat.id) {
              <button
                type="button"
                (click)="toggleCategory(cat)"
                class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all"
                [class.bg-t1]="cat.isSelected"
                [class.text-b1]="cat.isSelected"
                [class.border-t1]="cat.isSelected"
                [class.bg-b3]="!cat.isSelected"
                [class.text-t2]="!cat.isSelected"
                [class.border-b4]="!cat.isSelected"
                [class.hover:border-t3]="!cat.isSelected"
                [class.hover:text-t1]="!cat.isSelected"
              >
                @if (cat.isSelected) {
                  <mat-icon class="!text-[14px] !w-[14px] !h-[14px]">check</mat-icon>
                }
                {{ cat.title }}
              </button>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class EventCategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  catQuery = '';

  @Output() categoriesChange = new EventEmitter<string[]>();

  get selectedCount(): number {
    return this.categories.filter((c) => c.isSelected).length;
  }

  ngOnInit(): void {
    this.categoryService.fetchAll(1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.categories = (res.data || []).map((c: any) => ({ ...c, isSelected: false }));
          this.filteredCategories = [...this.categories];
        }
      },
    });
  }

  filterCategories(query: string) {
    const q = query.toLowerCase().trim();
    this.filteredCategories = !q
      ? [...this.categories]
      : this.categories.filter((c) => c.title.toLowerCase().includes(q));
  }

  toggleCategory(cat: Category) {
    cat.isSelected = !cat.isSelected;
    this.categoriesChange.emit(this.categories.filter((c) => c.isSelected).map((c) => c.title));
  }
}
