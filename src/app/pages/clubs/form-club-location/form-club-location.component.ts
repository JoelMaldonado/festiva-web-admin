import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-club-location',
  templateUrl: './form-club-location.component.html',
})
export class FormClubLocationComponet {
  @Input() id!: string;
  @Input() idClub: string = 'asd';
}
