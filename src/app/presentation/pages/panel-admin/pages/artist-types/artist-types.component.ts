import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtistType } from '@model/artist-type';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AppTopComponent } from '../../../../components/app-top.component';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-artist-types',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ConfirmDialogModule,
    AppTopComponent,
    DrawerModule,
    ToastModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
  ],
  templateUrl: './artist-types.component.html',
  providers: [ConfirmationService, MessageService],
})
export class ArtistTypesComponent implements OnInit {
  private readonly repo = inject(ArtistTypeRepository);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  list: ArtistType[] = [];

  artistSelected: ArtistType | null = null;
  showForm = false;

  name = new FormControl('');

  ngOnInit(): void {
    this.getAll();
  }

  showFormNew() {
    this.artistSelected = null;
    this.name.reset();
    this.showForm = true;
  }

  showFormEdit(artist: ArtistType) {
    this.artistSelected = artist;
    this.name.setValue(artist.name);
    this.showForm = true;
  }

  isLoadingSave = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre es requerido.',
      });
      return;
    }
    try {
      this.isLoadingSave = true;
      if (this.artistSelected) {
        await this.repo.update(this.artistSelected.id, this.name.value);
      } else {
        await this.repo.create(this.name.value);
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Artista guardado correctamente.',
      });
      this.showForm = false;
      this.artistSelected = null;
      this.name.reset();
      await this.getAll();
    } catch (err) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al guardar el artista.',
      });
    } finally {
      this.isLoadingSave = false;
    }
  }

  async getAll() {
    try {
      this.list = await this.repo.fetchAll(StatusEnum.all);
    } catch (error) {
      console.error('Error fetching artist types:', error);
    }
  }

  async deleteItem(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro que deseas eliminar esta categoría?.',
      header: 'Eliminar',
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
      accept: async () => {
        try {
          await this.repo.delete(id);
          await this.getAll();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  async restoreItem(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro que deseas restaurar esta categoría?',
      header: 'Restaurar',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Restaurar',
        severity: 'success',
      },
      accept: async () => {
        try {
          await this.repo.restore(id);
          await this.getAll();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
}
