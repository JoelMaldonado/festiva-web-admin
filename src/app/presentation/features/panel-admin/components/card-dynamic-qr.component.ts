import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'card-dynamic-qr',
  template: `
    <article
      class="rounded-2xl border border-neutral-800 bg-neutral-900 shadow-[0_0_10px_rgba(255,64,129,0.1)]"
    >
      <!-- Header -->
      <div class="flex flex-col items-start border-b border-neutral-800 p-4">
        <h2 class="truncate text-lg font-semibold text-white">
          {{ name }}
        </h2>
        <p class="mt-1 text-sm text-neutral-400">
          {{ description }}
        </p>
      </div>

      <!-- Body -->
      <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        <!-- QR -->
        <div class="sm:col-span-1">
          <div class="rounded-xl border border-neutral-800 bg-neutral-950 p-3">
            <img
              src="https://www.quickanddirtytips.com/wp-content/uploads/2024/03/QR-code-starbucks.png"
              [alt]="'QR code for ' + name"
              class="aspect-square w-full rounded-lg object-cover"
            />
            <p class="mt-2 text-center text-xs text-neutral-500">QR Preview</p>
          </div>
        </div>

        <!-- Info y métricas -->
        <div class="sm:col-span-2">
          <label
            class="text-xs font-medium uppercase tracking-wide text-neutral-400"
            >URL dinámica</label
          >
          <div class="mt-1 flex items-center gap-2">
            <input
              class="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30"
              [value]="destinationUrl"
              readonly
            />
            <button
              class="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-800 active:scale-[0.98] transition"
            >
              Copiar
            </button>
          </div>

          <!-- Métricas -->
          <div
            class="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-3"
          >
            <h3 class="text-sm font-semibold text-neutral-200">
              Escaneos · Octubre 2025
            </h3>

            <dl class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div
                class="rounded-lg bg-neutral-900 p-3 text-center ring-1 ring-inset ring-neutral-800"
              >
                <dt class="text-xs text-neutral-500">iOS</dt>
                <dd class="mt-1 text-xl font-semibold text-white">
                  {{ iosCount }}
                </dd>
              </div>
              <div
                class="rounded-lg bg-neutral-900 p-3 text-center ring-1 ring-inset ring-neutral-800"
              >
                <dt class="text-xs text-neutral-500">Android</dt>
                <dd class="mt-1 text-xl font-semibold text-white">
                  {{ androidCount }}
                </dd>
              </div>
              <div
                class="rounded-lg bg-neutral-900 p-3 text-center ring-1 ring-inset ring-neutral-800"
              >
                <dt class="text-xs text-neutral-500">Otros</dt>
                <dd class="mt-1 text-xl font-semibold text-white">
                  {{ otherCount }}
                </dd>
              </div>
              <div
                class="rounded-lg bg-pink-950/30 p-3 text-center ring-1 ring-inset ring-p1/30"
              >
                <dt class="text-xs font-medium text-p1">Total</dt>
                <dd class="mt-1 text-xl font-semibold text-p1">
                  {{ totalCount }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Acciones -->
          <div class="mt-4 flex flex-wrap items-center gap-2">
            <button
              class="rounded-xl bg-p1 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-p1/80 active:scale-[0.98] transition"
            >
              Descargar PNG
            </button>
            <button
              class="rounded-xl border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-900 active:scale-[0.98] transition"
            >
              Ver historial
            </button>
          </div>
        </div>
      </div>
    </article>
  `,
})
export class CardDynamicQrComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) destinationUrl!: string;

  @Input() iosCount: number = 0;
  @Input() androidCount: number = 0;
  @Input() otherCount: number = 0;

  get totalCount() {
    return this.iosCount + this.androidCount + this.otherCount;
  }
}
