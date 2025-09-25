import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventScheduleService {
  private readonly url = `${environment.baseUrl}/event-schedule`;
  private readonly http = inject(HttpClient);

  fetchEventSchedule(idEvent: string) {
    return this.http.get<Result<any>>(`${this.url}/${idEvent}`);
  }

  save(eventId: string | number, eventDate: string, startTime: string) {
    const body = {
      eventId,
      eventDate,
      startTime,
    };

    return this.http.post<Result<any>>(`${this.url}`, body);
  }
}
