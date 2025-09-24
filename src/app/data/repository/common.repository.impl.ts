import { inject, Injectable } from '@angular/core';
import { ArtistType } from '@model/artist-type';
import { CommonRepository } from '@repository/common.repository';
import { firstValueFrom, map, Observable } from 'rxjs';
import { StatusEnum } from '../enum/status-enum';
import { ArtistTypeService } from '@services/artist-type.service';
import { CategoryService } from '@services/category.service';
import { SocialNetwork } from '@model/social-network';
import { SocialNetworkService } from '@services/social-network.service';
import { Category } from '@model/category';

@Injectable({
  providedIn: 'root',
})
export class CommonRepositoryImpl extends CommonRepository {
  private readonly artistTypeService = inject(ArtistTypeService);
  private readonly categoryService = inject(CategoryService);
  private readonly socialNetworkService = inject(SocialNetworkService);

  //*********************************************//
  //**************** Artist Type ****************//
  //*********************************************//

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

  //************************************************//
  //**************** Event Category ****************//
  //************************************************//
  override fetchAllEventCategory(status: StatusEnum): Observable<Category[]> {
    return this.categoryService.fetchAll(status).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data ?? [];
      })
    );
  }
  override getEventCategory(id: number): Observable<Category> {
    return this.categoryService.getById(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data!;
      })
    );
  }
  override createEventCategory(title: string): Observable<void> {
    return this.categoryService.create(title).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override updateEventCategory(id: number, title: string): Observable<void> {
    return this.categoryService.update(id, title).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override deleteEventCategory(id: number): Observable<void> {
    return this.categoryService.delete(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override restoreEventCategory(id: number): Observable<void> {
    return this.categoryService.restore(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }

  //************************************************//
  //**************** Social Network ****************//
  //************************************************//

  override fetchAllSocialNetwork(
    status: StatusEnum
  ): Observable<SocialNetwork[]> {
    return this.socialNetworkService.fetchAll(status).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data?.map((e) => SocialNetwork.fromDto(e)) ?? [];
      })
    );
  }
  override getSocialNetwork(id: number): Observable<SocialNetwork> {
    return this.socialNetworkService.getById(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return SocialNetwork.fromDto(res.data!);
      })
    );
  }
  override createSocialNetwork(
    name: string,
    imageUrl: string | null,
    imagePath: string | null
  ): Observable<void> {
    return this.socialNetworkService.create(name, imageUrl, imagePath).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override updateSocialNetwork(
    id: number,
    name: string,
    imageUrl: string | null,
    imagePath: string | null
  ): Observable<void> {
    return this.socialNetworkService.update(id, name, imageUrl, imagePath).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override deleteSocialNetwork(id: number): Observable<void> {
    return this.socialNetworkService.delete(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
  override restoreSocialNetwork(id: number): Observable<void> {
    return this.socialNetworkService.restore(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
      })
    );
  }
}
