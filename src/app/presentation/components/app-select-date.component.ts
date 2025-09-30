import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-select-date',
  imports: [
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-center gap-3 select-none">
        <!-- Prev -->
        <button
          type="button"
          (click)="shift(-1)"
          class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 active:scale-95 ring-1 ring-white/10 transition"
          aria-label="Día anterior"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>

        <!-- Centro: muestra fecha y abre el datepicker (anclado aquí) -->
        <div
          class="relative min-w-[160px] text-center font-semibold text-white bg-neutral-900 px-4 py-2 rounded-lg ring-1 ring-white/10 hover:ring-pink-400/50 hover:shadow-[0_0_0_3px_rgba(255,64,129,0.15)] transition cursor-pointer"
          (click)="picker.open()"
          tabindex="0"
          (keyup.enter)="picker.open()"
          aria-label="Abrir calendario"
        >
          {{ daySelected | date : 'dd/MM/yyyy' }}

          <!-- mat-form-field invisible, ocupa el área del contenedor como ancla -->
          <mat-form-field
            class="absolute inset-0 opacity-0 pointer-events-none m-0 p-0 w-full h-full"
          >
            <input
              matInput
              [matDatepicker]="picker"
              [min]="minDate"
              [max]="maxDate"
              [value]="daySelected"
              (dateChange)="onDatePicked($event.value)"
            />
          </mat-form-field>
        </div>

        <!-- Next -->
        <button
          type="button"
          (click)="shift(1)"
          class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 active:scale-95 ring-1 ring-white/10 transition"
          aria-label="Día siguiente"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>

      <!-- Datepicker anclado al input de arriba -->
      <mat-datepicker #picker></mat-datepicker>
    </div>
  `,
})
export class AppSelectDateComponent {
  @Input() daySelected!: Date;
  @Output() daySelectedChange = new EventEmitter<Date>();

  // minDate y maxDate para el datepicker
  minDate = new Date(2025, 9, 5);
  maxDate = new Date(2025, 9, 29);

  shift(deltaDays: number) {
    const d = new Date(this.daySelected);
    d.setDate(d.getDate() + deltaDays);
    this.daySelected = d;
    this.daySelectedChange.emit(this.daySelected);
  }

  onDatePicked(date: Date | null) {
    if (!date) return;
    this.daySelected = date;
    this.daySelectedChange.emit(this.daySelected);
  }
}
