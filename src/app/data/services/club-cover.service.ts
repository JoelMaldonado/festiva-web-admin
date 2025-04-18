import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClubCoverDto } from '@dto/club-cover.dto';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubCoverService {
  private readonly url = `${environment.baseUrl}/club-cover`;
  private readonly http = inject(HttpClient);

  fetchAll(idClub: number) {
    return this.http.get<Result<ClubCoverDto[]>>(`${this.url}/${idClub}`);
  }
}
