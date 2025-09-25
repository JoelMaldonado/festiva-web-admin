import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'date-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="selected.emit()"
      [attr.aria-pressed]="isActive"
      [attr.aria-label]="'Fecha ' + (date | date : 'MMM dd')"
      class="inline-flex rounded-2xl border-2 p-1 transition-colors focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-pink-500 hover:border-pink-400"
      [ngClass]="isActive ? 'border-pink-500' : 'border-white'"
    >
      <div
        class="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-neutral-900
               text-white font-bold"
      >
        <div class="text-sm tracking-wide">
          {{ date | date : 'MMM' | uppercase }}
        </div>
        <div class="text-3xl leading-none">{{ date | date : 'dd' }}</div>
      </div>
    </button>
  `,
})
export class DateBadgeComponent {
  @Input() date!: Date;
  @Input() isActive = false;
  @Output() selected = new EventEmitter<void>();
}
