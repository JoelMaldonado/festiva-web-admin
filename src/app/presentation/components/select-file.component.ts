import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-file',
  imports: [MatIconModule],
  template: `
    <div class="w-full flex flex-col">
      <label [for]="label" class="text-xs pl-4 font-medium text-b1">
        {{ label }}
      </label>
      <a
        class="w-full bg-b3 rounded-full flex flex-row items-center justify-between px-4 py-2 text-white hover:bg-b1 transition-all duration-300 active:bg-b3 cursor-pointer select-none"
        (click)="value != null ? clear() : inputFile.click()"
      >
        @if (value) {
        <span>{{ value.name }}</span>
        <mat-icon>close</mat-icon>
        } @else {
        <span class="text-t2">Seleccionar archivo</span>
        <mat-icon class="text-t2">attach_file</mat-icon>
        }
      </a>
      <input
        #inputFile
        hidden
        type="file"
        [id]="label"
        (change)="onChange($event)"
      />
    </div>
  `,
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
