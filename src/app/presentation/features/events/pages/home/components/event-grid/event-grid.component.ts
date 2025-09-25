import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from '@components/event-card.component';
import { EventService } from '@services/event.service';

@Component({
  selector: 'event-grid',
  templateUrl: `./event-grid.component.html`,
  imports: [EventCardComponent],
})
export class EventGridComponent implements OnInit {
  private readonly eventService = inject(EventService);

  listEvents: any[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.eventService.fetchAllPaged(1, 10).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.listEvents = res.data.items;
        }
      },
      error: (err) => console.error(err),
    });
  }
}
