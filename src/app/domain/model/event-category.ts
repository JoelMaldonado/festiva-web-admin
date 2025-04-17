import { EventCategoryDto } from '@dto/event-category.dto';

export class EventCategory {
  constructor(
    public id: number,
    public name: string,
    public statusId: number
  ) {}

  static fromDto(dto: EventCategoryDto): EventCategory {
    return new EventCategory(dto.id, dto.title, dto.idStatus);
  }
}
