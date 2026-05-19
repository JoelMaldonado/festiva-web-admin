import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventScraper } from '@dto/event-scraper';
import { EventScraperRepository } from '@repository/event-scraper.repository';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

@Component({
  selector: 'home-event-scraper',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './home-event-scraper.component.html',
})
export class HomeEventScraperComponent implements OnInit {
  private readonly repo = inject(EventScraperRepository);

  list: EventScraper[] = [];
  loading = false;
  searchTerm = '';
  selectedSource = '';
  selectedStatus: StatusFilter = 'all';

  get sources(): string[] {
    return [...new Set(this.list.map((e) => e.source).filter(Boolean))].sort();
  }

  get filtered(): EventScraper[] {
    const search = this.searchTerm.toLowerCase().trim();
    return this.list.filter((e) => {
      const matchSearch = !search || e.title?.toLowerCase().includes(search) || e.venue?.toLowerCase().includes(search);
      const matchSource = !this.selectedSource || e.source === this.selectedSource;
      const matchStatus = this.selectedStatus === 'all' || e.status === this.selectedStatus;
      return matchSearch && matchSource && matchStatus;
    });
  }

  get hasActiveFilters(): boolean {
    return !!this.searchTerm || !!this.selectedSource || this.selectedStatus !== 'all';
  }

  get pendingCount(): number {
    return this.list.filter((e) => e.status === 'pending').length;
  }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    try {
      this.loading = true;
      this.list = await this.repo.fetchAll();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async approve(event: EventScraper) {
    const result = await Swal.fire({
      title: `¿Aprobar evento?`,
      text: `"${event.title}" será aprobado y publicado en Festiva.`,
      icon: 'question',
      background: '#222222',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await this.repo.approve(event.id);
        await this.load();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async reject(event: EventScraper) {
    const result = await Swal.fire({
      title: `¿Rechazar evento?`,
      text: `"${event.title}" no será publicado en Festiva.`,
      icon: 'warning',
      background: '#222222',
      color: '#ffffff',
      iconColor: '#DA1818',
      showCancelButton: true,
      confirmButtonColor: '#DA1818',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await this.repo.reject(event.id);
        await this.load();
      } catch (error) {
        console.error(error);
      }
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedSource = '';
    this.selectedStatus = 'all';
  }

  statusLabel(status: string): string {
    return { pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado' }[status] ?? status;
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date + 'T00:00:00').toLocaleDateString('es-NO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
