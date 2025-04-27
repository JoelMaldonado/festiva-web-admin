import { EventDto } from '@dto/event.dto';

export class Event {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public eventDatetime: Date,
    public idClub: number,
    public nameClub: string,
    public idEventCategory: number,
    public idStatus: number
  ) {}

  static fromDto(dto: EventDto): Event {
    return new Event(
      dto.id,
      dto.title,
      dto.description,
      dto.imageUrl,
      new Date(dto.eventDatetime),
      dto.idClub,
      dto.nameClub,
      dto.idEventCategory,
      dto.idStatus
    );
  }
}
