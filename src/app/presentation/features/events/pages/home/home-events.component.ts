import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Table, TableModule } from 'primeng/table';
import { DrawerFormEvent } from './components/drawer-form-event/drawer-form-event.component';
import { Router } from '@angular/router';
import { EventService } from '@services/event.service';
import { EventModel } from '@model/event';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@components/input.component';
import { EventCardComponent } from '@components/event-card.component';
import { EventGridComponent } from "./components/event-grid/event-grid.component";

@Component({
  selector: 'home-events',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DrawerModule,
    DrawerFormEvent,
    InputComponent,
    EventGridComponent
],
  templateUrl: './home-events.component.html',
  standalone: true,
})
export class HomeEventsComponent {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  listEvents: EventModel[] = [];
  drawerForm = false;
  selectedEvent: EventModel | null = null;
  showForm = false;
  isLoadingTable = true;

  onSaved() {
    this.drawerForm = false;
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'events', id, path]);
  }

  @ViewChild('table') table!: Table;

  searchTerm = '';

  onSearch(term: string) {
    this.searchTerm = term ?? '';
    // filtra solo por title gracias a [globalFilterFields]="['title']"
    this.table.filterGlobal(this.searchTerm, 'contains');
  }
}
