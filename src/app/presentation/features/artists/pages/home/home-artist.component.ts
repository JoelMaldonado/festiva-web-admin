import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artist } from '@dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormArtistComponent } from '../../components/drawer-form-artist.component';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'home-artist',
  imports: [
    FormsModule,
    DrawerModule,
    DrawerFormArtistComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './home-artist.component.html',
})
export class HomeArtistComponent implements OnInit {
  private readonly artistaRepo = inject(ArtistRepository);
  private readonly router = inject(Router);

  listArtists: Artist[] = [];
  artistSelected?: Artist;
  showForm = false;
  loading = false;

  searchTerm = '';
  selectedType = '';

  get filteredArtists(): Artist[] {
    const search = this.searchTerm.toLowerCase().trim();
    const type = this.selectedType;
    return this.listArtists.filter((a) => {
      const matchSearch = !search || a.name?.toLowerCase().includes(search);
      const matchType = !type || a.artistType === type;
      return matchSearch && matchType;
    });
  }

  get artistTypes(): string[] {
    return [...new Set(this.listArtists.map((a) => a.artistType).filter(Boolean))].sort();
  }

  get hasActiveFilters(): boolean {
    return !!this.searchTerm || !!this.selectedType;
  }

  ngOnInit(): void {
    this.getArtists();
  }

  toDetail(id: number) {
    this.router.navigate(['menu', 'artists', id]);
  }

  toSocialNetworks(id: number) {
    this.router.navigate(['menu', 'artists', id, 'social-networks']);
  }

  toTags(id: number) {
    this.router.navigate(['menu', 'artists', id, 'tags']);
  }

  async getArtists() {
    try {
      this.loading = true;
      this.listArtists = await this.artistaRepo.fetchAll();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  newArtist() {
    this.artistSelected = undefined;
    this.showForm = true;
  }

  editArtist(artist: Artist) {
    this.artistSelected = artist;
    this.showForm = true;
  }

  async deleteArtist(artist: Artist) {
    const result = await Swal.fire({
      title: `¿Eliminar a ${artist.name}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      background: '#222222',
      color: '#ffffff',
      iconColor: '#DA1818',
      showCancelButton: true,
      confirmButtonColor: '#DA1818',
      cancelButtonColor: '#313131',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await this.artistaRepo.delete(artist.id);
        await this.getArtists();
      } catch (error) {
        console.log(error);
      }
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedType = '';
  }
}
