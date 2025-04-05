import { Component } from '@angular/core';
import { CardComponent } from "./components/card-event.component";

@Component({
  selector: 'app-events',
  imports: [CardComponent],
  templateUrl: './events.component.html',
})
export class EventsComponent {

}
