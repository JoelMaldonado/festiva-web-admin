import { Routes } from '@angular/router';
import { HomeArtistComponent } from './pages/home/home-artist.component';
import { DetailArtistComponent } from './pages/detail/detail-artist.component';

export const artistRoutes: Routes = [
  {
    path: '',
    component: HomeArtistComponent,
  },
  {
    path: ':id',
    component: DetailArtistComponent,
  },
];
