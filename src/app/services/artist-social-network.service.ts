import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistSocialNetworkService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/artist-social-network`;

  getAll(idArtist: string) {
    const queryParams = { idArtist };
    return this.http.get<Result<any[]>>(`${this.baseUrl}`, {
      params: queryParams,
    });
  }

  create(request: any) {
    return this.http.post<Result<number>>(`${this.baseUrl}`, request);
  }

  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.baseUrl}/${id}`);
  }
}
