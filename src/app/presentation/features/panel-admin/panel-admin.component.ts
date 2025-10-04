import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-admin',
  imports: [MenubarModule, RouterModule],
  template: `
    <div class="flex flex-col gap-4">
      <p-menubar [model]="items" />
      <router-outlet />
    </div>
  `,
})
export class PanelAdminComponent {
  items: MenuItem[] = [
    {
      label: 'Tipos de Usuario',
      routerLink: ['/menu', 'panel-admin', 'user-types'],
    },
    {
      label: 'Categorías de Evento',
      icon: 'pi pi-tags',
      routerLink: ['/menu', 'panel-admin', 'event-categories'],
    },
    {
      label: 'Tipos de Artistas',
      icon: 'pi pi-users',
      routerLink: ['/menu', 'panel-admin', 'artist-types'],
    },
    {
      label: 'Redes Sociales',
      icon: 'pi pi-share-alt',
      routerLink: ['/menu', 'panel-admin', 'social-networks'],
    },
    {
      label: 'Eliminados',
      icon: 'pi pi-trash',
      routerLink: ['/menu', 'panel-admin', 'trash'],
    },
    {
      label: 'Qr Dinámicos',
      icon: 'pi pi-qrcode',
      routerLink: ['/menu', 'panel-admin', 'dynamic-qr'],
    },
  ];
}
