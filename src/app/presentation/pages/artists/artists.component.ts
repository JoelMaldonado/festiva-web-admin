import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardArtistComponent } from './components/card-artist.component';
import { Artist } from '@interfaces/artist';
import { ArtistRepository } from '@repository/artist.repository';

@Component({
  selector: 'app-artists',
  imports: [ButtonModule, CardArtistComponent],
  templateUrl: './artists.component.html',
})
export class ArtistsComponent implements OnInit {
  artistaRepo = inject(ArtistRepository);

  listArtists: Artist[] = [];

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
