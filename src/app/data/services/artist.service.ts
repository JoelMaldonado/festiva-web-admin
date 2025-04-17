import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Artist } from 'app/data/dto/artist';
import { Result } from 'app/data/dto/result';
import { CreateArtistRequest } from '@dto/request/create-artist.request';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly url = `${environment.baseUrl}/artist`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<Artist[]>>(this.url);
  }

  getById(id: number) {
    return this.http.get<Result<Artist>>(`${this.url}/${id}`);
  }

  create(data: CreateArtistRequest) {
    return this.http.post<Result<Artist>>(this.url, data);
  }

  update(id: number, data: CreateArtistRequest) {
    return this.http.patch<Result<Artist>>(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<Result<Artist>>(`${this.url}/${id}`);
  }
}
