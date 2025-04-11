import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ClubLocation } from '../../../../../interfaces/club-location';
import Swal from 'sweetalert2';
import { ClubLocationService } from '../../../../../services/club-location.service';

@Component({
  selector: 'card-club-location',
  imports: [ButtonModule],
  template: `
    <div class="overflow-hidden shadow-md bg-b1 rounded-2xl">
      <!-- Mapa embebido arriba -->
      <iframe
        class="w-full h-48"
        [src]="getMapUrl(clubLocation.latitude, clubLocation.longitude)"
        frameborder="0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>

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
export class CardClubLocation {
  @Input({ required: true }) clubLocation!: ClubLocation;
  @Output() onDeleted = new EventEmitter<void>();

  sanitizer = inject(DomSanitizer);
  clubLocationService = inject(ClubLocationService);

  getMapUrl(lat: number, lng: number): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
