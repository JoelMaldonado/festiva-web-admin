import { Routes } from '@angular/router';
import { ClubCoversComponent } from './pages/covers/club-covers.component';
import { ClubLocationsComponent } from './pages/locations/club-locations.component';
import { DetailClubComponent } from './pages/detail-club/detail-club.component';
import { ListClubsComponent } from './pages/home/list-clubs.component';
import { ClubSchedulesComponent } from './pages/schedules/club-schedules.component';
import { ClubSocialNetworksComponent } from './pages/social-networks/club-social-networks.component';
import { ClubContactPhoneComponent } from './pages/contact-phone/contact-phone.component';
import { ClubContactEmailComponent } from './pages/contact-email/contact-email.component';

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
    path: ':idClub/covers',
    component: ClubCoversComponent,
  },
  {
    path: ':idClub/locations',
    component: ClubLocationsComponent,
  },
  {
    path: ':idClub/schedule',
    component: ClubSchedulesComponent,
  },
  {
    path: ':idClub/social-networks',
    component: ClubSocialNetworksComponent,
  },
  {
    path: ':idClub/emails',
    component: ClubContactEmailComponent,
  },
  {
    path: ':idClub/phones',
    component: ClubContactPhoneComponent,
  },
];
