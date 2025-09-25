import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventsDashboardService } from './events-dashboard.service';
import { Drawer } from 'primeng/drawer';
import { EventsFormComponent } from './components/events-form.component';
import { EventsDashboardHeaderComponent } from './components/events-dashboard-header.component';
import { EventsGridComponent } from './components/events-grid.component';

@Component({
  standalone: true,
  selector: 'app-events',
  imports: [
    CommonModule,
    MatIconModule,
    Drawer,
    EventsDashboardHeaderComponent,
    EventsGridComponent,
    EventsFormComponent,
  ],
  template: `
    <div>
      <p-drawer
        [header]="service.selectedEvent ? 'Editar Evento' : 'Crear Evento'"
        [(visible)]="service.showForm"
        position="right"
      >
        <events-form (onSaved)="service.onSaved()" />
      </p-drawer>

      <events-dashboard-header />

      <events-grid
        [listEvents]="service.listEvents"
        [loading]="service.loading"
        [endReached]="service.endReached"
        (loadNextPage)="loadNextPage()"
      />
    </div>
  `,
})
export class AppEventsComponent {
  readonly service = inject(EventsDashboardService);

  loadNextPage() {
    this.service.loadNextPage();
  }
}
