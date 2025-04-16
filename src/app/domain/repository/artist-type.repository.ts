import { ArtistType } from '@model/artist-type';

export abstract class ArtistTypeRepository {
  abstract fetchAll(): Promise<ArtistType[]>;
}
