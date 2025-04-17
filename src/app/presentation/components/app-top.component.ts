import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: ` <div>
    <div class="flex items-center gap-2">
      <button mat-icon-button matTooltip="Back" (click)="goBack()">
        <mat-icon class="text-t1">arrow_back</mat-icon>
      </button>
      @if (title) {
      <h1 class="text-2xl font-bold text-t1">{{ title }}</h1>
      }
    </div>
  </div>`,
})
export class AppTopComponent {
  @Input() title?: string;

  goBack() {
    window.history.back();
  }
}
