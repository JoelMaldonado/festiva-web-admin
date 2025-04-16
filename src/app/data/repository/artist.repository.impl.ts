import { inject, Injectable } from '@angular/core';
import { Artist } from '@interfaces/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { ArtistService } from '@services/artist.service';
import { firstValueFrom, Observable } from 'rxjs';

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
}
