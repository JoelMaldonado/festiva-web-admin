import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/auth`;

  login(correo: string, clave: string) {
    const request = {
      correo: correo,
      clave: clave,
    };
    return this.http.post(`${this.baseUrl}/login`, request);
  }
}
