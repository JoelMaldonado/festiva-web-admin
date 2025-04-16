import { Club } from 'app/data/dto/club';
import { Result } from 'app/data/dto/result';
import { Observable } from 'rxjs';

export abstract class ClubRepository {
  abstract fetchAll(): Observable<Result<Club[]>>;
}
