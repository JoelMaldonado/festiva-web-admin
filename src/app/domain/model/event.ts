export interface EventModel {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  eventDate: Date;
  startTime: string;
  idClub: number;
  nameClub: string;
  idEventCategory: number;
  idStatus: number;

  clubLogoUrl: string;
  clubName: string;
  location: string;
}
