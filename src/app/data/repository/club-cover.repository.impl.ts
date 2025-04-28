import { inject, Injectable } from '@angular/core';
import { Result } from '@dto/result';
import { ClubCover } from '@model/club-cover';
import { ClubCoverRepository } from '@repository/club-cover.repository';
import { ClubCoverService } from '@services/club-cover.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubCoverRepositoryImpl extends ClubCoverRepository {
  private readonly service = inject(ClubCoverService);

  override fetchAll(idClub: number): Observable<ClubCover[]> {
    return this.service.fetchAll(idClub).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data?.map((e) => ClubCover.fromDto(e)) ?? [];
      })
    );
  }
  override create(idClub: number, imageUrl: string): Observable<number | null> {
    return this.service.create(idClub, imageUrl).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res.data ?? null;
      })
    );
  }
  override delete(id: number): Observable<Result<any>> {
    return this.service.delete(id).pipe(
      map((res) => {
        if (!res.isSuccess) {
          throw new Error(res.message);
        }
        return res;
      })
    );
  }
}
