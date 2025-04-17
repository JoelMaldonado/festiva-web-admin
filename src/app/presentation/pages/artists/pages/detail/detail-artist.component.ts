import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '@dto/artist';
import { ArtistRepository } from '@repository/artist.repository';
import { AppTopComponent } from '../../../../components/app-top.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-detail-artist',
  imports: [AppTopComponent, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './detail-artist.component.html',
})
export class DetailArtistComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly artistRepo = inject(ArtistRepository);

  @Input() id!: string;

  artist?: Artist;

  ngOnInit(): void {
    if (isNaN(Number(this.id))) {
      this.router.navigate(['menu', 'artists']);
    }
    this.getArtist();
  }

  async getArtist() {
    try {
      const res = await this.artistRepo.getById(Number(this.id));
      this.artist = res;
    } catch (error) {
      console.log(error);
    }
  }

  goBack() {}
}
