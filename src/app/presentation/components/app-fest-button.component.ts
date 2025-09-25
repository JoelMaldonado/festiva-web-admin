import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'fest-button',
  template: `
    <button
      type="button"
      class="fest-btn group relative isolate inline-flex items-center gap-2
             rounded-2xl px-4 py-2.5 text-sm font-semibold text-white
             focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60
             transition active:scale-[0.98] select-none"
      (click)="onClick()"
      [attr.aria-label]="label"
    >
      <!-- Fondo visible SIEMPRE -->
      <span class="bg absolute inset-0 rounded-2xl z-0"></span>

      <!-- Halo (debajo del botón, pero contenido al stacking del botón) -->
      <span class="glow absolute -inset-px rounded-2xl -z-10"></span>

      <!-- Borde/shine sutil -->
      <span
        class="shine pointer-events-none absolute inset-0 rounded-2xl z-0"
      ></span>

      <!-- Contenido -->
      <span class="relative z-10 inline-flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          class="h-5 w-5 transition-transform duration-300
                 group-hover:rotate-6 group-active:scale-90"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {{ label }}
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      /* Gradiente que se mueve en hover/focus */
      .fest-btn .bg {
        background: linear-gradient(90deg, #ec4899, #a855f7, #22d3ee, #ec4899);
        background-size: 300% 300%;
        transition: filter 0.3s ease, opacity 0.3s ease;
        opacity: 0.95;
        filter: saturate(1.1);
      }
      .fest-btn:hover .bg,
      .fest-btn:focus-visible .bg {
        animation: festGradient 3.5s ease-in-out infinite;
        filter: saturate(1.3);
      }

      /* Halo/glow bonito que aparece en hover */
      .fest-btn .glow {
        background: conic-gradient(
          from 90deg,
          rgba(236, 72, 153, 0.55),
          rgba(168, 85, 247, 0.55),
          rgba(59, 130, 246, 0.55),
          rgba(236, 72, 153, 0.55)
        );
        filter: blur(14px);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .fest-btn:hover .glow,
      .fest-btn:focus-visible .glow {
        opacity: 0.9;
      }

      /* Borde/shine interno sutil */
      .fest-btn .shine {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18),
          0 10px 30px -10px rgba(236, 72, 153, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      /* Animación del gradiente */
      @keyframes festGradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,
  ],
})
export class AppFestButtonComponent {
  @Input() label = 'Crear Evento';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
