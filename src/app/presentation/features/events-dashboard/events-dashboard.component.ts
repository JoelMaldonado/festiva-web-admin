import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventsDashboardService } from './events-dashboard.service';
import { Drawer } from 'primeng/drawer';
import { EventsFormComponent } from './components/events-form.component';
import { EventsFiltersComponent } from './components/events-filters.component';
import { EventsGridComponent } from './components/events-grid.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-events',
  imports: [
    CommonModule,
    MatIconModule,
    Drawer,
    EventsFiltersComponent,
    EventsGridComponent,
    EventsFormComponent,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <!-- Toast fuera del drawer para que persista al cerrarlo -->
    <p-toast position="top-right" />

    <div>
      <p-drawer
        [header]="service.selectedEvent ? 'Editar Evento' : 'Crear Evento'"
        [(visible)]="service.showForm"
        position="right"
      >
        <events-form
          [listCategory]="service.listCategory()"
          (onSaved)="service.onSaved()"
        />
      </p-drawer>

      <events-filters />

      <events-grid
        [listEvents]="service.listEvents"
        [loading]="service.loading"
        [endReached]="service.endReached"
        (loadNextPage)="service.loadNextPage()"
        (deleteEvent)="onDeleteEvent($event)"
      />
    </div>
  `,
})
export class AppEventsComponent {
  readonly service = inject(EventsDashboardService);
  private readonly messageService = inject(MessageService);

  async onDeleteEvent(eventId: number) {
    try {
      await this.service.deleteEvent(eventId);
      this.messageService.add({
        severity: 'success',
        summary: 'Evento eliminado',
        detail: 'El evento se eliminó correctamente.',
        life: 4000,
      });
    } catch {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el evento. Inténtalo de nuevo.',
        life: 4000,
      });
    }
  }
}
