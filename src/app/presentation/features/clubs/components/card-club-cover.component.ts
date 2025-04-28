import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'card-club-cover',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: ` <div
    class="relative overflow-hidden transition-shadow duration-300 bg-gray-900 shadow-lg rounded-2xl group hover:shadow-2xl"
  >
    <img
      [src]="imageUrl"
      alt="Foto discoteca"
      class="object-cover w-full h-60 group-hover:opacity-70 select-none"
    />

    <div
      class="absolute px-3 py-1 text-xs transition-opacity duration-200 opacity-0 top-2 right-2 group-hover:opacity-100"
    >
      <button mat-mini-fab color="warn" (click)="showAlert()">
        <mat-icon>delete</mat-icon>
      </button>
    </div>
  </div>`,
  standalone: true,
})
export class CardClubCoverComponent {
  @Input() imageUrl?: string;
  @Output() onDeleted: EventEmitter<void> = new EventEmitter();

  showAlert() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar la imagen después de eliminarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleted.emit();
      }
    });
  }
}
