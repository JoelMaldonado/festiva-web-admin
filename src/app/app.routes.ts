import { Routes } from '@angular/router';
import { ArtistsComponent } from './presentation/pages/artists/artists.component';
import { EventsComponent } from './presentation/pages/events/events.component';
import { MenuComponent } from './presentation/pages/menu/menu.component';
import { PanelAdminComponent } from './presentation/pages/panel-admin/panel-admin.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { HomePanelAdminComponent } from './presentation/pages/panel-admin/pages/home/home.component';
import { SocialNetworksComponent } from './presentation/pages/panel-admin/pages/social-networks/social-networks.component';
import { EventCategoriesComponent } from './presentation/pages/panel-admin/pages/event-categories/event-categories.component';
import { UserTypesComponent } from './presentation/pages/panel-admin/pages/user-types/user-types.component';
import { DetailArtistComponent } from './presentation/pages/artists/pages/detail/detail-artist.component';
import { DetailClubComponent } from './presentation/pages/clubs/detail-club/detail-club.component';
import { DetailEventComponent } from './presentation/pages/detail-event/detail-event.component';
import { ListClubsComponent } from './presentation/pages/clubs/list-clubs/list-clubs.component';
import { ClubsComponents } from './presentation/pages/clubs/clubs.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'events/:id',
        component: DetailEventComponent,
      },
      {
        path: 'artists',
        component: ArtistsComponent,
        loadChildren: () =>
          import('./presentation/pages/artists/artists.routes').then(
            (m) => m.artistRoutes
          ),
      },
      {
        path: 'clubs',
        component: ClubsComponents,
        loadChildren: () =>
          import('./presentation/pages/clubs/clubs.routes').then(
            (m) => m.clubRoutes
          ),
      },
      {
        path: 'panel-admin',
        component: PanelAdminComponent,
        children: [
          {
            path: '',
            component: HomePanelAdminComponent,
          },
          {
            path: 'event-categories',
            component: EventCategoriesComponent,
          },
          {
            path: 'social-network',
            component: SocialNetworksComponent,
          },
          {
            path: 'user-types',
            component: UserTypesComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
