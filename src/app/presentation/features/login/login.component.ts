import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { AuthService } from 'app/services/auth.service';

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
  authService = inject(AuthService);

  async login() {
    this.error = null;
    this.loading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);

        this.storageService.setToken('token');
        this.router.navigate(['menu']);
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
