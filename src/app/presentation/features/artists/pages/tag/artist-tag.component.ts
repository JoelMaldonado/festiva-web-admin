import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTopComponent } from '@components/app-top.component';
import { ArtistTagService } from 'app/services/artist-tag.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { delay } from 'rxjs';

@Component({
  selector: 'artist-tag',
  templateUrl: './artist-tag.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AppTopComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
})
export class ArtistTagComponent implements OnInit {
  private readonly service = inject(ArtistTagService);
  @Input() idArtist?: string;

  isLoading = true;
  isLoadingSave = false;

  listTags: any[] = [];
  tag = '';

  ngOnInit() {
    if (!this.idArtist) {
      alert('No se ha pasado el id del artista');
      return;
    }

    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    this.service
      .getAll(this.idArtist!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listTags = res.data ?? [];
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  save() {
    this.isLoadingSave = true;
    this.service
      .create(Number(this.idArtist!), this.tag)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
            this.tag = '';
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoadingSave = false;
        },
      });
  }

  remove(id: number) {
    if (confirm('¿Está seguro de eliminar la etiqueta?')) {
      this.service.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
    }
  }
}
