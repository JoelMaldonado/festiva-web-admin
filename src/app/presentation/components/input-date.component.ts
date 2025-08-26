import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-input-date',
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
        inputId="eventDate"
        showIcon
        iconDisplay="input"
        dateFormat="dd/mm/yy"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        [minDate]="minDate"
        [maxDate]="maxDate"
      />
      <label for="eventDate">{{ label }}</label>
    </p-floatlabel>
  `,
})
export class AppInputDateComponent {
  @Input() label!: string;

  @Input() value!: Date | null;
  @Output() valueChange = new EventEmitter<Date | null>();

  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  onChange(value: Date | null) {
    this.valueChange.emit(value);
  }
}
