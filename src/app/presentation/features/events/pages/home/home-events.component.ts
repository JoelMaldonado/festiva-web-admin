import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { DrawerFormEvent } from './components/drawer-form-event/drawer-form-event.component';
import { EventModel } from '@model/event';
import { FormsModule } from '@angular/forms';
import { EventGridComponent } from './components/event-grid/event-grid.component';
import { AppInputDateComponent } from '@components/input-date.component';

@Component({
  selector: 'home-events',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DrawerModule,
    DrawerFormEvent,
    EventGridComponent,
  ],
  templateUrl: './home-events.component.html',
  standalone: true,
})
export class HomeEventsComponent {
  drawerForm = false;
  selectedEvent: EventModel | null = null;
  showForm = false;

  onSaved() {
    this.drawerForm = false;
  }
}
