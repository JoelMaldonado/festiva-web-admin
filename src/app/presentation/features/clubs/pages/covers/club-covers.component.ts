import { Component, inject, Input, OnInit } from '@angular/core';
import { AppTopComponent } from '../../../../components/app-top.component';
import { CardClubCoverComponent } from '../../components/card-club-cover.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClubCoverRepository } from '@repository/club-cover.repository';
import { ClubCover } from '@model/club-cover';

@Component({
  selector: 'app-club-covers',
  imports: [AppTopComponent, CardClubCoverComponent, MatIconModule],
  templateUrl: './club-covers.component.html',
})
export class ClubCoversComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly repository = inject(ClubCoverRepository);

  @Input() idClub!: string;

  ngOnInit(): void {
    if (isNaN(Number(this.idClub))) {
      this.router.navigate(['menu', 'clubs']);
    }
    this.getAllCovers();
  }

  listCovers: ClubCover[] = [];

  getAllCovers() {
    this.repository.fetchAll(Number(this.idClub)).subscribe({
      next: (res) => (this.listCovers = res),
      error: (err) => console.log(err),
    });
  }
}
