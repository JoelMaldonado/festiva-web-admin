import { Routes } from '@angular/router';
import { UserTypesComponent } from './pages/user-types/user-types.component';
import { EventCategoriesComponent } from './pages/event-categories/event-categories.component';
import { SocialNetworksComponent } from './pages/social-networks/social-networks.component';
import { ArtistTypesComponent } from './pages/artist-types/artist-types.component';
import { TrashComponent } from './pages/trash/trash.component';
import { DynamicQrComponent } from './pages/dynamic-qr/dynamic-qr.component';

export const panelAdminRoutes: Routes = [
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
  {
    path: 'dynamic-qr',
    component: DynamicQrComponent,
  },
];
