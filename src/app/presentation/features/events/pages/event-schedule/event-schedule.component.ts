import { Component, inject, Input, OnInit } from '@angular/core';
import { EventScheduleService } from '@services/event-schedule.service';
import { AppTopComponent } from '@components/app-top.component';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppInputDateComponent } from '@components/input-date.component';
import { CommonModule } from '@angular/common';
import { InputTimeComponent } from '@components/input-time.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-event-schedule',
  imports: [
    CommonModule,
    AppTopComponent,
    Button,
    TableModule,
    AppInputDateComponent,
    InputTimeComponent,
  ],
  templateUrl: './event-schedule.component.html',
})
export class EventScheduleComponent implements OnInit {
  private readonly eventScheduleService = inject(EventScheduleService);

  @Input() idEvent?: string;

  minDate = new Date();

  listEventSchedule: any[] = [];
  isLoading = false;
  isLoadingSaving = false;

  eventDate: Date | null = null;
  startTime: Date | null = null;

  ngOnInit() {
    if (!this.idEvent) {
      alert('Invalid event ID');
      return;
    }
    this.loadEventSchedule();
  }

  loadEventSchedule() {
    if (!this.idEvent) return;
    this.isLoading = true;
    this.eventScheduleService.fetchEventSchedule(this.idEvent).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.listEventSchedule = res.data;
        } else {
          console.log(res.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  save() {
    if (!this.eventDate || !this.startTime) {
      alert('Please select both event date and start time');
      return;
    }

    this.isLoadingSaving = true;

    const body = {
      eventId: this.idEvent,
      eventDate: format(this.eventDate, 'yyyy-MM-dd'),
      startTime: format(this.startTime, 'HH:mm'),
    };

    this.eventScheduleService.save(body).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.loadEventSchedule();
          this.eventDate = null;
          this.startTime = null;
        } else {
          console.log(res.message);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoadingSaving = false;
      },
    });
  }
}
