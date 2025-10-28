import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventClubComponent } from './components/club.component';
import { FestInputComponent } from '@components/fest-input.component';
import { EventCategoriesComponent } from './components/categories.component';
import { EventScheduleComponent } from './components/schedule.component';
import { EventUploadImageComponent } from './components/upload-image.component';
import { EventArtistsComponent } from './components/artists.component';
import { EventHeaderComponent } from './components/header.component';
import { EventPreviewComponent } from './components/preview.component';
import { FestTextAreaComponent } from "@components/fest-text-area.component";

@Component({
  standalone: true,
  selector: 'app-event-form',
  imports: [
    CommonModule,
    FormsModule,
    FestInputComponent,
    EventScheduleComponent,
    EventUploadImageComponent,
    EventArtistsComponent,
    EventHeaderComponent,
    EventPreviewComponent,
    EventClubComponent,
    EventCategoriesComponent,
    FestTextAreaComponent
],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  title = '';
  description = '';
}
