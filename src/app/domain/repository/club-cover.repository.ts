import { Result } from '@dto/result';
import { ClubCover } from '@model/club-cover';
import { Observable } from 'rxjs';

export abstract class ClubCoverRepository {
  abstract fetchAll(idClub: number): Observable<ClubCover[]>;
  abstract create(idClub: number, imageUrl: string): Observable<number | null>;
  abstract delete(id: number): Observable<Result<any>>;
}
