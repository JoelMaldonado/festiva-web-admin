import { Routes } from '@angular/router';
import { HomeEventsComponent } from './pages/home/home-events.component';
import { EventArtistsComponent } from './pages/artists/event-artists.component';

export const eventRoutes: Routes = [
  {
    path: '',
    component: HomeEventsComponent,
  },
  {
    path: ':idEvent/artists',
    component: EventArtistsComponent,
  },
];
