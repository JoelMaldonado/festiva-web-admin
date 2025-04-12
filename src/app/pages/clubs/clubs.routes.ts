import { Routes } from '@angular/router';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
import { ClubCoversComponent } from './club-covers/club-covers.component';
import { ClubLocationsComponent } from './club-locations/club-locations.component';
import { DetailClubComponent } from './detail-club/detail-club.component';
import { ListClubsComponent } from './list-clubs/list-clubs.component';

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
    path: 'covers',
    component: ClubCoversComponent,
  },
  {
    path: ':idClub/locations',
    component: ClubLocationsComponent,
  },
];
