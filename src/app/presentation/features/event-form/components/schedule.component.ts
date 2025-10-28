import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Schedule = {
  date: string;
  time: string;
};

@Component({
  standalone: true,
  selector: 'event-schedule',
  imports: [CommonModule, FormsModule],
  template: `
    <section class="mt-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold text-slate-200">Fechas y horas</h2>
        <span class="text-xs text-rose-300/90">Al menos 1</span>
      </div>

      <div class="mt-3 space-y-3">
        @for (sch of schedules; track $index; let i = $index) {
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label class="block text-xs text-slate-400 mb-1"
                >Fecha inicio</label
              >
              <input
                type="date"
                [(ngModel)]="sch.date"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500/40"
              />
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1"
                >Hora inicio</label
              >
              <input
                type="time"
                [(ngModel)]="sch.time"
                class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-pink-500/40"
              />
            </div>
            <button
              type="button"
              class="self-end rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-200 hover:bg-white/10"
              (click)="removeSchedule(i)"
              [disabled]="schedules.length === 1"
            >
              Eliminar
            </button>
          </div>
        </div>
        }
      </div>

      <div class="mt-3">
        <button
          type="button"
          class="rounded-lg border border-pink-400/30 px-3 py-2 text-xs font-semibold text-pink-200 bg-pink-600/20 hover:bg-pink-600/30"
          (click)="addSchedule()"
        >
          + Agregar fecha
        </button>
      </div>
    </section>
  `,
})
export class EventScheduleComponent {
  // Schedules (al menos 1)
  schedules: Schedule[] = [{ date: '', time: '' }];

  addSchedule() {
    this.schedules.push({ date: '', time: '' });
  }
  removeSchedule(i: number) {
    if (this.schedules.length > 1) this.schedules.splice(i, 1);
  }
}
