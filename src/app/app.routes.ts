import { Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { EventsComponent } from './pages/events/events.component';
import { ClubsComponent } from './pages/clubs/clubs.component';

export const routes: Routes = [
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'clubs',
    component: ClubsComponent,
  },
];
