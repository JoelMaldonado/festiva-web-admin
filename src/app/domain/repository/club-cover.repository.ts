import { Result } from '@dto/result';
import { ClubCover } from '@model/club-cover';
import { Observable } from 'rxjs';

export abstract class ClubCoverRepository {
  abstract fetchAll(idClub: number): Observable<ClubCover[]>;
}
