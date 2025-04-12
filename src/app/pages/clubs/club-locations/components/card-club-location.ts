import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ClubLocation } from '../../../../interfaces/club-location';
import Swal from 'sweetalert2';
import { ClubLocationService } from '../../../../services/club-location.service';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'card-club-location',
  imports: [ButtonModule],
  template: `
    <div class="overflow-hidden shadow-md bg-b2 rounded-2xl">
      <!-- Mapa embebido arriba -->
      <div [id]="getIdMap()" style="width: 100%; height: 192px;"></div>

      <!-- Cuerpo del card -->
      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-primary">
          {{ clubLocation.address }}
        </h3>

        <!-- Acciones -->
        <div class="flex justify-end gap-2 mt-4">
          <p-button
            icon="pi pi-pencil"
            label="Editar"
            [text]="true"
            severity="info"
            (click)="onEdit()"
          />
          <p-button
            icon="pi pi-trash"
            label="Eliminar"
            [text]="true"
            severity="warn"
            (click)="onDelete()"
          />
        </div>
      </div>
    </div>
  `,
})
export class CardClubLocation implements AfterViewInit, OnDestroy {
  @Input({ required: true }) clubLocation!: ClubLocation;
  @Output() onDeleted = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  map!: mapboxgl.Map;

  getIdMap(): string {
    return `map-${this.clubLocation.id}`;
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: this.getIdMap(),
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [this.clubLocation.longitude, this.clubLocation.latitude],
      zoom: 15,
    });
    new mapboxgl.Marker()
      .setLngLat([this.clubLocation.longitude, this.clubLocation.latitude])
      .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  sanitizer = inject(DomSanitizer);
  clubLocationService = inject(ClubLocationService);

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClubLocation();
      }
    });
  }

  deleteClubLocation() {
    this.clubLocationService.deleteById(this.clubLocation.id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.onDeleted.emit();
          Swal.fire('Eliminado', 'La ubicación ha sido eliminada', 'success');
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error', error, 'error');
      },
    });
  }
}
