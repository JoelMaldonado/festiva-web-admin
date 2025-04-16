import { Component, inject } from '@angular/core';
import { CardComponent } from './components/card-event.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CardComponent],
  templateUrl: './events.component.html',
})
export class EventsComponent {
  router = inject(Router);

  nav(id: number) {
    this.router.navigate(['menu', 'events', id]);
  }
}
