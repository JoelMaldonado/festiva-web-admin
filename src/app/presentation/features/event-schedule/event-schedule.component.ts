import { Component, inject, Input, OnInit } from '@angular/core';
import { EventScheduleService } from '@services/event-schedule.service';
import { AppTopComponent } from '@components/app-top.component';
import { TableModule } from 'primeng/table';
import { AppInputDateComponent } from '@components/input-date.component';
import { CommonModule } from '@angular/common';
import { InputTimeComponent } from '@components/input-time.component';
import { format, isValid, parse } from 'date-fns';
import { EventInfoCardComponent } from '../events-old/components/event-info-card.component';
import { AppFestButtonComponent } from '@components/fest-button.component';

@Component({
  standalone: true,
  selector: 'app-event-schedule',
  imports: [
    CommonModule,
    AppTopComponent,
    TableModule,
    AppInputDateComponent,
    InputTimeComponent,
    EventInfoCardComponent,
    AppFestButtonComponent,
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
    if (!this.idEvent) {
      alert('Invalid event ID');
      return;
    }

    if (!this.eventDate || !this.startTime) {
      alert('Please select both event date and start time');
      return;
    }

    this.isLoadingSaving = true;

    this.eventScheduleService
      .save(
        this.idEvent,
        this.formatTime(this.eventDate, 'yyyy-MM-dd'),
        this.formatTime(this.startTime, 'HH:mm')
      )
      .subscribe({
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
