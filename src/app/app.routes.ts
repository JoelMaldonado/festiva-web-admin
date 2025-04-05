import { Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { EventsComponent } from './pages/events/events.component';
import { ClubsComponent } from './pages/clubs/clubs.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';

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
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'clubs',
        component: ClubsComponent,
      },
      {
        path: 'panel-admin',
        component: PanelAdminComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
