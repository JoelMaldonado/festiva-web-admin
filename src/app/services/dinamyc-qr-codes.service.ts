import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DinamycQrCodesService {
  private readonly url = `${environment.baseUrl}/dinamyc-qr-codes`;
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Result<any>>(this.url);
  }
}
