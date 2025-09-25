import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { EventCardComponent } from '@components/event-card.component';
import { EventService } from '@services/event.service';
import { take } from 'rxjs';
import { DateBadgeComponent } from '@components/date-badge.component';
import { AppFloatingActionButton } from '@components/app-floating-action-button.component';
import { format } from 'date-fns';

@Component({
  selector: 'event-grid',
  templateUrl: `./event-grid.component.html`,
  imports: [EventCardComponent, DateBadgeComponent, AppFloatingActionButton],
})
export class EventGridComponent implements OnInit, AfterViewInit, OnDestroy {
  listDays: Date[] = [];
  daySelected: Date = new Date();

  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  listEvents: any[] = [];

  page = 1; // página actual (1-based)
  limit = 20; // tamaño de lote
  loading = false; // para bloquear llamadas concurrentes
  endReached = false; // true cuando el backend ya no devuelve más items

  @ViewChild('infiniteScrollAnchor', { static: true })
  infiniteScrollAnchor!: ElementRef<HTMLDivElement>;

  private io?: IntersectionObserver;

  prevDay() {
    // retrocede un día
    const prev = this.daySelected;
    prev.setDate(prev.getDate() - 1);
    this.daySelected = prev;
    this.updateList();
  }

  nextDay() {
    const next = new Date(this.daySelected);
    next.setDate(next.getDate() + 1);
    this.daySelected = next;
    this.updateList();
  }

  updateList() {
    this.listDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(this.daySelected);
      d.setDate(this.daySelected.getDate() + i);
      return d;
    });
  }

  selectDay(day: Date) {
    this.daySelected = day;
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
    this.loadNextPage();
  }

  ngOnInit(): void {
    this.loadNextPage();
    // Inicializa los días (ejemplo: próximos 7 días)
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.listDays.push(date);
    }
  }

  ngAfterViewInit(): void {
    // Configuramos el IntersectionObserver
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.loadNextPage();
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px 0px 300px 0px', // pre-carga ~300px antes del final
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

  loadNextPage() {
    if (this.loading || this.endReached) return;
    this.loading = true;

    this.eventService
      .fetchAllPaged(
        this.page,
        this.limit,
        undefined,
        format(this.daySelected, 'yyyy-MM-dd')
      )
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const items = res?.data?.items ?? [];
          if (res?.isSuccess && items.length > 0) {
            // Evita duplicados si el backend repite elementos entre páginas
            const currentIds = new Set(
              this.listEvents.map((e) => e.id ?? e.eventId)
            );
            const toAppend = items.filter(
              (e: any) => !currentIds.has(e.id ?? e.eventId)
            );

            this.listEvents = [...this.listEvents, ...toAppend];
            this.page += 1;
          } else {
            // No llegaron items => fin de lista
            this.endReached = true;
            this.detachObserver(); // opcional: ya no observar
          }
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          // Evita loop infinito si falla repetidamente
          this.loading = false;
        },
      });
  }

  private detachObserver() {
    if (this.io && this.infiniteScrollAnchor?.nativeElement) {
      this.io.unobserve(this.infiniteScrollAnchor.nativeElement);
      this.io.disconnect();
      this.io = undefined;
    }
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'events', id, path]);
  }
}
