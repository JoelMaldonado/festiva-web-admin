import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabel, TextareaModule],
  template: ` <div>
    <p-floatlabel variant="on">
      <textarea
        pTextarea
        [id]="id"
        autocomplete="off"
        class="w-full"
        [value]="model"
        (input)="onChange($event)"
        rows="5"
        cols="30"
        style="resize: none"
      ></textarea>
      <label [for]="id">{{ label }}</label>
    </p-floatlabel>
    @if (error) {
    <span class="pl-4 text-xs text-red">{{ error }}</span>
    }
  </div>`,
})
export class AppTextAreaComponent {
  @Input() id?: string;
  @Input() label?: string;
  @Input() model: string = '';
  @Input() error?: string;
  @Output() modelChange = new EventEmitter<string>();

  onChange(event: Event) {
    this.modelChange.emit((event.target as HTMLTextAreaElement).value);
  }
}
