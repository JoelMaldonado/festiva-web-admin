import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDto } from '@dto/event.dto';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly url = `${environment.baseUrl}/event`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<EventDto[]>>(this.url);
  }
}
