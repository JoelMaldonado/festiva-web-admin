import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { EventModel } from '@model/event';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly url = `${environment.baseUrl}/event`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<EventModel[]>>(this.url);
  }

  add(request: any) {
    return this.http.post<Result<any>>(this.url, request);
  }

  fetchEventSchedule(idEvent: string) {
    return this.http.get<Result<any>>(`${this.url}/${idEvent}/schedule`);
  }
}
