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

  override async approve(id: number): Promise<void> {
    await firstValueFrom(this.service.approve(id));
  }

  override async reject(id: number): Promise<void> {
    await firstValueFrom(this.service.reject(id));
  }
}
