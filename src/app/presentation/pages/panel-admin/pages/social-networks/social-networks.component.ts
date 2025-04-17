import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppTopComponent } from '@components/app-top.component';
import { ArtistType } from '@model/artist-type';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-social-networks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppTopComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ButtonModule,
    TableModule,
    TagModule,
    DrawerModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './social-networks.component.html',
  providers: [ConfirmationService, MessageService],
})
export class SocialNetworksComponent implements OnInit {
  private readonly repo = inject(CommonRepository);
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
        await this.repo.updateArtistType(
          this.artistSelected.id,
          this.name.value
        );
      } else {
        await this.repo.createArtistType(this.name.value);
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
      this.list = await this.repo.fetchAllArtistTypes(StatusEnum.all);
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
          await this.repo.deleteArtistType(id);
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
          await this.repo.restoreArtistType(id);
          await this.getAll();
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
}
