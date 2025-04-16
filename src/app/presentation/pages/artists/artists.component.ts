import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardArtistComponent } from './components/card-artist.component';
import { Artist } from 'app/data/dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormArtistComponent } from './components/drawer-form-artist.component';

@Component({
  selector: 'app-artists',
  imports: [
    CommonModule,
    ButtonModule,
    CardArtistComponent,
    DrawerModule,
    DrawerFormArtistComponent,
  ],
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {
  artistaRepo = inject(ArtistRepository);
  artistTypeRepo = inject(ArtistTypeRepository);

  listArtists: Artist[] = [];

  showForm = false;

  ngOnInit(): void {
    this.getArtists();
  }

  async getArtists() {
    try {
      this.listArtists = await this.artistaRepo.fetchAll();
    } catch (error) {
      console.log(error);
    }
  }
}
