import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export type ScheduleItem = {
  date: string;
  startTime: string;
};

@Component({
  standalone: true,
  selector: 'event-schedule',
  imports: [FormsModule, MatIconModule],
  template: `
    <section class="bg-b2 rounded-2xl border border-b4 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-b4">
        <div class="flex items-center gap-2">
          <mat-icon class="text-p1 !text-[18px] !w-[18px] !h-[18px]">calendar_month</mat-icon>
          <h2 class="text-sm font-semibold text-t1">Fechas y horas</h2>
        </div>
        <span class="text-xs text-red-400 font-medium">Al menos 1</span>
      </div>

      <div class="divide-y divide-b4">
        @for (sch of schedules; track $index; let i = $index) {
          <div class="flex items-center gap-3 px-5 py-4">
            <!-- Número -->
            <span class="w-6 h-6 rounded-lg bg-b4 text-t3 text-xs font-bold flex items-center justify-center shrink-0">
              {{ i + 1 }}
            </span>

            <!-- Fecha -->
            <div class="flex-1 min-w-0">
              <label class="block text-[10px] font-semibold text-t3 uppercase tracking-wider mb-1">Fecha</label>
              <input
                type="date"
                [(ngModel)]="sch.date"
                class="w-full px-3 py-2 bg-b3 border border-b4 rounded-xl text-t1 text-sm focus:outline-none focus:border-p1 focus:ring-1 focus:ring-p1 transition-all"
              />
            </div>

            <!-- Hora inicio -->
            <div class="w-32 shrink-0">
              <label class="block text-[10px] font-semibold text-t3 uppercase tracking-wider mb-1">Hora inicio</label>
              <input
                type="time"
                [(ngModel)]="sch.startTime"
                class="w-full px-3 py-2 bg-b3 border border-b4 rounded-xl text-t1 text-sm focus:outline-none focus:border-p1 focus:ring-1 focus:ring-p1 transition-all"
              />
            </div>

            <!-- Eliminar -->
            <button
              type="button"
              (click)="removeSchedule(i)"
              [disabled]="schedules.length === 1"
              class="shrink-0 mt-5 p-1.5 text-t3 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <mat-icon class="!text-[18px] !w-[18px] !h-[18px]">close</mat-icon>
            </button>
          </div>
        }

        <!-- Agregar fecha -->
        <div class="px-5 py-3">
          <button
            type="button"
            (click)="addSchedule()"
            class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-p1 border border-p1/30 bg-p1/5 hover:bg-p1/10 rounded-xl transition-colors"
          >
            <mat-icon class="!text-[16px] !w-[16px] !h-[16px]">add</mat-icon>
            Agregar otra fecha
          </button>
        </div>
      </div>
    </section>
  `,
})
export class EventScheduleComponent {
  schedules: ScheduleItem[] = [{ date: '', startTime: '' }];

  addSchedule() {
    this.schedules.push({ date: '', startTime: '' });
  }

  removeSchedule(i: number) {
    if (this.schedules.length > 1) this.schedules.splice(i, 1);
  }
}
