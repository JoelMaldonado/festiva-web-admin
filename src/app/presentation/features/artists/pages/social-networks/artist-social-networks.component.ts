import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTopComponent } from '@components/app-top.component';
import { SocialNetwork } from '@model/social-network';
import { SocialNetworkService } from '@services/social-network.service';
import { ArtistSocialNetworkService } from 'app/services/artist-social-network.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { delay } from 'rxjs';

@Component({
  selector: 'artist-social-networks',
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    AppTopComponent,
    SelectModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './artist-social-networks.component.html',
  standalone: true,
})
export class ArtistSocialNetworks implements OnInit {
  private readonly artistSocialNetworkService = inject(
    ArtistSocialNetworkService
  );
  private readonly socialNetworkService = inject(SocialNetworkService);
  @Input() idArtist?: string;
  listClubSocialNetworks: any = [];
  isLoading = false;
  isLoadingSave = false;

  socialNetworks: SocialNetwork[] = [];
  socialNetworkSelected?: SocialNetwork;

  url?: string;

  ngOnInit(): void {
    this.getAll();
    this.getAllSocialNetworks();
  }

  getAllSocialNetworks() {
    this.socialNetworkService.fetchAll(1).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.socialNetworks = res.data || [];
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  add() {
    this.isLoadingSave = true;
    const query = {
      idArtist: Number(this.idArtist),
      socialNetworkId: this.socialNetworkSelected?.id,
      url: this.url,
    };
    this.artistSocialNetworkService
      .create(query)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
            this.socialNetworkSelected = undefined;
            this.url = undefined;
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error creating social network:', error);
        },
        complete: () => {
          this.isLoadingSave = false;
        },
      });
  }

  getAll() {
    this.isLoading = true;
    this.artistSocialNetworkService
      .getAll(this.idArtist!)
      .pipe(delay(300))
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.listClubSocialNetworks = res.data || [];
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error fetching social networks:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  remove(id: number) {
    if (confirm('¿Está seguro de eliminar este registro?')) {
      this.artistSocialNetworkService.delete(id).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.getAll();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          console.error('Error deleting social network:', error);
        },
      });
    }
  }
}
