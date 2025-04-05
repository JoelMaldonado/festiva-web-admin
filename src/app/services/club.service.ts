import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../interfaces/result';
import { Club } from '../interfaces/club';
import { ClubLocation } from '../interfaces/club-location';
import { ClubPhone } from '../interfaces/club-phone';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly url = `${environment.baseUrl}/club`;
  private readonly http = inject(HttpClient);

  add(name: string, description: string) {
    const body = {
      name: name,
      description: description,
    };
    return this.http.post<Result<Club>>(`${this.url}`, body);
  }

  fetchAll() {
    return this.http.get<Result<Club[]>>(`${this.url}/detail`);
  }

  fetchLocation(id: number) {
    return this.http.get<Result<ClubLocation>>(`${this.url}/location/${id}`);
  }

  fetchClubPhones(id: number) {
    return this.http.get<Result<ClubPhone[]>>(`${this.url}/${id}/contact`);
  }
}
