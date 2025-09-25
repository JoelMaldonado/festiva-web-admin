import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'fest-button',
  imports: [NgIf, MatIconModule],
  template: `
    <button
      [type]="type"
      class="fest-btn group relative isolate inline-flex items-center gap-2
             rounded-2xl px-4 py-2.5 text-sm font-semibold text-white
             focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60
             transition active:scale-[0.98] select-none
             disabled:opacity-60 disabled:cursor-not-allowed"
      [disabled]="loading"
      [attr.aria-label]="label"
      [attr.aria-busy]="loading"
      (click)="onClick()"
    >
      <!-- Fondo visible SIEMPRE -->
      <span class="bg absolute inset-0 rounded-2xl z-0"></span>

      <!-- Halo -->
      <span class="glow absolute -inset-px rounded-2xl -z-10"></span>

      <!-- Borde/shine sutil -->
      <span
        class="shine pointer-events-none absolute inset-0 rounded-2xl z-0"
      ></span>

      <!-- Contenido -->
      <span class="relative z-10 inline-flex items-center gap-2">
        <!-- Icono / Spinner -->
        <ng-container *ngIf="!loading; else spinner">
          @if(matIcon) {
          <mat-icon
            class="transition-transform duration-300 group-hover:rotate-6 group-active:scale-90"
            >{{ matIcon }}</mat-icon
          >
          }
        </ng-container>
        <ng-template #spinner>
          <svg
            class="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"
            />
          </svg>
        </ng-template>

        <!-- Texto (si prefieres cambiarlo en loading, cámbialo a 'Procesando…') -->
        {{ label }}
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

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
        opacity: 0.85;
      }

      .fest-btn .shine {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18),
          0 10px 30px -10px rgba(236, 72, 153, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

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
  @Input() type: 'button' | 'submit' = 'button';
  @Input({ required: true }) label!: string;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<void>();

  @Input() matIcon?: string;

  onClick() {
    if (this.loading) return;
    this.clicked.emit();
  }
}
