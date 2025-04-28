import { Component, inject, Input, OnInit } from '@angular/core';
import { AppTopComponent } from '../../../../components/app-top.component';
import { CardClubCoverComponent } from '../../components/card-club-cover.component';
import { Router } from '@angular/router';
import { ClubCoverRepository } from '@repository/club-cover.repository';
import { ClubCover } from '@model/club-cover';
import Swal from 'sweetalert2';
import { BtnUploadImageComponent } from '../../../../components/btn-upload-image.component';
import {
  FolderFirebase,
  ImageFirebase,
} from 'app/domain/usecase/upload-image.usecase';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-club-covers',
  imports: [AppTopComponent, CardClubCoverComponent, BtnUploadImageComponent],
  templateUrl: './club-covers.component.html',
})
export class ClubCoversComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly repository = inject(ClubCoverRepository);

  @Input() idClub!: number;
  listCovers: ClubCover[] = [];

  folder = FolderFirebase.clubs;

  ngOnInit(): void {
    if (isNaN(Number(this.idClub))) {
      this.router.navigate(['menu', 'clubs']);
    }
    this.getAllCovers();
  }

  holaMundo(imageUrl: ImageFirebase): Observable<any> {
    return this.repository
      .create(this.idClub, imageUrl.url)
      .pipe(tap(() => this.getAllCovers()));
  }

  getAllCovers() {
    this.repository.fetchAll(this.idClub).subscribe({
      next: (res) => (this.listCovers = res),
      error: (err) => console.log(err),
    });
  }

  onImgDeleted(id: number) {
    this.repository.delete(id).subscribe({
      next: () => {
        this.listCovers = this.listCovers.filter((cover) => cover.id !== id);
        Swal.fire('Eliminada', 'La imagen ha sido eliminada', 'success');
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar la imagen',
          footer: 'Intenta nuevamente más tarde',
        });
      },
    });
  }
}
