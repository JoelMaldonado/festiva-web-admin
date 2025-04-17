import { Provider } from '@angular/core';
import { ArtistRepository } from '@repository/artist.repository';
import { ArtistRepositoryImpl } from '@impl/artist.repository.impl';
import { CommonRepository } from '@repository/common.repository';
import { CommonRepositoryImpl } from '@impl/common.repository.impl';

export const appProviders: Provider[] = [
  {
    provide: ArtistRepository,
    useClass: ArtistRepositoryImpl,
  },
  {
    provide: CommonRepository,
    useClass: CommonRepositoryImpl,
  },
];
