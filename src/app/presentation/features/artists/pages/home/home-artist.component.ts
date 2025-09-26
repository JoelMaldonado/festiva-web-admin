import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Artist } from '@dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { ButtonModule } from 'primeng/button';
import { CardArtistComponent } from '../../components/card-artist.component';
import { DrawerModule } from 'primeng/drawer';
import { DrawerFormArtistComponent } from '../../components/drawer-form-artist.component';
import { Router } from '@angular/router';
import { MapComponent } from "@components/map.component";
import { FestFabButtonComponent } from "@components/fest-fab-button.component";

@Component({
  selector: 'home-artist',
  imports: [
    CommonModule,
    ButtonModule,
    CardArtistComponent,
    DrawerModule,
    DrawerFormArtistComponent,
    MapComponent,
],
  templateUrl: './home-artist.component.html',
})
export class HomeArtistComponent implements OnInit {
  private readonly artistaRepo = inject(ArtistRepository);
  private readonly router = inject(Router);

  listArtists: Artist[] = [];

  artistSelected?: Artist;
  showForm = false;

  ngOnInit(): void {
    this.getArtists();
  }

  toDetail(id: number) {
    this.router.navigate(['menu', 'artists', id]);
  }

  async deleteArtist(id: number) {
    try {
      await this.artistaRepo.delete(id);
      this.getArtists();
    } catch (error) {
      console.log(error);
    }
  }

  async toSocialNetworks(id: number) {
    this.router.navigate(['menu', 'artists', id, 'social-networks']);
  }

  async toTags(id: number) {
    this.router.navigate(['menu', 'artists', id, 'tags']);
  }

  async getArtists() {
    try {
      this.listArtists = await this.artistaRepo.fetchAll();
    } catch (error) {
      console.log(error);
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
}
