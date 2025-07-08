import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { ClubLocationService } from '@services/club-location.service';
import { ClubLocation } from 'app/data/dto/club-location';
import { InputComponent } from '@components/input.component';

@Component({
  selector: 'drawer-form-club-location',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputComponent],
  template: `
    <div>
      <form (submit)="onSubmit($event)" class="pt-4 flex flex-col gap-4">
        <app-input label="Address" [(model)]="address" [error]="addressError" />
        <app-input label="UrlMaps" [(model)]="mapsUrl" [error]="mapsUrlError" />
        <app-input
          label="Latitude"
          [(model)]="latitude"
          [error]="latitudeError"
        />
        <app-input
          label="Longitude"
          [(model)]="longitude"
          [error]="longitudeError"
        />

        <p-button type="submit" icon="pi pi-plus" label="Guardar" />
      </form>
    </div>
  `,
})
export class DrawerFormClubLocation implements OnChanges {
  @Input({ required: true }) idClub!: string;
  @Input() clubLocation?: ClubLocation;
  @Output() onSaved = new EventEmitter<ClubLocation>();

  address = '';
  latitude = '';
  longitude = '';
  mapsUrl = '';

  addressError?: string;
  latitudeError?: string;
  longitudeError?: string;
  mapsUrlError?: string;

  clubLocationService = inject(ClubLocationService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clubLocation']) {
      if (this.clubLocation) {
        this.address = this.clubLocation.address;
        this.latitude = this.clubLocation.latitude.toString();
        this.longitude = this.clubLocation.longitude.toString();
        this.mapsUrl = this.clubLocation.mapsUrl;
      } else {
        this.address = '';
        this.latitude = '';
        this.longitude = '';
        this.mapsUrl = '';
      }
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.validateForm()) {
      return;
    }

    this.save({
      address: this.address,
      latitude: Number(this.latitude),
      longitude: Number(this.longitude),
      mapsUrl: this.mapsUrl,
    });
  }

  validateForm(): boolean {
    this.addressError = undefined;
    this.latitudeError = undefined;
    this.longitudeError = undefined;
    this.mapsUrlError = undefined;

    let isValid = true;

    if (!this.address) {
      this.addressError = 'Address is required';
      isValid = false;
    }

    if (!this.mapsUrl) {
      this.mapsUrlError = 'Maps URL is required';
      isValid = false;
    }

    if (!this.latitude) {
      this.latitudeError = 'Latitude is required';
      isValid = false;
    } else {
      const lat = Number(this.latitude);
      if (isNaN(lat) && this.latitudeError === undefined) {
        this.latitudeError = 'Latitude must be a valid number';
        isValid = false;
      }
      if ((lat >= 100 || lat <= -100) && this.latitudeError === undefined) {
        this.latitudeError = 'Latitude must be between -90 and 90';
        isValid = false;
      }
    }

    if (!this.longitude) {
      this.longitudeError = 'Longitude is required';
      isValid = false;
    } else {
      const lon = Number(this.longitude);

      if (isNaN(lon) && this.longitudeError === undefined) {
        this.longitudeError = 'Longitude must be a valid number';
        isValid = false;
      }
      if ((lon >= 200 || lon <= -200) && this.longitudeError === undefined) {
        this.longitudeError = 'Longitude must be between -180 and 180';
        isValid = false;
      }
    }

    return isValid;
  }

  save(data: any) {
    if (this.clubLocation) {
      this.clubLocationService.update(this.clubLocation.id, data).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.address = '';
            this.latitude = '';
            this.longitude = '';
            this.mapsUrl = '';

            this.onSaved.emit(res.data);
          } else {
            console.log(res.message);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            });
          }
        },
        error: (error) => {
          console.error('Error updating club location:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        },
      });
    } else {
      this.clubLocationService.create(this.idClub, data).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.onSaved.emit(res.data);
          } else {
            console.log(res.message);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            });
          }
        },
        error: (error) => {
          console.error('Error creating club location:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
          });
        },
      });
    }
  }
}
