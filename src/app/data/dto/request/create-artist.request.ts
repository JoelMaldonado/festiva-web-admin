export interface CreateArtistRequest {
  name: string;
  idArtistType: number;
  description?: string | null;
  biography?: string | null;
  profileUrl?: string | null;
  profile2Url?: string | null;
}
