import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'scraper-log-drawer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './scraper-log-drawer.component.html',
})
export class ScraperLogDrawerComponent {
  @Input() visible = false;
  @Input() mode: 'scrape' | 'promote' = 'scrape';
  @Input() logs: string[] = [];
  @Input() done = false;
  @Output() closeDrawer = new EventEmitter<void>();

  get title(): string {
    return this.mode === 'scrape' ? 'Scrapeando eventos' : 'Promoviendo a producción';
  }

  get subtitle(): string {
    return this.mode === 'scrape'
      ? 'Extrayendo eventos desde las fuentes configuradas'
      : 'Pasando eventos pendientes a la base de datos de producción';
  }
}
