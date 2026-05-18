import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'app/services/club.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { AddClubComponent } from '../home/components/add-club.component';
import { Club } from '@dto/club';

@Component({
  selector: 'app-detail-club',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DrawerModule,
    AddClubComponent,
  ],
  templateUrl: './detail-club.component.html',
})
export class DetailClubComponent implements OnInit {
  private readonly clubService = inject(ClubService);
  private readonly router = inject(Router);

  @Input() idClub!: string;

  club: any;
  loading = true;
  showEditForm = false;

  readonly sections = [
    {
      key: 'covers',
      icon: 'photo_library',
      label: 'Covers',
      description: 'Imágenes de portada del club',
    },
    {
      key: 'locations',
      icon: 'location_on',
      label: 'Ubicaciones',
      description: 'Direcciones y coordenadas',
    },
    {
      key: 'schedule',
      icon: 'schedule',
      label: 'Horarios',
      description: 'Días y horas de apertura',
    },
    {
      key: 'social-networks',
      icon: 'share',
      label: 'Redes sociales',
      description: 'Perfiles en redes sociales',
    },
    {
      key: 'emails',
      icon: 'email',
      label: 'Emails',
      description: 'Correos de contacto',
    },
    {
      key: 'phones',
      icon: 'phone',
      label: 'Teléfonos',
      description: 'Números de contacto',
    },
  ];

  ngOnInit(): void {
    this.getClub();
  }

  getClub() {
    this.loading = true;
    this.clubService.getById(this.idClub).subscribe({
      next: (result) => {
        this.club = result.data;
      },
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  toSection(path: string) {
    this.router.navigate(['menu', 'clubs', this.idClub, path]);
  }

  goBack() {
    this.router.navigate(['menu', 'clubs']);
  }

  get clubAsTyped(): Club | undefined {
    return this.club as Club | undefined;
  }
}
