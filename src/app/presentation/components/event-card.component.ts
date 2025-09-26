import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FestFabButtonComponent } from './fest-fab-button.component';

@Component({
  standalone: true,
  selector: 'event-card',
  imports: [CommonModule, MatIconModule, FestFabButtonComponent],
  template: `
    <article
      class="group relative rounded-2xl ring-1 ring-white/10 shadow-black/30 shadow-md
           overflow-hidden transition hover:shadow-lg hover:ring-white/20
           cursor-pointer select-none
           [perspective:1000px]"
      (click)="toggleFlip()"
      (keyup.enter)="toggleFlip()"
      tabindex="0"
      aria-label="Event card"
    >
      <!-- Inner que rota -->
      <div
        class="relative h-full w-full transition-transform duration-500 preserve-3d"
        [class]="flipped ? '[transform:rotateY(180deg)]' : ''"
        [class.group-hover:[transform:rotateY(180deg)]]="true"
      >
        <!-- FRONT -->
        <div class="backface-hidden">
          <!-- cover -->
          <div class="relative">
            <img
              [src]="coverUrl"
              alt="cover"
              class="w-full h-48 object-cover md:h-52"
            />
            <!-- date badge -->
            <div
              class="absolute top-2 left-2 flex flex-col items-center justify-center
                   w-14 rounded-xl bg-neutral-900/90 text-white text-center ring-1 ring-white/20"
            >
              <div
                class="text-[10px] font-semibold tracking-wide uppercase py-1"
              >
                {{ date | date : 'MMM' }}
              </div>
              <div class="text-lg md:text-xl font-extrabold leading-none pb-1">
                {{ date | date : 'dd' }}
              </div>
            </div>
            <!-- category pill -->
            <div class="absolute -bottom-3 left-4">
              <span
                class="inline-flex items-center px-4 py-1.5 rounded-full
                     bg-neutral-900/80 text-white text-sm font-semibold
                     ring-2 ring-p1 shadow-[0_6px_20px_-6px_rgba(255,64,129,0.6)]"
              >
                {{ category }}
              </span>
            </div>
          </div>

          <!-- body -->
          <div class="px-4 pt-6 pb-4 bg-neutral-800/80">
            <h3
              class="text-white font-extrabold text-lg leading-snug line-clamp-2"
            >
              {{ title }}
            </h3>
            <div class="mt-2 flex items-center gap-2 text-neutral-300">
              <mat-icon class="opacity-70">location_on</mat-icon>
              <span class="text-sm truncate">{{ venue }}</span>
            </div>

            <!-- ID del evento (discreto) -->
            <div class="mt-1 text-right text-neutral-400/70 italic text-sm">
              #{{ eventId }}
            </div>
          </div>
        </div>

        <!-- BACK -->
        <div
          class="absolute inset-0 backface-hidden [transform:rotateY(180deg)]
               bg-neutral-900/95 ring-1 ring-white/10"
          (click)="$event.stopPropagation()"
        >
          <!-- Botones -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="grid grid-flow-col gap-4">
              <fest-fab-button
                variant="primary"
                matIcon="recent_actors"
                tooltip="Artists"
                (clicked)="clickedArtists()"
              />

              <fest-fab-button
                variant="secondary"
                matIcon="date_range"
                tooltip="Schedule"
                (clicked)="clickedSchedule()"
              />

              <fest-fab-button
                variant="accent"
                matIcon="style"
                tooltip="Categories"
                (clicked)="clickedCategory()"
              />
            </div>
          </div>

          <!-- Texto auxiliar -->
          <div
            class="absolute bottom-3 inset-x-3 text-center text-neutral-300 text-xs"
          >
            Tap / hover para volver
          </div>
        </div>
      </div>
    </article>
  `,
  styles: `
    .backface-hidden { backface-visibility: hidden; }
    .preserve-3d { transform-style: preserve-3d; }
  `,
})
export class EventCardComponent {
  @Input() eventId?: string;
  @Input() coverUrl?: string;
  @Input() title?: string;
  @Input() date?: Date;
  @Input() category?: string;
  @Input() venue?: string;

  // acciones opcionales
  @Output() toArtists = new EventEmitter<void>();
  @Output() toSchedule = new EventEmitter<void>();
  @Output() toCategory = new EventEmitter<void>();

  clickedArtists() {
    this.toArtists?.emit();
  }

  clickedSchedule() {
    this.toSchedule?.emit();
  }

  clickedCategory() {
    this.toCategory?.emit();
  }

  flipped = false;

  toggleFlip() {
    this.flipped = !this.flipped;
  }

  // Si quieres que el mouse salga y vuelva automáticamente en desktop:
  @HostListener('mouseleave')
  onLeave() {
    this.flipped = false;
  }
}
