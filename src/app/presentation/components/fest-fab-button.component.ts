import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type FabVariant = 'primary' | 'secondary' | 'accent';

@Component({
  standalone: true,
  selector: 'fest-fab-button',
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="relative inline-block group" [ngClass]="'variant-' + variant">
      <button
        type="button"
        class="fab-btn relative isolate flex h-14 w-14 items-center justify-center
               rounded-full border border-white/15 bg-transparent text-white/90
               transition select-none
               hover:text-white focus-visible:text-white
               focus:outline-none active:scale-[0.97]
               disabled:opacity-50 disabled:cursor-not-allowed"
        (click)="onClick()"
        [disabled]="disabled"
        aria-label="FAB"
      >
        <!-- Glow (neón) -->
        <span
          class="glow pointer-events-none absolute -inset-2 -z-10 rounded-full"
          aria-hidden="true"
        ></span>

        <!-- Borde con tinte -->
        <span
          class="tint pointer-events-none absolute inset-0 rounded-full"
          aria-hidden="true"
        ></span>

        <!-- Icono -->
        <mat-icon
          class="text-[22px] transition-transform duration-200
                 group-hover:scale-[1.06] group-active:scale-95"
        >
          {{ matIcon }}
        </mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      /* === Paleta por variante (sin inputs de color) === */
      .variant-primary {
        --fab: #ec4899;
      } /* pink-500 */
      .variant-secondary {
        --fab: #a855f7;
      } /* violet-500 */
      .variant-accent {
        --fab: #22d3ee;
      } /* cyan-400 */

      /* Botón base */
      .fab-btn {
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
      }

      /* Borde con tinte sutil siempre visible */
      .tint {
        border: 1px solid color-mix(in oklab, var(--fab) 40%, transparent);
        box-shadow: 0 10px 24px -10px color-mix(in oklab, var(--fab) 55%, transparent);
      }

      /* Glow (aparece en hover/focus) */
      .glow {
        opacity: 0;
        background: radial-gradient(
          closest-side,
          color-mix(in oklab, var(--fab) 75%, transparent) 0%,
          transparent 70%
        );
        filter: blur(14px);
        transition: opacity 0.2s ease;
      }
      .group:hover .glow,
      .group:focus-within .glow {
        opacity: 0.85;
      }

      .fab-btn:focus-visible {
        box-shadow: 0 0 0 2px color-mix(in oklab, var(--fab) 60%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.14);
      }
    `,
  ],
})
export class FestFabButtonComponent {
  /** Icono de Material (ej. 'add', 'camera_alt', 'schedule', etc.) */
  @Input({ required: true }) matIcon!: string;

  /** Variante de color interna (sin hex externos) */
  @Input() variant: FabVariant = 'primary';

  /** Deshabilitar botón */
  @Input() disabled = false;

  /** Click emitido */
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) this.clicked.emit();
  }
}
