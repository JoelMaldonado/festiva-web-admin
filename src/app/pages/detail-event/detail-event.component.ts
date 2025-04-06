import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-event',
  imports: [],
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css',
})
export class DetailEventComponent {
  @Input() id!: string;
}
