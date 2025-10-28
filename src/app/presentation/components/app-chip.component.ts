import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-chip',
  imports: [CommonModule, MatIconModule],
  template: `
    <button
      class="w-full h-12 flex flex-row items-center bg-neutral-900 rounded-2xl justify-center border cursor-pointer ps-4 pr-2 gap-2"
      [ngClass]="{
        'border-p1': value,
        'border-transparent': !value
      }"
      (click)="onValueChange()"
    >
      <span class="flex-1 text-sm font-bold select-none text-start">
        {{ title }}</span
      >
      <div
        class="flex items-center justify-center"
        [ngClass]="{
          'text-p1': value,
          'text-neutral-500': !value
        }"
      >
        <mat-icon>check_circle</mat-icon>
      </div>
    </button>
  `,
})
export class AppChipComponent {
  @Input() id!: number;
  @Input({ required: true }) title!: string;
  @Input() value = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onValueChange() {
    this.valueChange.emit(!this.value);
  }
}
