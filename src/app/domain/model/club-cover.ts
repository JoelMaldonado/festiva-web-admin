import { ClubCoverDto } from '@dto/club-cover.dto';

export class ClubCover {
  id: number;
  imageUrl: string;

  constructor(id: number, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }

  static fromDto(dto: ClubCoverDto): ClubCover {
    return new ClubCover(dto.id, dto.imageUrl);
  }
}
