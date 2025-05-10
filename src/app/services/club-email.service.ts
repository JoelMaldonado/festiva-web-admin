import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubEmailService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/club-email`;

  getAll(idClub: string) {
    return this.http.get<Result<any[]>>(`${this.baseUrl}/${idClub}`);
  }

  create(idClub: number, email: string) {
    return this.http.post<Result<number>>(`${this.baseUrl}`, {
      idClub,
      email,
    });
  }

  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.baseUrl}/${id}`);
  }
}
