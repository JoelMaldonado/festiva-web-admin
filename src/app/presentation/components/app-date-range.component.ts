import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const INPUT_CLS = `
  w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
  px-3 py-2 text-white text-sm
  outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
  transition-all duration-200
`.replace(/\s+/g, ' ').trim();

@Component({
  standalone: true,
  selector: 'app-date-range',
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="flex flex-wrap items-end gap-3">

      <div class="flex flex-col gap-1.5 flex-1 min-w-[130px]">
        <label class="text-xs text-white/40 font-medium">Desde</label>
        <input
          type="date"
          [(ngModel)]="fromStr"
          (change)="emit()"
          class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                 px-3 py-2 text-white text-sm
                 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                 transition-all duration-200"
        />
      </div>

      <div class="flex flex-col gap-1.5 flex-1 min-w-[130px]">
        <label class="text-xs text-white/40 font-medium">Hasta</label>
        <input
          type="date"
          [(ngModel)]="toStr"
          [min]="fromStr"
          (change)="emit()"
          class="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl
                 px-3 py-2 text-white text-sm
                 outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20
                 transition-all duration-200"
        />
      </div>

      @if (fromStr || toStr) {
        <button
          type="button"
          (click)="clear()"
          class="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold
                 text-white/50 border border-white/[0.08] bg-white/[0.04]
                 hover:text-white hover:border-white/20 hover:bg-white/[0.08]
                 transition-all duration-200 self-end"
        >
          <mat-icon class="!text-sm !w-4 !h-4">close</mat-icon>
          Limpiar
        </button>
      }
    </div>
  `,
  styles: [`
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1) opacity(0.35);
      cursor: pointer;
    }
    input[type="date"]::-webkit-calendar-picker-indicator:hover {
      opacity: 0.6;
    }
  `],
})
export class AppDateRangeComponent {
  @Output() rangeChange = new EventEmitter<{ from: string; to: string }>();

  fromStr = '';
  toStr = '';

  emit() {
    // Si el usuario pone "hasta" anterior al "desde", lo corregimos
    if (this.fromStr && this.toStr && this.toStr < this.fromStr) {
      this.toStr = this.fromStr;
    }
    this.rangeChange.emit({ from: this.fromStr, to: this.toStr });
  }

  clear() {
    this.fromStr = '';
    this.toStr = '';
    this.rangeChange.emit({ from: '', to: '' });
  }
}
