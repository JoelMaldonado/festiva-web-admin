import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { SocialNetworkDto } from '@dto/social-network.dto';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class SocialNetworkService {
  private readonly url = `${environment.baseUrl}/common/social-network`;
  private readonly http = inject(HttpClient);

  fetchAll(statusId: number) {
    const queryParams = {
      status_id: statusId,
    };
    return this.http.get<Result<SocialNetworkDto[]>>(this.url, {
      params: queryParams,
    });
  }

  getById(id: number) {
    return this.http.get<Result<SocialNetworkDto>>(`${this.url}/${id}`);
  }

  create(name: string, logoUrl: string | null) {
    return this.http.post<Result<any>>(this.url, { name, logoUrl });
  }

  update(id: number, name: string, logoUrl: string | null) {
    return this.http.patch<Result<any>>(`${this.url}/${id}`, {
      name,
      logoUrl,
    });
  }

  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.url}/${id}`);
  }

  restore(id: number) {
    return this.http.post<Result<any>>(`${this.url}/restore/${id}`, {});
  }
}
