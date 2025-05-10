import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Event } from '@model/event';
import { EventRepository } from '@repository/event.repository';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TableModule } from 'primeng/table';
import { delay } from 'rxjs';
import { DrawerFormEvent } from './components/drawer-form-event/drawer-form-event.component';
import { Router } from '@angular/router';

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
  private readonly repo = inject(EventRepository);
  private readonly router = inject(Router);

  listEvents: Event[] = [];
  drawerForm = false;
  selectedEvent: Event | null = null;
  showForm = false;
  isLoadingTable = true;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.isLoadingTable = true;
    this.repo
      .fetchAll()
      .pipe(delay(1000))
      .subscribe({
        next: (res) => (this.listEvents = res),
        error: (err) => console.error(err),
        complete: () => (this.isLoadingTable = false),
      });
  }

  toPath(id: number, path: string) {
    this.router.navigate(['menu', 'events', id, path]);
  }
}
