import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-artist',
  template: `
    <div
      class="w-full h-full flex flex-col items-center p-6 overflow-hidden text-center transition shadow-xl bg-zinc-900 rounded-2xl hover:shadow-2xl"
    >
      <img
        [src]="fotoUrl"
        [alt]="name"
        class="w-28 h-28 object-cover mb-4 border-4 border-pink-500 rounded-full block"
      />
      <h3 class="text-lg font-bold">{{ name }}</h3>
      <p class="mb-2 text-sm text-gray-400">Cantante / Actriz</p>
      <p class="mb-1 text-sm text-gray-300 line-clamp-3">
        {{ description }}
      </p>
      <!--
      <span class="text-xs text-gray-500">12 eventos registrados</span>
--></div>
  `,
})
export class CardArtistComponent {
  @Input({ required: true }) name!: string;
  @Input() fotoUrl?: string;
  @Input() description?: string;
}
