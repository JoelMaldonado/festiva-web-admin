import { Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { EventsComponent } from './pages/events/events.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { HomePanelAdminComponent } from './pages/panel-admin/pages/home/home.component';
import { SocialNetworksComponent } from './pages/panel-admin/pages/social-networks/social-networks.component';
import { EventCategoriesComponent } from './pages/panel-admin/pages/event-categories/event-categories.component';
import { UserTypesComponent } from './pages/panel-admin/pages/user-types/user-types.component';
import { DetailArtistComponent } from './pages/detail-artist/detail-artist.component';
import { DetailClubComponent } from './pages/detail-club/detail-club.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { ListClubsComponent } from './pages/list-clubs/list-clubs.component';

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
        path: 'artists',
        component: ArtistsComponent,
      },
      {
        path: 'artists/:id',
        component: DetailArtistComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'events/:id',
        component: DetailEventComponent,
      },
      {
        path: 'clubs',
        component: ListClubsComponent,
      },
      {
        path: 'clubs/:id',
        component: DetailClubComponent,
        loadChildren: () =>
          import('./pages/detail-club/detail-club.routes').then(
            (m) => m.detailClubRoutes
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
