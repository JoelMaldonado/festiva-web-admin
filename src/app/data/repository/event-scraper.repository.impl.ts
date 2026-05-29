import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventScraper } from 'app/data/dto/event-scraper';
import { EventScraperRepository } from '@repository/event-scraper.repository';
import { EventScraperService } from '@services/event-scraper.service';

@Injectable({
  providedIn: 'root',
})
export class EventScraperRepositoryImpl extends EventScraperRepository {
  service = inject(EventScraperService);

  override async fetchAll(): Promise<EventScraper[]> {
    const res = await firstValueFrom(this.service.fetchAll());
    if (!res.isSuccess) throw new Error(res.message);
    return res.data ?? [];
  }

  override async remove(id: number): Promise<void> {
    const res = await firstValueFrom(this.service.remove(id));
    if (!res.isSuccess) throw new Error(res.message);
  }
}
