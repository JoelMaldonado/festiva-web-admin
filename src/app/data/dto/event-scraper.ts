export interface EventScraper {
  id: number;
  externalId: string;
  clubId: number;
  title: string;
  date: string;
  description: string | null;
  imageUrl: string | null;
  ticketUrl: string | null;
  tags: string[] | null;
  categories: string[] | null;
  eventId: number | null;
  status: 'pending' | 'approved' | 'rejected';
  scrapedAt: string | null;
}
