import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  template: `
    <button
      type="button"
      [disabled]="isLoading"
      [ngClass]="getStyle()"
      class="select-none inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      (click)="onClick()"
    >
      <!-- Spinner -->
      @if (isLoading) {
      <svg
        class="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      } @else {
      <span>{{ label }}</span>
      }
    </button>
  `,
})
export class AppButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() type: 'primary' | 'outline' = 'primary';
  @Input() isLoading: boolean = false;

  @Output() pressed = new EventEmitter<void>();

  getStyle() {
    switch (this.type) {
      case 'primary':
        return 'rounded-xl px-4 py-2 text-sm font-semibold text-white bg-p1 hover:bg-p1/90 active:bg-p1/80';
      case 'outline':
        return 'rounded-xl px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:bg-neutral-100 dark:active:bg-neutral-700';
      default:
        return '';
    }
  }

  onClick(): void {
    this.pressed.emit();
  }
}
