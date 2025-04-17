import { Routes } from '@angular/router';
import { HomePanelAdminComponent } from './pages/home/home-panel-admin.component';
import { UserTypesComponent } from './pages/user-types/user-types.component';
import { EventCategoriesComponent } from './pages/event-categories/event-categories.component';
import { SocialNetworksComponent } from './pages/social-networks/social-networks.component';
import { ArtistTypesComponent } from './pages/artist-types/artist-types.component';
import { TrashComponent } from './pages/trash/trash.component';

export const panelAdminRoutes: Routes = [
  {
    path: '',
    component: HomePanelAdminComponent,
  },
  {
    path: 'user-types',
    component: UserTypesComponent,
  },
  {
    path: 'event-categories',
    component: EventCategoriesComponent,
  },
  {
    path: 'artist-types',
    component: ArtistTypesComponent,
  },
  {
    path: 'social-networks',
    component: SocialNetworksComponent,
  },
  {
    path: 'trash',
    component: TrashComponent,
  },
];
