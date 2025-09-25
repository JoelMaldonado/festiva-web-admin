import { Routes } from '@angular/router';
import { AppEventsComponent } from '../events-dashboard/events-dashboard.component';
import { EventArtistsComponent } from './pages/artists/event-artists.component';
import { EventCategoriesComponent } from '../event-categories/event-categories.component';
import { EventScheduleComponent } from '../event-schedule/event-schedule.component';
import { EventFormComponent } from '../event-form/event-form.component';

export const eventRoutes: Routes = [
  {
    path: '',
    component: AppEventsComponent,
  },
  {
    path: 'new',
    component: EventFormComponent,
  },
  {
    path: ':idEvent/edit',
    component: EventFormComponent,
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
    component: EventCategoriesComponent,
  },
];
