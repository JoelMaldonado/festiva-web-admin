import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'fest-text-area',
  template: `
    <div class="relative">
      @if (label) {
      <label class="ms-2 text-white text-sm" [for]="inputId">
        {{ label }}
        @if (required) {
        <span class="text-rose-300/90 text-xs">Required</span>
        }
      </label>
      }

      <textarea
        [id]="inputId"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [attr.maxlength]="maxLength ?? null"
        class="w-full rounded-xl border border-white/10 bg-b4 px-4 py-2.5 text-white
               placeholder:text-t2 outline-none focus:ring-2 focus:ring-p1/70
               disabled:opacity-50 disabled:cursor-not-allowed mt-2 resize-none"
        autocomplete="off"
        (input)="onInput($event)"
        (blur)="touched.emit()"
        (keyup.enter)="enter.emit()"
        [rows]="rows"
      >
        {{ value }}
      </textarea
      >

      @if (maxLength !== undefined) {
      <div class="mt-1 text-end text-xs text-t2">
        {{ value.length || 0 }}/{{ maxLength }}
      </div>
      }
    </div>
  `,
})
export class FestTextAreaComponent {
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() maxLength?: number;
  @Input() disabled = false;
  @Input() required = false;
  @Input() rows = 3;

  // 🔑 Two-way binding
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  // Eventos útiles
  @Output() enter = new EventEmitter<void>();
  @Output() touched = new EventEmitter<void>();

  inputId = 'ta-' + Math.random().toString(36).slice(2);

  onInput(e: Event) {
    const next = (e.target as HTMLTextAreaElement).value ?? '';
    this.value = next;
    this.valueChange.emit(next);
  }
}
