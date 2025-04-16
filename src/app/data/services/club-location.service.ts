import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Result } from '../interfaces/result';
import { ClubLocation } from '@interfaces/club-location';

@Injectable({
  providedIn: 'root',
})
export class ClubLocationService {
  private readonly url = `${environment.baseUrl}/club`;
  private readonly http = inject(HttpClient);

  fetchByIdClub(id: string) {
    return this.http.get<Result<ClubLocation[]>>(`${this.url}/${id}/locations`);
  }

  create(idClub: string, data: any) {
    return this.http.post<Result<ClubLocation>>(
      `${this.url}/${idClub}/locations`,
      data
    );
  }

  update(idClubLocation: number, data: any) {
    return this.http.patch<Result<any>>(
      `${this.url}/locations/${idClubLocation}`,
      data
    );
  }

  deleteById(id: number) {
    return this.http.delete<Result<any>>(`${this.url}/locations/${id}`);
  }
}
