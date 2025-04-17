import { ArtistType } from '@model/artist-type';
import { StatusEnum } from 'app/data/enum/status-enum';

export abstract class ArtistTypeRepository {
  abstract fetchAll(status: StatusEnum): Promise<ArtistType[]>;
  abstract create(name: string): Promise<void>;
  abstract update(id: number, name: string): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract restore(id: number): Promise<void>;
}
