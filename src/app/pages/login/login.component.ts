import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;
  router = inject(Router);
  storageService = inject(StorageService);

  async login() {
    this.error = null;
    this.loading = true;

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (this.username === 'admin' && this.password === '1234') {
            resolve(true);
          } else {
            reject('Usuario o contraseña incorrectos');
          }
        }, 1500)
      );

      this.storageService.setToken('token');
      this.router.navigate(['menu']);
    } catch (err: any) {
      this.error = err;
    } finally {
      this.loading = false;
    }
  }
}
