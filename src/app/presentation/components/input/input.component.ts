import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
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
