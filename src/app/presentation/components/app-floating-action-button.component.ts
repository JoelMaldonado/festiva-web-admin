import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-floating-action-button',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ButtonModule,
  ],
  template: `
    <button
      matFab
      [matTooltip]="tooltip"
      (click)="clicked.emit()"
      class="custom-fab"
    >
      <mat-icon [fontIcon]="matIcon" [inline]="false"></mat-icon>
    </button>
  `,
  styles: `
    .custom-fab {
      background-color: #FF4081 !important;
      color: #fff !important;
    }
  `,
})
export class AppFloatingActionButton {
  @Input() matIcon!: string;
  @Input() tooltip: string = '';
  @Output() clicked = new EventEmitter<void>();
}
