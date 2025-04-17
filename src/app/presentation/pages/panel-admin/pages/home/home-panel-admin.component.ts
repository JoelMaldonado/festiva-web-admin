import { Component, inject } from '@angular/core';
import { CardPanelAdminComponent } from '../../components/card-panel-admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-panel-admin',
  imports: [CardPanelAdminComponent],
  templateUrl: `./home-panel-admin.component.html`,
})
export class HomePanelAdminComponent {
  private readonly router = inject(Router);
  items = [
    {
      title: 'Tipos de Usuario',
      description: 'Administra los roles o niveles de acceso de los usuarios.',
      path: 'user-types',
    },
    {
      title: 'Categorías',
      description:
        'Clasifica tus eventos, artistas o clubes con categorías personalizadas.',
      path: 'event-categories',
    },
    {
      title: 'Tipos de Artistas',
      description:
        'Define los diferentes tipos de artistas que puedes gestionar.',
      path: 'artist-types',
    },
    {
      title: 'Redes Sociales',
      description:
        'Gestiona los enlaces a redes sociales asociadas a cada club o artista.',
      path: 'social-networks',
    },
    {
      title: 'Eliminados',
      description:
        'Recupera o elimina de forma permanente los elementos eliminados.',
      path: 'trash',
    },
  ];

  toDetail(path: string) {
    this.router.navigate(['menu', 'panel-admin', path]);
  }
}
