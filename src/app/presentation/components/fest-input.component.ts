import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'fest-input',
  template: `
    <div class="relative">
      @if (label) {
      <label class="ms-2 text-white text-sm" [for]="inputId">{{ label }}</label>
      }

      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled || loading"
        [attr.maxlength]="maxLength ?? null"
        [attr.aria-busy]="loading ? 'true' : null"
        class="w-full rounded-xl border border-white/10 bg-b4 px-4 py-2.5 text-white
               placeholder:text-t2 outline-none focus:ring-2 focus:ring-p1/70
               disabled:opacity-50 disabled:cursor-not-allowed"
        [class.pr-10]="loading"
        autocomplete="off"
        (input)="onInput($event)"
        (blur)="touched.emit()"
        (keyup.enter)="enter.emit()"
      />

      <!-- Spinner a la derecha cuando loading=true -->
      @if (loading) {
      <span
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
        aria-hidden="true"
      >
        <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="3"
            class="opacity-25"
          />
          <path d="M4 12a8 8 0 018-8" fill="currentColor" class="opacity-90" />
        </svg>
      </span>
      } @if (maxLength !== undefined) {
      <div class="mt-1 text-end text-xs text-t2">
        {{ value.length || 0 }}/{{ maxLength }}
      </div>
      }
    </div>
  `,
})
export class FestInputComponent {
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() maxLength?: number;
  @Input() type: 'text' | 'email' | 'number' | 'password' = 'text';
  @Input() disabled = false;
  @Input() loading = false;

  // 🔑 Two-way binding
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  // Eventos útiles
  @Output() enter = new EventEmitter<void>();
  @Output() touched = new EventEmitter<void>();

  inputId = 'fi-' + Math.random().toString(36).slice(2);

  onInput(e: Event) {
    const next = (e.target as HTMLInputElement).value ?? '';
    this.value = next;
    this.valueChange.emit(next);
  }
}
