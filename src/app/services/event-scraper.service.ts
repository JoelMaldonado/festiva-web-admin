import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventScraper } from 'app/data/dto/event-scraper';
import { Result } from 'app/data/dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventScraperService {
  private readonly url = `${environment.baseUrl}/event-scraper`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<EventScraper[]>>(this.url);
  }

  remove(id: number) {
    return this.http.delete<Result<null>>(`${this.url}/${id}`);
  }
}
