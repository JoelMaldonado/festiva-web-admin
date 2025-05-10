import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventArtistService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/event-artist`;

  getAll(idEvent: string) {
    return this.http.get<Result<any[]>>(`${this.baseUrl}/${idEvent}`);
  }

  create(idEvent: string, artistId: number) {
    return this.http.post<Result<number>>(`${this.baseUrl}/${idEvent}`, {
      artistId,
    });
  }
  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.baseUrl}/${id}`);
  }
}
