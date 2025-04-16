import { inject, Injectable } from '@angular/core';
import { Artist } from 'app/data/dto/artist';
import { ArtistType } from '@model/artist-type';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { ArtistTypeService } from '@services/artist-type.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistTypeRepositoryImpl extends ArtistTypeRepository {
  private service = inject(ArtistTypeService);

  override async fetchAll(): Promise<ArtistType[]> {
    const res = await firstValueFrom(this.service.fetchAll());
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
    const mappedData = res.data?.map((e) => ArtistType.fromDto(e));
    return mappedData ?? [];
  }
}
