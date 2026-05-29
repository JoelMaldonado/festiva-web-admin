import { EventScraper } from 'app/data/dto/event-scraper';

export abstract class EventScraperRepository {
  abstract fetchAll(): Promise<EventScraper[]>;
  abstract remove(id: number): Promise<void>;
}
