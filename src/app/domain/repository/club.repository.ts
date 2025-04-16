import { Club } from '@interfaces/club';
import { Result } from '@interfaces/result';
import { Observable } from 'rxjs';

export abstract class ClubRepository {
  abstract fetchAll(): Observable<Result<Club[]>>;
}
