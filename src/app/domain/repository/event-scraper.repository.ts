import { EventScraper } from 'app/data/dto/event-scraper';

export abstract class EventScraperRepository {
  abstract fetchAll(): Promise<EventScraper[]>;
  abstract approve(id: number): Promise<void>;
  abstract reject(id: number): Promise<void>;
}
