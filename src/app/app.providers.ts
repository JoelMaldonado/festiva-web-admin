import { Provider } from '@angular/core';
import { ArtistRepositoryImpl } from '@impl/artist.repository.impl';
import { ArtistRepository } from '@repository/artist.repository';

export const appProviders: Provider[] = [
  {
    provide: ArtistRepository,
    useClass: ArtistRepositoryImpl,
  },
];
