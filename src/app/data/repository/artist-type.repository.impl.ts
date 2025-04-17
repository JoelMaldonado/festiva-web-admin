import { inject, Injectable } from '@angular/core';
import { Artist } from 'app/data/dto/artist';
import { ArtistType } from '@model/artist-type';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { ArtistTypeService } from '@services/artist-type.service';
import { firstValueFrom } from 'rxjs';
import { StatusEnum } from '../enum/status-enum';

@Injectable({
  providedIn: 'root',
})
export class ArtistTypeRepositoryImpl extends ArtistTypeRepository {
  private service = inject(ArtistTypeService);

  override async fetchAll(status: StatusEnum): Promise<ArtistType[]> {
    const res = await firstValueFrom(this.service.fetchAll(status));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
    const mappedData = res.data?.map((e) => ArtistType.fromDto(e));
    return mappedData ?? [];
  }

  override async create(name: string): Promise<void> {
    const res = await firstValueFrom(this.service.create(name));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async update(id: number, name: string): Promise<void> {
    const res = await firstValueFrom(this.service.update(id, name));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async delete(id: number): Promise<void> {
    const res = await firstValueFrom(this.service.delete(id));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
  override async restore(id: number): Promise<void> {
    const res = await firstValueFrom(this.service.restore(id));
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
  }
}
