import { Artist } from '@interfaces/artist';

export abstract class ArtistRepository {
  abstract fetchAll(): Promise<Artist[]>;
}
