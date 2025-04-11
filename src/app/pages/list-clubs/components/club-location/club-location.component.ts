import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ClubService } from '../../../../services/club.service';

@Component({
  selector: 'app-club-location',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DrawerModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './club-location.component.html',
})
export class ClubLocationComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() clubId: number | null = null;

  address = new FormControl('');
  mapsUrl = new FormControl('');
  latitude = new FormControl(0);
  longitude = new FormControl(0);

  service = inject(ClubService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clubId'] && this.clubId !== null) {
      this.get();
    }
  }

  get() {
    this.service.fetchLocation(this.clubId!).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          if (res.data) {
            this.address.setValue(res.data.address);
            this.mapsUrl.setValue(res.data.mapsUrl);
            this.latitude.setValue(res.data.latitude);
            this.longitude.setValue(res.data.longitude);
          }
        } else {
          console.error(res.message);
        }
      },
    });
  }

  onVisibleChange(value: boolean) {
    this.visible = value;
    this.visibleChange.emit(value);
  }
}
