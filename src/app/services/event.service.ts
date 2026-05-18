import { HttpClient, HttpParams } from '@angular/common/http';
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

  getById(id: string) {
    return this.http.get<Result<any>>(`${this.url}/detail/${id}`);
  }

  add(request: any) {
    return this.http.post<Result<any>>(this.url, request);
  }

  createV2(dto: {
    clubId: number;
    title: string;
    description?: string;
    imageUrl?: string;
    ticketUrl?: string;
    categoryIds: number[];
    schedules: { date: string; startTime: string }[];
    artistIds?: number[];
  }) {
    return this.http.post<Result<{ eventId: number }>>(`${this.url}/v2`, dto);
  }

  fetchEventSchedule(idEvent: string) {
    return this.http.get<Result<any>>(`${this.url}/${idEvent}/schedule`);
  }

  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.url}/${id}`);
  }

  fetchAllPaged(
    page: number,
    limit: number,
    categoryId?: number,
    search?: string,
    dateFrom?: string,
    dateTo?: string,
  ) {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (categoryId != null) params = params.set('categoryId', categoryId);
    if (search)             params = params.set('search', search);
    if (dateFrom)           params = params.set('dateFrom', dateFrom);
    if (dateTo)             params = params.set('dateTo', dateTo);

    return this.http.get<Result<any>>(`${this.url}/paged`, { params });
  }
}
