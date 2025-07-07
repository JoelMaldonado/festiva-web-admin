import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-file',
  imports: [MatIconModule],
  templateUrl: './select-file.component.html',
})
export class SelectFileComponent {
  @Input({ required: true }) label!: string;
  @Input() placeholder?: string;
  @Input() value?: File;
  @Output() valueChange = new EventEmitter<File | undefined>();

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.valueChange.emit(file);
    }
  }

  clear() {
    this.valueChange.emit(undefined);
  }
}
