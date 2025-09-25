import { Component, inject, Input, OnInit } from '@angular/core';
import { EventsOldService } from '../events-old.service';

@Component({
  selector: 'event-info-card',
  template: `
    <section class="relative my-6 mx-auto w-full max-w-5xl px-4 md:px-6">
      <!-- Blobs decorativos (solo en md+) -->
      <div
        class="pointer-events-none absolute -top-16 -left-10 hidden md:block h-56 w-56 rounded-full bg-rose-500/30 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-16 -right-10 hidden md:block h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
      ></div>

      <article
        class="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
      >
        @if (service.isLoadingEvent()) {
        <!-- LOADER centrado -->
        <div
          class="col-span-1 md:col-span-2 flex items-center justify-center min-h-72 p-10"
        >
          <div
            class="h-10 w-10 rounded-full border-2 border-white/25 border-t-white animate-spin"
          ></div>
        </div>
        } @else {
        <!-- MEDIA -->
        <div class="p-4 md:p-6">
          <div
            class="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900"
          >
            <img
              [src]="service.eventSelected()?.imageUrl"
              alt="Imagen del evento"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <!-- degradado sutil -->
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
            ></div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="p-5 md:p-6 text-slate-100">
          <!-- título -->
          <h2 class="text-xl md:text-2xl font-extrabold leading-tight">
            {{ service.eventSelected()?.title }}
          </h2>
          <p class="mt-1 text-sm text-slate-400/70 italic">
            ID: {{ service.eventSelected()?.id }}
          </p>

          <!-- descripción -->
          <p class="mt-2 text-sm md:text-base text-slate-300 md:leading-7 line-clamp-5">
            {{ service.eventSelected()?.description }}
          </p>

          <!-- separador sutil -->
          <div class="my-4 h-px bg-white/10"></div>

          <!-- club / logo / dirección -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <img
                [src]="service.eventSelected()?.clubLogoUrl"
                alt="Logo del club"
                class="h-12 w-12 rounded-xl object-cover border border-white/10"
                loading="lazy"
              />
              <div class="min-w-0">
                <p class="text-xs text-slate-400">Organiza</p>
                <p class="font-semibold truncate">
                  {{ service.eventSelected()?.clubName }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-2 text-slate-300">
              <!-- ícono ubicación -->
              <svg
                viewBox="0 0 24 24"
                class="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
                fill="currentColor"
              >
                <path
                  d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                />
              </svg>
              <p class="text-sm md:text-base leading-6">
                {{ service.eventSelected()?.location }}
              </p>
            </div>
          </div>
        </div>
        }
      </article>
    </section>
  `,
})
export class EventInfoCardComponent implements OnInit {
  service = inject(EventsOldService);

  @Input({ required: true }) idEvent!: string;

  ngOnInit(): void {
    this.service.getEvent(parseInt(this.idEvent));
  }
}
