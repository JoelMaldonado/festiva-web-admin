import { Routes } from '@angular/router';
import { ClubContactsComponent } from './pages/contacts/club-contacts.component';
import { ClubCoversComponent } from './pages/covers/club-covers.component';
import { ClubLocationsComponent } from './pages/locations/club-locations.component';
import { DetailClubComponent } from './pages/detail-club/detail-club.component';
import { ListClubsComponent } from './pages/home/list-clubs.component';

export const clubRoutes: Routes = [
  {
    path: '',
    component: ListClubsComponent,
  },
  {
    path: ':idClub',
    component: DetailClubComponent,
  },
  {
    path: 'contacts',
    component: ClubContactsComponent,
  },
  {
    path: ':idClub/covers',
    component: ClubCoversComponent,
  },
  {
    path: ':idClub/locations',
    component: ClubLocationsComponent,
  },
];
