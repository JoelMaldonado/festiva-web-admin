import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EventsDashboardService } from '../events-dashboard.service';
import { EventCardComponent } from '@components/event-card.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'events-grid',
  template: `
    <section class="flex flex-col gap-4 mt-4">
      <!-- Grid -->
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        @for (item of listEvents; track $index) {
        <event-card
          [eventId]="item.eventId"
          [coverUrl]="item.imageUrl"
          [title]="item.title"
          [date]="item.eventDate"
          [category]="item.nameEventCategory"
          [venue]="item.nameClub"
          (toArtists)="toPath(item.eventId ?? item.eventId, 'artists')"
          (toSchedule)="toPath(item.eventId ?? item.eventId, 'schedule')"
          (toCategory)="toPath(item.eventId ?? item.eventId, 'categories')"
        />
        }
      </div>

      <!-- Loader / Estado -->
      @if (loading) {
      <div class="text-center text-sm opacity-70 py-3">
        Cargando más eventos…
      </div>
      } @if (endReached && listEvents.length > 0) {
      <div class="text-center text-xs opacity-60 py-3">No hay más eventos</div>
      } @if (!loading && listEvents.length === 0 && endReached) {
      <div class="text-center text-sm opacity-70 py-6">Sin resultados</div>
      }

      <!-- Sentinel: el observer mira este elemento para cargar más -->
      <div #infiniteScrollAnchor class="h-1"></div>
    </section>
  `,
  imports: [EventCardComponent],
})
export class EventsGridComponent {
  private readonly router = inject(Router);

  @Input({ required: true }) listEvents: any[] = [];
  @Input({ required: true }) loading = false;
  @Input({ required: true }) endReached = false;

  @Output() loadNextPage = new EventEmitter<void>();

  @ViewChild('infiniteScrollAnchor', { static: true })
  infiniteScrollAnchor!: ElementRef<HTMLDivElement>;

  private io?: IntersectionObserver;

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'events', id, path]);
  }

  ngAfterViewInit(): void {
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.loadNextPage.emit();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0.01,
      }
    );

    // Empieza a observar el anchor
    if (this.infiniteScrollAnchor?.nativeElement) {
      this.io.observe(this.infiniteScrollAnchor.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.io && this.infiniteScrollAnchor?.nativeElement) {
      this.io.unobserve(this.infiniteScrollAnchor.nativeElement);
      this.io.disconnect();
    }
  }
}
