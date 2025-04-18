import { Routes } from '@angular/router';
import { ArtistsComponent } from './presentation/features/artists/artists.component';
import { EventsComponent } from './presentation/features/events/events.component';
import { MenuComponent } from './presentation/features/menu/menu.component';
import { PanelAdminComponent } from './presentation/features/panel-admin/panel-admin.component';
import { LoginComponent } from './presentation/features/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { HomePanelAdminComponent } from './presentation/features/panel-admin/pages/home/home-panel-admin.component';
import { SocialNetworksComponent } from './presentation/features/panel-admin/pages/social-networks/social-networks.component';
import { EventCategoriesComponent } from './presentation/features/panel-admin/pages/event-categories/event-categories.component';
import { UserTypesComponent } from './presentation/features/panel-admin/pages/user-types/user-types.component';
import { DetailArtistComponent } from './presentation/features/artists/pages/detail/detail-artist.component';
import { DetailClubComponent } from './presentation/features/clubs/pages/detail-club/detail-club.component';
import { DetailEventComponent } from './presentation/features/detail-event/detail-event.component';
import { ListClubsComponent } from './presentation/features/clubs/pages/home/list-clubs.component';
import { ClubsComponents } from './presentation/features/clubs/clubs.component';

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
          import('./presentation/features/artists/artists.routes').then(
            (m) => m.artistRoutes
          ),
      },
      {
        path: 'clubs',
        component: ClubsComponents,
        loadChildren: () =>
          import('./presentation/features/clubs/clubs.routes').then(
            (m) => m.clubRoutes
          ),
      },
      {
        path: 'panel-admin',
        component: PanelAdminComponent,
        loadChildren: () =>
          import('./presentation/features/panel-admin/panel-admin.routes').then(
            (m) => m.panelAdminRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
