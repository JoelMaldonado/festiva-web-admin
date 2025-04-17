import { ArtistType } from '@model/artist-type';
import { EventCategory } from '@model/event-category';
import { StatusEnum } from 'app/data/enum/status-enum';
import { Observable } from 'rxjs';

export abstract class CommonRepository {
  // Artist Type
  abstract fetchAllArtistTypes(status: StatusEnum): Promise<ArtistType[]>;
  abstract createArtistType(name: string): Promise<void>;
  abstract updateArtistType(id: number, name: string): Promise<void>;
  abstract deleteArtistType(id: number): Promise<void>;
  abstract restoreArtistType(id: number): Promise<void>;

  // Event Category
  abstract fetchAllEventCategory(
    status: StatusEnum
  ): Observable<EventCategory[]>;
  abstract getEventCategory(id: number): Observable<EventCategory>;
  abstract createEventCategory(title: string): Observable<void>;
  abstract updateEventCategory(id: number, title: string): Observable<void>;
  abstract deleteEventCategory(id: number): Observable<void>;
  abstract restoreEventCategory(id: number): Observable<void>;
}
