import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubScheduleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/club-schedule`;

  getAll(idClub: string) {
    return this.http.get<Result<any[]>>(`${this.baseUrl}/${idClub}`);
  }

  create(idClub: string, request: any) {
    return this.http.post<Result<number>>(`${this.baseUrl}/${idClub}`, request);
  }

  delete(idClubSchedule: string) {
    return this.http.delete<Result<any>>(`${this.baseUrl}/${idClubSchedule}`);
  }
}
