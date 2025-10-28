import { Component, OnInit } from '@angular/core';
import { AppFestButtonComponent } from '@components/fest-button.component';

@Component({
  standalone: true,
  selector: 'event-header',
  imports: [AppFestButtonComponent],
  template: `
    <article
      class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl mb-6"
    >
      <div
        class="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
      ></div>

      <div class="relative p-5 md:p-6">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h1 class="text-2xl md:text-3xl font-extrabold text-white">
              Crear evento
            </h1>
            <p class="text-sm text-slate-400 mt-1">
              Asocia un club, agrega artistas y categorías, sube una imagen y
              programa fechas.
            </p>
          </div>
          <fest-button label="Guardar" />
        </div>
      </div>
    </article>
  `,
})
export class EventHeaderComponent {}
