import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule, FloatLabel, InputText],
  template: `
    <div>
      <p-floatlabel variant="on">
        <input
          pInputText
          [id]="id"
          autocomplete="off"
          class="w-full"
          [value]="model"
          (input)="onChange($event)"
        />
        <label [for]="id">{{ label }}</label>
      </p-floatlabel>
      @if (error) {
      <span class="pl-4 text-xs text-red">{{ error }}</span>
      }
    </div>
  `,
})
export class InputComponent {
  @Input() id?: string;
  @Input() label?: string;
  //@Input() placeholder: string = '';
  @Input() model: string = '';
  @Input() error?: string;
  @Output() modelChange = new EventEmitter<string>();

  onChange(event: Event) {
    this.modelChange.emit((event.target as HTMLInputElement).value);
  }
}
