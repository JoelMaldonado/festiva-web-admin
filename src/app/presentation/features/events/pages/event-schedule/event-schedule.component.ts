import { Component, inject, Input, OnInit } from '@angular/core';
import { EventScheduleService } from '@services/event-schedule.service';
import { AppTopComponent } from '@components/app-top.component';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppInputDateComponent } from '@components/input-date.component';
import { CommonModule } from '@angular/common';
import { InputTimeComponent } from '@components/input-time.component';
import { format, isValid, parse } from 'date-fns';
import { EventInfoCardComponent } from "../../components/event-info-card.component";

@Component({
  selector: 'app-event-schedule',
  imports: [
    CommonModule,
    AppTopComponent,
    Button,
    TableModule,
    AppInputDateComponent,
    InputTimeComponent,
    EventInfoCardComponent
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
  startTime = '19:00';

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
      eventDate: this.formatTime(this.eventDate, 'yyyy-MM-dd'),
      startTime: this.formatTime(this.startTime, 'HH:mm'),
    };

    this.eventScheduleService.save(body).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.loadEventSchedule();
          this.eventDate = null;
          this.startTime = '19:00';
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

  formatTime(value: Date | string, pattern: string): string {
    const d =
      value instanceof Date
        ? value
        : parse(String(value).trim(), pattern, new Date()); // usa el mismo patrón para parsear

    return isValid(d) ? format(d, pattern) : '';
  }
}
