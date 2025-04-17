import { SocialNetworkDto } from '@dto/social-network.dto';

export class SocialNetwork {
  constructor(
    public id: number,
    public name: string,
    public logoUrl: string | null,
    public idStatus: number
  ) {}

  static fromDto(dto: SocialNetworkDto): SocialNetwork {
    return new SocialNetwork(dto.id, dto.name, dto.logoUrl, dto.idStatus);
  }
}
