import { Routes } from "@angular/router";
import { HomeEventsComponent } from "./pages/home/home-events.component";

export const eventRoutes: Routes = [
    {
      path: '',
      component: HomeEventsComponent,
    },
]