import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'card-panel-admin',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: ` <div
    class="flex flex-col justify-between p-6 shadow-lg bg-b1 rounded-2xl h-[180px]"
  >
    <div>
      <h2 class="mb-2 text-xl font-semibold">{{ title }}</h2>
      <p class="text-sm text-gray-400 line-clamp-2">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-end mt-6">
      <button mat-raised-button (click)="toDetail.emit()">
        <mat-icon class="mr-2">visibility</mat-icon>
        Ver Todos
      </button>
    </div>
  </div>`,
})
export class CardPanelAdminComponent {
  @Input({ required: true }) title!: string;
  @Input() description?: string;

  @Output() toDetail = new EventEmitter<void>();
}
