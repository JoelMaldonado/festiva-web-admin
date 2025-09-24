import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { EventCategory } from '@model/event-category';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryService {
  private readonly url = `${environment.baseUrl}/event`;
  private readonly http = inject(HttpClient);

  allEventCategories(idEvent: string): Observable<Result<EventCategory[]>> {
    return this.http.get<Result<EventCategory[]>>(
      `${this.url}/${idEvent}/categories`
    );
  }

  saveEventCategories(
    idEvent: string,
    categories: EventCategory[]
  ): Observable<Result<any>> {
    return this.http.post<Result<any>>(
      `${this.url}/${idEvent}/categories`,
      categories
    );
  }
}
