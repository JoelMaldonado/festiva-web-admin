import { Routes } from '@angular/router';
import { HomeArtistComponent } from './pages/home/home-artist.component';
import { DetailArtistComponent } from './pages/detail/detail-artist.component';
import { ArtistSocialNetworks } from './pages/social-networks/artist-social-networks.component';
import { ArtistTagComponent } from './pages/tag/artist-tag.component';

export const artistRoutes: Routes = [
  {
    path: '',
    component: HomeArtistComponent,
  },
  {
    path: ':id',
    component: DetailArtistComponent,
  },
  {
    path: ':idArtist/social-networks',
    component: ArtistSocialNetworks,
  },
  {
    path: ':idArtist/tags',
    component: ArtistTagComponent,
  },
];
