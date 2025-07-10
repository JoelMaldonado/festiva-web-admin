import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { DrawerFormEvent } from './components/drawer-form-event/drawer-form-event.component';
import { Router } from '@angular/router';
import { EventService } from '@services/event.service';
import { EventModel } from '@model/event';

@Component({
  selector: 'home-events',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DrawerModule,
    DrawerFormEvent,
  ],
  templateUrl: './home-events.component.html',
  standalone: true,
})
export class HomeEventsComponent implements OnInit {
  private readonly eventService = inject(EventService);
  private readonly router = inject(Router);

  listEvents: EventModel[] = [];
  drawerForm = false;
  selectedEvent: Event | null = null;
  showForm = false;
  isLoadingTable = true;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.isLoadingTable = true;
    this.eventService.fetchAll().subscribe({
      next: (res) => {
        this.listEvents = res.data || [];
      },
      error: (err) => console.error(err),
      complete: () => (this.isLoadingTable = false),
    });
  }

  onSaved() {
    this.drawerForm = false;
    this.getAll();
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'events', id, path]);
  }
}
