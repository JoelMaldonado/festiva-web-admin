import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { Category } from '@model/category';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly url = `${environment.baseUrl}/event-category`;
  private readonly http = inject(HttpClient);

  fetchAll(statusId: number) {
    const queryParams = {
      status_id: statusId,
    };
    return this.http.get<Result<Category[]>>(this.url, {
      params: queryParams,
    });
  }

  getById(id: number) {
    return this.http.get<Result<Category>>(`${this.url}/${id}`);
  }

  create(title: string) {
    return this.http.post<Result<any>>(this.url, { title });
  }

  update(id: number, title: string) {
    return this.http.patch<Result<any>>(`${this.url}/${id}`, {
      title,
    });
  }

  delete(id: number) {
    return this.http.delete<Result<any>>(`${this.url}/${id}`);
  }

  restore(id: number) {
    return this.http.post<Result<any>>(`${this.url}/restore/${id}`, {});
  }
}
