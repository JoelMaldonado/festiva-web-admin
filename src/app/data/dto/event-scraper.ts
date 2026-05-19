export interface EventScraper {
  id: number;
  title: string;
  date: string;
  venue: string;
  venueId: number;
  city: string;
  description: string;
  time: string;
  ticketUrl: string;
  imageUrl: string;
  eventUrl: string;
  sourceUrl: string;
  source: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
