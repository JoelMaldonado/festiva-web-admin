import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'events-metrics',
  template: `
    <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <p class="text-xs text-slate-400">Publicados</p>
        <p class="text-lg font-bold text-slate-100">20</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <p class="text-xs text-slate-400">Programados</p>
        <p class="text-lg font-bold text-slate-100">30</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <p class="text-xs text-slate-400">Borradores</p>
        <p class="text-lg font-bold text-slate-100">40</p>
      </div>
      <div class="rounded-xl border border-white/10 bg-white/5 p-3">
        <p class="text-xs text-slate-400">Este mes</p>
        <p class="text-lg font-bold text-slate-100">50</p>
      </div>
    </div>
  `,
})
export class EventsMetricsComponent {}
