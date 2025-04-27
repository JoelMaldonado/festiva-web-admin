import { inject, Injectable } from '@angular/core';
import { Event } from '@model/event';
import { EventRepository } from '@repository/event.repository';
import { EventService } from '@services/event.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventRepositoryImpl extends EventRepository {
  private readonly service = inject(EventService);

  override fetchAll(): Observable<Event[]> {
    return this.service.fetchAll().pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data?.map((dto) => Event.fromDto(dto)) ?? [];
      })
    );
  }
}
