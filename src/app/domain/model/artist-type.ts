import { ArtistTypeDto } from 'app/data/dto/artist-type.dto';

export class ArtistType {
  id: number;
  name: string;
  statusId: number;

  constructor(id: number, name: string, statusId: number) {
    this.id = id;
    this.name = name;
    this.statusId = statusId;
  }

  static fromDto(dto: ArtistTypeDto): ArtistType {
    return new ArtistType(dto.id ?? 0, dto.name ?? '', dto.statusId ?? 0);
  }
}
