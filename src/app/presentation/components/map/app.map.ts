import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-map',
  imports: [MapComponent],

  template: `<mgl-map
    [style]="'mapbox://styles/mapbox/streets-v12'"
    [zoom]="[9]"
    [center]="[-74.5, 40]"
  />`,
  styles: [
    `
      mgl-map {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class AppMap {}
