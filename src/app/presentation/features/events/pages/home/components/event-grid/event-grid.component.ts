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
import { format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AppSelectDateComponent } from '@components/app-select-date.component';
import { EventsService } from 'app/presentation/features/events/events.service';
import { Category } from '@model/category';
import { AppInputDateComponent } from '@components/input-date.component';
import { AppButtonComponent } from "@components/app-button.component";

@Component({
  selector: 'event-grid',
  templateUrl: `./event-grid.component.html`,
  imports: [
    CommonModule,
    MatIconModule,
    EventCardComponent,
    AppSelectDateComponent,
    AppButtonComponent
],
})
export class EventGridComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);
  readonly service = inject(EventsService);

  setDay(date: Date) {
    if (!date) return;
    this.service.daySelected.set(date);
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
    this.loadNextPage();
  }

  listEvents: any[] = [];

  selectCategory(category: Category) {
    if (this.service.selectedCategory() === category) {
      this.service.selectedCategory.set(null);
    } else {
      this.service.selectedCategory.set(category);
    }
    this.page = 1;
    this.listEvents = [];
    this.endReached = false;
    this.loadNextPage();
  }

  page = 1; // página actual (1-based)
  limit = 20; // tamaño de lote
  loading = false; // para bloquear llamadas concurrentes
  endReached = false; // true cuando el backend ya no devuelve más items

  @ViewChild('infiniteScrollAnchor', { static: true })
  infiniteScrollAnchor!: ElementRef<HTMLDivElement>;

  private io?: IntersectionObserver;

  ngOnInit(): void {
    this.loadNextPage();
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
        this.service.selectedCategory()?.id,
        format(this.service.daySelected(), 'yyyy-MM-dd')
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
