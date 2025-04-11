import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../interfaces/result';
import { ClubLocation } from '../interfaces/club-location';

@Injectable({
  providedIn: 'root',
})
export class ClubLocationService {
  private readonly url = `${environment.baseUrl}/club`;
  private readonly http = inject(HttpClient);

  fetchByIdClub(id: number) {
    return this.http.get<Result<ClubLocation[]>>(`${this.url}/${id}/locations`);
  }

  deleteById(id: number) {
    return this.http.delete<Result<any>>(`${this.url}/locations/${id}`);
  }
}
