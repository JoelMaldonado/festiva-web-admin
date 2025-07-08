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

  fetchAll(statusId: number) {
    const queryParams = {
      'status-id': statusId,
    };
    return this.http.get<Result<ArtistTypeDto[]>>(this.url, {
      params: queryParams,
    });
  }

  create(name: string) {
    return this.http.post<Result<ArtistTypeDto>>(this.url, { name });
  }

  update(id: number, name: string) {
    return this.http.patch<Result<ArtistTypeDto>>(`${this.url}/${id}`, {
      name,
    });
  }

  delete(id: number) {
    return this.http.delete<Result<ArtistTypeDto>>(`${this.url}/${id}`);
  }

  restore(id: number) {
    return this.http.post<Result<ArtistTypeDto>>(
      `${this.url}/restore/${id}`,
      {}
    );
  }
}
