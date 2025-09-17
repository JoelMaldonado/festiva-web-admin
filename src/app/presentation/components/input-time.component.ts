import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-input-time',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
    DatePickerModule,
  ],
  standalone: true,
  template: `
    <p-floatlabel variant="on">
      <p-datepicker
        inputId="startTime"
        timeOnly="true"
        hourFormat="24"
        showIcon
        iconDisplay="input"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
      />
      <label for="startTime">{{ label }}</label>
    </p-floatlabel>
  `,
})
export class InputTimeComponent {
  @Input() label!: string;

  @Input() value!: string | null;
  @Output() valueChange = new EventEmitter<string | null>();

  onChange(value: string | null) {
    this.valueChange.emit(value);
  }
}
