import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'card-artist',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    ConfirmDialogModule,
  ],
  template: `
    <div>
      <p-confirmdialog />
      <div
        class="w-full h-full p-6 overflow-hidden shadow-xl bg-b1 rounded-2xl select-none relative"
      >
        <div class="absolute top-2 right-2 z-10">
          <button mat-icon-button matTooltip="More" [matMenuTriggerFor]="menu">
            <mat-icon class="text-t1">more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="toEdit.emit()">
              <mat-icon>edit</mat-icon>
              <span>Editar</span>
            </button>

            <button mat-menu-item (click)="toDetail.emit()">
              <mat-icon>visibility</mat-icon>
              <span>Ver detalle</span>
            </button>

            <button mat-menu-item (click)="toSocialNetworks.emit()">
              <mat-icon>share</mat-icon>
              <span>Social Networks</span>
            </button>

            <button mat-menu-item (click)="toTags.emit()">
              <mat-icon>tag</mat-icon>
              <span>Etiquetas</span>
            </button>

            <button mat-menu-item (click)="onDelete($event)">
              <mat-icon color="warn">delete</mat-icon>
              <span>Eliminar</span>
            </button>
          </mat-menu>
        </div>

        <div class="flex flex-col items-center text-center">
          <img
            [src]="fotoUrl"
            [alt]="name"
            class="w-28 h-28 object-cover mb-4 border-4 border-pink-500 rounded-full block"
          />
          <h3 class="text-lg font-bold text-white">{{ name }}</h3>
          <p class="mb-2 text-sm text-gray-400">Cantante / Actriz</p>
          <p class="mb-1 text-sm text-gray-300 line-clamp-3">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  `,
  providers: [ConfirmationService],
})
export class CardArtistComponent {
  @Input({ required: true }) name!: string;
  @Input() fotoUrl?: string;
  @Input() description?: string;

  @Output() toEdit = new EventEmitter<void>();
  @Output() toDelete = new EventEmitter<void>();
  @Output() toDetail = new EventEmitter<void>();
  @Output() toSocialNetworks = new EventEmitter<void>();
  @Output() toTags = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        '¿Estás seguro de que deseas eliminar este artista? Esta acción no se puede deshacer.',
      header: 'Zona de peligro',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },
      accept: () => this.toDelete.emit(),
    });
  }
}
