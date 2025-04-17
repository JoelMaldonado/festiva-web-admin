import { inject, Injectable } from '@angular/core';
import { ArtistType } from '@model/artist-type';
import { CommonRepository } from '@repository/common.repository';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { StatusEnum } from '../enum/status-enum';
import { EventCategory } from '@model/event-category';
import { ArtistTypeService } from '@services/artist-type.service';
import { EventCategoryService } from '@services/event-category.service';

@Injectable({
  providedIn: 'root',
})
export class CommonRepositoryImpl extends CommonRepository {
  private readonly artistTypeService = inject(ArtistTypeService);
  private readonly eventCategoryService = inject(EventCategoryService);

  override async fetchAllArtistTypes(
    status: StatusEnum
  ): Promise<ArtistType[]> {
    const res = await firstValueFrom(this.artistTypeService.fetchAll(status));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
    const mappedData = res.data?.map((e) => ArtistType.fromDto(e));
    return mappedData ?? [];
  }

  override async createArtistType(name: string): Promise<void> {
    const res = await firstValueFrom(this.artistTypeService.create(name));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async updateArtistType(id: number, name: string): Promise<void> {
    const res = await firstValueFrom(this.artistTypeService.update(id, name));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async deleteArtistType(id: number): Promise<void> {
    const res = await firstValueFrom(this.artistTypeService.delete(id));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async restoreArtistType(id: number): Promise<void> {
    const res = await firstValueFrom(this.artistTypeService.restore(id));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }

  //**************** Event Category ****************//
  override fetchAllEventCategory(
    status: StatusEnum
  ): Observable<EventCategory[]> {
    return this.eventCategoryService.fetchAll(status).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data?.map((e) => EventCategory.fromDto(e)) ?? [];
      })
    );
  }
  override getEventCategory(id: number): Observable<EventCategory> {
    return this.eventCategoryService.getById(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return EventCategory.fromDto(res.data!);
      })
    );
  }
  override createEventCategory(title: string): Observable<void> {
    return this.eventCategoryService.create(title).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override updateEventCategory(id: number, title: string): Observable<void> {
    return this.eventCategoryService.update(id, title).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override deleteEventCategory(id: number): Observable<void> {
    return this.eventCategoryService.delete(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override restoreEventCategory(id: number): Observable<void> {
    return this.eventCategoryService.restore(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
}
