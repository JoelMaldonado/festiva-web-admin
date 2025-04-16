import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Artist } from '@interfaces/artist';
import { Result } from '@interfaces/result';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly url = `${environment.baseUrl}/artist`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<Artist[]>>(this.url);
  }
}
