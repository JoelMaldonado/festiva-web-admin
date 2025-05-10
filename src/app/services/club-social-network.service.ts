import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubSocialNetworkService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/club-social-network`;

  getAll(idClub: string) {
    const queryParams = {
      idClub: idClub,
    };

    return this.http.get<Result<any[]>>(`${this.baseUrl}`, {
      params: queryParams,
    });
  }

  create(request: any) {
    return this.http.post<Result<number>>(`${this.baseUrl}`, request);
  }

  delete(idClubSchedule: number) {
    return this.http.delete<Result<any>>(`${this.baseUrl}/${idClubSchedule}`);
  }
}
