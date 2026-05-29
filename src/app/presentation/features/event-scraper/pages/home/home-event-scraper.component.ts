import { Component, inject, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScraperLogDrawerComponent } from './components/scraper-log-drawer.component';
import { EventScraperRepository } from '@repository/event-scraper.repository';
import { EventScraper } from 'app/data/dto/event-scraper';
import { ScraperService } from '@services/scraper.service';
import Swal from 'sweetalert2';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';


@Component({
  selector: 'home-event-scraper',
  standalone: true,
  imports: [FormsModule, SlicePipe, MatIconModule, MatTooltipModule, ScraperLogDrawerComponent],
  templateUrl: './home-event-scraper.component.html',
})
export class HomeEventScraperComponent implements OnInit {
  private readonly repo = inject(EventScraperRepository);
  private readonly scraperService = inject(ScraperService);
  private readonly zone = inject(NgZone);

  list: EventScraper[] = [];
  loading = false;
  searchTerm = '';
  selectedStatus: StatusFilter = 'all';

  drawerVisible = false;
  drawerMode: 'scrape' | 'promote' = 'scrape';
  drawerLogs: string[] = [];
  drawerDone = false;

  async ngOnInit() {
    await this.loadEvents();
  }

  async loadEvents() {
    this.loading = true;
    try {
      this.list = await this.repo.fetchAll();
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los eventos.',
        icon: 'error',
        background: '#222222',
        color: '#ffffff',
      });
    } finally {
      this.loading = false;
    }
  }

  get filtered(): EventScraper[] {
    const search = this.searchTerm.toLowerCase().trim();
    return this.list.filter((e) => {
      const matchSearch = !search || e.title.toLowerCase().includes(search);
      const matchStatus = this.selectedStatus === 'all' || e.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  get hasActiveFilters(): boolean {
    return !!this.searchTerm || this.selectedStatus !== 'all';
  }

  get pendingCount(): number {
    return this.list.filter((e) => e.status === 'pending').length;
  }

  get approvedCount(): number {
    return this.list.filter((e) => e.status === 'approved').length;
  }

  get rejectedCount(): number {
    return this.list.filter((e) => e.status === 'rejected').length;
  }

  async openScraper() {
    const result = await Swal.fire({
      title: '¿Iniciar scraping?',
      text: 'Se extraerán eventos desde todos los clubes configurados y se guardarán en la tabla de eventos scrapeados.',
      icon: 'question',
      background: '#222222',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#FF4081',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, scrapear',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;
    await this.runScript('scrape');
  }

  async openPromote() {
    const result = await Swal.fire({
      title: '¿Pasar a producción?',
      text: `Se promoverán ${this.pendingCount} evento${this.pendingCount !== 1 ? 's' : ''} pendiente${this.pendingCount !== 1 ? 's' : ''} a la base de datos de producción.`,
      icon: 'warning',
      background: '#222222',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#FF4081',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, promover',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;
    await this.runScript('promote');
  }

  private async runScript(script: 'scrape' | 'promote') {
    this.drawerMode = script;
    this.drawerLogs = [];
    this.drawerDone = false;
    this.drawerVisible = true;

    try {
      const jobId = await this.scraperService.run(script);
      const es = this.scraperService.stream(jobId);

      es.onmessage = (event) => {
        this.zone.run(() => {
          this.drawerLogs = [...this.drawerLogs, event.data];
          if (event.data === '[DONE]') {
            this.drawerDone = true;
            es.close();
            if (script === 'scrape') this.loadEvents();
          }
        });
      };

      es.onerror = () => {
        this.zone.run(() => {
          this.drawerLogs = [...this.drawerLogs, '[ERROR] Se perdió la conexión con el servidor'];
          this.drawerDone = true;
          es.close();
        });
      };
    } catch {
      this.drawerLogs = ['[ERROR] No se pudo iniciar el proceso'];
      this.drawerDone = true;
    }
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  async deleteEvent(event: EventScraper) {
    const result = await Swal.fire({
      title: '¿Eliminar evento?',
      text: `"${event.title}" será eliminado permanentemente.`,
      icon: 'warning',
      background: '#222222',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#FF4081',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await this.repo.remove(event.id);
      this.list = this.list.filter((e) => e.id !== event.id);
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el evento.',
        icon: 'error',
        background: '#222222',
        color: '#ffffff',
      });
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = 'all';
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date + 'T00:00:00').toLocaleDateString('es-NO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  formatScrapedAt(ts: string | null): string {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString('es-NO', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
