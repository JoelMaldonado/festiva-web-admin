import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArtistTypeDto } from 'app/data/dto/artist-type.dto';
import { Result } from 'app/data/dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistTypeService {
  private readonly url = `${environment.baseUrl}/artist-type`;
  private readonly http = inject(HttpClient);

  fetchAll() {
    return this.http.get<Result<ArtistTypeDto[]>>(this.url);
  }
}
