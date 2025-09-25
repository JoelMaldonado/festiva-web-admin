import { Component, inject, Input, OnInit } from '@angular/core';
import { EventService } from '@services/event.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'event-info-card',
  template: `
    <section class="relative my-4 w-[50%]">
      <div
        class="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-rose-500/30 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-12 -right-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
      ></div>

      <article
        class="relative grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
      >
        @if (service.isLoadingEvent()) {
        <div class="h-96 w-48 flex items-center justify-center">
          <div class="loader"></div>
        </div>
        } @else {
        <div class="relative w-full max-w-[400px] ms-3 mt-3">
          <div
            class="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
          >
            <img
              [src]="service.eventSelected()?.imageUrl"
              alt="Imagen del evento"
              class="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
            <!-- Degradado sutil opcional -->
            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            ></div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="p-5 md:p-6 text-slate-100">
          <!-- Título + descripción -->
          <h2 class="text-xl md:text-2xl font-bold leading-tight">
            {{ service.eventSelected()?.title }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-slate-300 line-clamp-5">
            {{ service.eventSelected()?.description }}
          </p>

          <!-- Club + logo + dirección -->
          <div class="mt-5 flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <img
                [src]="service.eventSelected()?.clubLogoUrl"
                alt="Logo del club"
                class="h-12 w-12 rounded-xl object-cover border border-white/15"
                loading="lazy"
              />
              <div>
                <p class="text-xs text-slate-400">Organiza</p>
                <p class="font-semibold">
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
              >
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                />
              </svg>
              <p class="text-sm md:text-base">
                {{ service.eventSelected()?.location }} <br />
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
  service = inject(EventsService);

  @Input({ required: true }) idEvent!: string;

  ngOnInit(): void {
    this.service.getEvent(parseInt(this.idEvent));
  }
}
