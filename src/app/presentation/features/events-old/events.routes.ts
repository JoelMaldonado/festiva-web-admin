import { Routes } from '@angular/router';
import { AppEventsComponent } from '../events-dashboard/events-dashboard.component';
import { EventArtistsComponent } from './pages/artists/event-artists.component';
import { EventScheduleComponent } from './pages/event-schedule/event-schedule.component';
import { EventsCategoriesComponent } from '../events-categories/events-categories.component';

export const eventRoutes: Routes = [
  {
    path: '',
    component: AppEventsComponent,
  },
  {
    path: ':idEvent/artists',
    component: EventArtistsComponent,
  },
  {
    path: ':idEvent/schedule',
    component: EventScheduleComponent,
  },
  {
    path: ':idEvent/categories',
    component: EventsCategoriesComponent,
  },
];
