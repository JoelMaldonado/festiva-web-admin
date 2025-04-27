import { Routes } from '@angular/router';
import { ArtistsComponent } from './presentation/features/artists/artists.component';
import { MenuComponent } from './presentation/features/menu/menu.component';
import { PanelAdminComponent } from './presentation/features/panel-admin/panel-admin.component';
import { LoginComponent } from './presentation/features/login/login.component';
import { authGuard } from './core/guard/auth.guard';
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
        loadChildren: () =>
          import('./presentation/features/events/events.routes').then(
            (m) => m.eventRoutes
          ),
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
