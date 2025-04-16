import { ArtistTypeDto } from 'app/data/dto/artist-type.dto';

export class ArtistType {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDto(dto: ArtistTypeDto): ArtistType {
    return new ArtistType(dto.id ?? 0, dto.name ?? '');
  }
}
