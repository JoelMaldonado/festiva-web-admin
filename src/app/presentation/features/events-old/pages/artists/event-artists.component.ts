import { Component, inject, Input, OnInit } from '@angular/core';
import { AppTopComponent } from '../../../../components/app-top.component';
import { EventArtistService } from 'app/services/event-artist.service';
import { delay } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ArtistRepository } from '@repository/artist.repository';
import { Artist } from '@dto/artist';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { EventInfoCardComponent } from "../../components/event-info-card.component";

@Component({
  selector: 'event-artists',
  templateUrl: './event-artists.component.html',
  standalone: true,
  imports: [
    FormsModule,
    AppTopComponent,
    TableModule,
    ButtonModule,
    SelectModule,
    EventInfoCardComponent
],
})
export class EventArtistsComponent implements OnInit {
  private readonly eventArtistService = inject(EventArtistService);
  private readonly repoArtist = inject(ArtistRepository);
  @Input() idEvent?: string;

  listEventArtists: any[] = [];
  isLoading = true;
  isLoadingSaving = true;

  listArtists: Artist[] = [];
  artistSelected?: Artist;

  ngOnInit() {
    if (!this.idEvent) {
      alert('Invalid event ID');
      return;
    }
    this.getAllArtists();
    this.getAll();
  }

  async getAllArtists() {
    try {
      const res = await this.repoArtist.fetchAll();
      this.listArtists = res;
      console.log('Artists:', this.listArtists);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  }

  getAll() {
    this.isLoading = true;
    this.eventArtistService
      .getAll(this.idEvent!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listEventArtists = res.data ?? [];
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

  add() {
    this.isLoadingSaving = true;
    this.eventArtistService
      .create(this.idEvent!, this.artistSelected!.id)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
            this.artistSelected = undefined;
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.isLoadingSaving = false;
        },
      });
  }

  remove(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.eventArtistService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
