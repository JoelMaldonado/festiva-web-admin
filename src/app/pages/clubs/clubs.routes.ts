import { Routes } from '@angular/router';
import { ClubContactsComponent } from './club-contacts/club-contacts.component';
import { ClubCoversComponent } from './club-covers/club-covers.component';
import { ClubLocationsComponent } from './club-locations/club-locations.component';
import { FormClubLocationComponet } from './form-club-location/form-club-location.component';
import { DetailClubComponent } from './detail-club/detail-club.component';

export const clubRoutes: Routes = [
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
    path: 'locations',
    component: ClubLocationsComponent,
  },
  {
    path: 'locations/:id',
    component: FormClubLocationComponet,
  },
];
