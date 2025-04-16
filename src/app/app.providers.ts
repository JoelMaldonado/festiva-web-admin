import { Provider } from '@angular/core';
import { ArtistRepository } from '@repository/artist.repository';
import { ArtistTypeRepository } from '@repository/artist-type.repository';
import { ArtistRepositoryImpl } from '@impl/artist.repository.impl';
import { ArtistTypeRepositoryImpl } from '@impl/artist-type.repository.impl';

export const appProviders: Provider[] = [
  {
    provide: ArtistRepository,
    useClass: ArtistRepositoryImpl,
  },
  {
    provide: ArtistTypeRepository,
    useClass: ArtistTypeRepositoryImpl,
  },
];
