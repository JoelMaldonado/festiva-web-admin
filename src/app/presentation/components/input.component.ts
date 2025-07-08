import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative w-full flex flex-col">
      <label [for]="label" class="text-xs pl-4 font-medium text-b1">
        {{ label }}
      </label>
      <input
        type="text"
        [id]="label"
        [placeholder]="placeholder ?? ''"
        class="w-full px-4 py-2 border-2 border-b3 rounded-full focus:outline-none focus:border-p1 transition-all bg-b3 text-white placeholder-t2"
        [ngClass]="{
          'border-red focus:border-red': error
        }"
        [value]="model"
        (input)="onChange($event)"
      />
      @if (error) {
      <span class="pl-4 text-xs text-red">{{ error }}</span>
      }
    </div>
  `,
})
export class InputComponent {
  @Input({ required: true }) label!: string;
  @Input() placeholder?: string;
  @Input() model!: string;
  @Input() error?: string;
  @Output() modelChange = new EventEmitter<string>();

  onChange(event: Event) {
    this.modelChange.emit((event.target as HTMLInputElement).value);
  }
}
