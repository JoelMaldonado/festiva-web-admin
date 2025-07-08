import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  template: `
    <google-map [width]="width" [height]="height">
      @if (markerPosition) {
      <map-marker [position]="markerPosition" />
      }
    </google-map>
  `,
})
export class MapComponent implements AfterViewInit {
  @ViewChild(GoogleMap) map?: GoogleMap;

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() latitude?: number;
  @Input() longitude?: number;

  markerPosition?: google.maps.LatLngLiteral;

  ngAfterViewInit(): void {
    this.map?.googleMap?.setOptions({
      disableDefaultUI: true,
      gestureHandling: 'none',
      draggable: false,
      scrollwheel: false,
      cameraControl: false,
    });
    if (this.latitude && this.longitude) {
      this.map?.googleMap?.setCenter({
        lat: this.latitude,
        lng: this.longitude,
      });
      this.map?.googleMap?.setZoom(17);
      this.markerPosition = {
        lat: this.latitude,
        lng: this.longitude,
      };
    }
  }
}
