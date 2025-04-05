import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import Swal from 'sweetalert2';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-toolbar',
  imports: [ToolbarModule, ButtonModule, Avatar, RouterModule],
  template: `
    <p-toolbar
      [style]="{ 'border-radius': '3rem', padding: '1rem 1rem 1rem 1.5rem' }"
    >
      <ng-template #start>
        <div class="flex items-center gap-2">
          <p-avatar image="festiva.png" size="normal" />
          @for (item of items; track $index) {
          <p-button
            [label]="item.label"
            [icon]="item.icon"
            text
            plain
            (click)="navigate(item.routerLink)"
          />
          }
        </div>
      </ng-template>

      <ng-template #end>
        <p-button
          icon="pi pi-sign-out"
          [rounded]="true"
          [text]="true"
          (click)="logout()"
        />
      </ng-template>
    </p-toolbar>
  `,
})
export class ToolbarComponent {
  router = inject(Router);
  storageService = inject(StorageService);
  items = [
    {
      label: 'Artists',
      icon: 'pi pi-fw pi-users',
      routerLink: 'artists',
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      routerLink: 'events',
    },
    {
      label: 'Clubs',
      icon: 'pi pi-fw pi-building',
      routerLink: 'clubs',
    },
    {
      label: 'Panel Admin',
      icon: 'pi pi-fw pi-cog',
      routerLink: 'panel-admin',
    },
  ];

  navigate(routerLink: String) {
    this.router.navigate(['menu', routerLink]);
  }

  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.storageService.removeToken();
        this.router.navigate(['login']);
      }
    });
  }
}
