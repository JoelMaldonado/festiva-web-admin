import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtistType } from '@model/artist-type';
import { CommonRepository } from '@repository/common.repository';
import { StatusEnum } from 'app/data/enum/status-enum';
import { DrawerModule } from 'primeng/drawer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artist-types',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DrawerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './artist-types.component.html',
})
export class ArtistTypesComponent implements OnInit {
  private readonly repo = inject(CommonRepository);

  list: ArtistType[] = [];
  artistSelected: ArtistType | null = null;
  showForm = false;
  name = new FormControl('');
  isLoadingSave = false;
  isLoadingTable = false;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    try {
      this.isLoadingTable = true;
      this.list = await this.repo.fetchAllArtistTypes(StatusEnum.all);
    } catch (error) {
      console.error('Error fetching artist types:', error);
    } finally {
      this.isLoadingTable = false;
    }
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

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name.value) return;
    try {
      this.isLoadingSave = true;
      if (this.artistSelected) {
        await this.repo.updateArtistType(this.artistSelected.id, this.name.value);
      } else {
        await this.repo.createArtistType(this.name.value);
      }
      this.showForm = false;
      this.artistSelected = null;
      this.name.reset();
      await this.getAll();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Guardado correctamente', showConfirmButton: false, timer: 2000, background: '#222222', color: '#ffffff' });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el tipo de artista.', background: '#222222', color: '#ffffff' });
    } finally {
      this.isLoadingSave = false;
    }
  }

  async deleteItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Eliminar tipo de artista?',
      text: 'Esta acción lo marcará como inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#222222',
      color: '#ffffff',
    });
    if (result.isConfirmed) {
      try {
        await this.repo.deleteArtistType(id);
        await this.getAll();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async restoreItem(_event: Event, id: number) {
    const result = await Swal.fire({
      title: '¿Restaurar tipo de artista?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar',
      background: '#222222',
      color: '#ffffff',
    });
    if (result.isConfirmed) {
      try {
        await this.repo.restoreArtistType(id);
        await this.getAll();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
