import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-event',
  imports: [CommonModule],
  template: `
    <div
      class="overflow-hidden transition shadow-xl bg-zinc-900 rounded-2xl hover:shadow-2xl"
    >
      @if (!hideImg) {
      <img
        [src]="imageUrl"
        alt="Evento"
        class="object-cover w-full h-40"
        (error)="hideImg = true"
      />
      }@else {
      <img
        src="festiva_large.png"
        alt="Festiva"
        class="w-full h-40 object-contain p-6"
      />
      }
      <div class="p-4 space-y-2">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p class="text-sm text-gray-400 line-clamp-3">
          {{ description }}
        </p>
        <div class="text-sm text-gray-300">
          <p>
            <span class="font-semibold">Fecha:</span>
            {{ date | date : 'dd/MM/yyyy' }}
          </p>
          <p>
            <span class="font-semibold">Hora: </span
            >{{ date | date : 'HH:mm a' }}
          </p>
          <p><span class="font-semibold">Artista:</span> DJ Luminous</p>
          <p><span class="font-semibold">Club:</span> {{ nameClub }}</p>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class CardComponent {
  @Input() imageUrl?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() nameClub?: string;
  @Input() date?: Date;

  hideImg = false;
}
