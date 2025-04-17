import { inject, Injectable } from '@angular/core';
import { Artist } from 'app/data/dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { ArtistService } from '@services/artist.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateArtistRequest } from '@dto/request/create-artist.request';

@Injectable({
  providedIn: 'root',
})
export class ArtistRepositoryImpl extends ArtistRepository {
  service = inject(ArtistService);

  override async fetchAll(): Promise<Artist[]> {
    const res = await firstValueFrom(this.service.fetchAll());
    if (!res.isSuccess) {
      throw new Error(res.message);
    }
    return res.data ?? [];
  }

  override async getById(id: number): Promise<Artist> {
    const res = await firstValueFrom(this.service.getById(id));
    if (!res.isSuccess || !res.data) {
      throw new Error(res.message);
    }
    return res.data;
  }

  override async create(request: CreateArtistRequest): Promise<void> {
    try {
      const res = await firstValueFrom(this.service.create(request));
      if (!res.isSuccess) {
        throw new Error(res.message);
      }
      return;
    } catch (e) {
      throw new Error('Error creating artist');
    }
  }

  override async delete(id: number): Promise<void> {
    try {
      const res = await firstValueFrom(this.service.delete(id));
      if (!res.isSuccess) {
        throw new Error(res.message);
      }
      return;
    } catch (e) {
      throw new Error('Error deleting artist');
    }
  }
}
