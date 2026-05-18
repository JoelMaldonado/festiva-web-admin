import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-panel-admin',
  imports: [RouterModule, MatIconModule],
  template: `
    <div class="flex flex-col gap-6">

      <!-- Tab navigation -->
      <div class="bg-b2 border border-b4 rounded-2xl p-1.5 overflow-x-auto">
        <div class="flex gap-1 min-w-max">
          @for (tab of tabs; track tab.path) {
            <a
              [routerLink]="tab.link"
              routerLinkActive="!bg-b3 !text-t1 !border-b4"
              [routerLinkActiveOptions]="{ exact: false }"
              class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-t3 hover:text-t2 hover:bg-b3 border border-transparent transition-all whitespace-nowrap"
            >
              <mat-icon class="!text-[17px] !w-[17px] !h-[17px]">{{ tab.icon }}</mat-icon>
              {{ tab.label }}
            </a>
          }
        </div>
      </div>

      <router-outlet />
    </div>
  `,
})
export class PanelAdminComponent {
  readonly tabs = [
    { path: 'user-types',       label: 'Tipos de usuario',    icon: 'manage_accounts', link: ['/menu', 'panel-admin', 'user-types'] },
    { path: 'event-categories', label: 'Categorías de evento', icon: 'sell',            link: ['/menu', 'panel-admin', 'event-categories'] },
    { path: 'artist-types',     label: 'Tipos de artista',    icon: 'music_note',      link: ['/menu', 'panel-admin', 'artist-types'] },
    { path: 'social-networks',  label: 'Redes sociales',      icon: 'share',           link: ['/menu', 'panel-admin', 'social-networks'] },
    { path: 'trash',            label: 'Eliminados',          icon: 'delete',          link: ['/menu', 'panel-admin', 'trash'] },
    { path: 'dynamic-qr',      label: 'QR Dinámicos',        icon: 'qr_code',         link: ['/menu', 'panel-admin', 'dynamic-qr'] },
  ];
}
