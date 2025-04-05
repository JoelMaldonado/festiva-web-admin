import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = window.localStorage;

  setToken(token: string) {
    this.storage.setItem('token_key', token);
  }

  getToken(): string | null {
    return this.storage.getItem('token_key');
  }

  removeToken() {
    this.storage.removeItem('token_key');
  }
}
