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
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import Swal from 'sweetalert2';
import { ClubLocationService } from '@services/club-location.service';
import { ClubLocation } from 'app/data/dto/club-location';

@Component({
  selector: 'drawer-form-club-location',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
  ],
  template: `
    <form (submit)="onSubmit($event)" class="pt-4 flex flex-col gap-4">
      <p-floatlabel variant="on">
        <input
          pInputText
          id="address"
          [formControl]="address"
          autocomplete="off"
          class="w-full"
        />
        <label for="address">Address</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <input
          pInputText
          id="latitude"
          [formControl]="latitude"
          autocomplete="off"
          class="w-full"
        />
        <label for="latitude">Latitud</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <input
          pInputText
          id="longitude"
          [formControl]="longitude"
          autocomplete="off"
          class="w-full"
        />
        <label for="longitude">Longitud</label>
      </p-floatlabel>

      <p-floatlabel variant="on">
        <input
          pInputText
          id="mapsUrl"
          [formControl]="mapsUrl"
          autocomplete="off"
          class="w-full"
        />
        <label for="mapsUrl">URL de Maps</label>
      </p-floatlabel>

      @if (error) {
      <div class="text-red-500 text-sm">{{ error }}</div>
      }

      <p-button type="submit" icon="pi pi-plus" label="Guardar" />
    </form>
  `,
})
export class DrawerFormClubLocation implements OnChanges {
  @Input({ required: true }) idClub!: string;
  @Input() clubLocation?: ClubLocation;
  @Output() onSaved = new EventEmitter<ClubLocation>();

  address = new FormControl('', Validators.required);
  latitude = new FormControl(0);
  longitude = new FormControl(0);
  mapsUrl = new FormControl('');

  clubLocationService = inject(ClubLocationService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clubLocation']) {
      if (this.clubLocation) {
        this.address.setValue(this.clubLocation.address);
        this.latitude.setValue(this.clubLocation.latitude);
        this.longitude.setValue(this.clubLocation.longitude);
        this.mapsUrl.setValue(this.clubLocation.mapsUrl);
      } else {
        this.address.reset();
        this.latitude.reset();
        this.longitude.reset();
        this.mapsUrl.reset();
      }
    }
  }

  error?: string;

  onSubmit(event: Event) {
    this.error = undefined;
    event.preventDefault();
    if (this.address.invalid) {
      this.error = 'Address is required';
      return;
    }
    const lat = Number(this.latitude.value);
    const lon = Number(this.longitude.value);

    if (isNaN(lat)) {
      this.error = 'Latitude must be a valid number';
      return;
    }
    if (lat >= 100 || lat <= -100) {
      this.error = 'Latitude must be between -90 and 90';
      return;
    }

    if (isNaN(lon)) {
      this.error = 'Longitude must be a valid number';
      return;
    }
    if (lon >= 200 || lon <= -200) {
      this.error = 'Longitude must be between -180 and 180';
      return;
    }

    this.save({
      address: this.address.value,
      latitude: Number(this.latitude.value),
      longitude: Number(this.longitude.value),
      mapsUrl: this.mapsUrl.value,
    });
  }

  save(data: any) {
    if (this.clubLocation) {
      this.clubLocationService.update(this.clubLocation.id, data).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.address.reset();
            this.latitude.reset();
            this.longitude.reset();
            this.mapsUrl.reset();

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
