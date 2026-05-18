import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '@dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormArtistComponent } from '../../components/drawer-form-artist.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-artist',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DrawerModule,
    DrawerFormArtistComponent,
  ],
  templateUrl: './detail-artist.component.html',
})
export class DetailArtistComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly artistRepo = inject(ArtistRepository);

  @Input() id!: string;

  artist?: Artist;
  showEditForm = false;
  loading = true;

  get artistTags(): string[] {
    if (!this.artist?.tags) return [];
    return this.artist.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }

  ngOnInit(): void {
    if (isNaN(Number(this.id))) {
      this.router.navigate(['menu', 'artists']);
      return;
    }
    this.getArtist();
  }

  async getArtist() {
    try {
      this.loading = true;
      this.artist = await this.artistRepo.getById(Number(this.id));
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  toSocialNetworks() {
    this.router.navigate(['menu', 'artists', this.id, 'social-networks']);
  }

  toTags() {
    this.router.navigate(['menu', 'artists', this.id, 'tags']);
  }

  goBack() {
    this.router.navigate(['menu', 'artists']);
  }

  async deleteArtist() {
    if (!this.artist) return;

    const result = await Swal.fire({
      title: `¿Eliminar a ${this.artist.name}?`,
      text: 'Esta acción no se puede deshacer. Se eliminará toda la información del artista.',
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
        await this.artistRepo.delete(this.artist.id);
        this.router.navigate(['menu', 'artists']);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
