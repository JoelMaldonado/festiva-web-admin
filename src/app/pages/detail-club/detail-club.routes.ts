import { Routes } from '@angular/router';
import { ClubContactsComponent } from './pages/club-contacts/club-contacts.component';
import { ClubLocationComponent } from '../list-clubs/components/club-location/club-location.component';
import { ClubCoversComponent } from './pages/club-covers/club-covers.component';
import { DetailClubHomeComponent } from './pages/club-home/detail-club-home.component';
import { ClubLocationsComponent } from './pages/club-locations/club-locations.component';

export const detailClubRoutes: Routes = [
  {
    path: '',
    component: DetailClubHomeComponent,
  },
  {
    path: 'contacts',
    component: ClubContactsComponent,
  },
  {
    path: 'covers',
    component: ClubCoversComponent,
  },
  {
    path: 'locations',
    component: ClubLocationsComponent,
  },
];
