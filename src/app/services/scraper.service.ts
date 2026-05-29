import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'environments/environment';

export type ScriptType = 'scrape' | 'promote';

@Injectable({ providedIn: 'root' })
export class ScraperService {
  private readonly url = `${environment.baseUrl}/scraper`;
  private readonly http = inject(HttpClient);

  async run(script: ScriptType): Promise<string> {
    const res = await firstValueFrom(
      this.http.post<{ jobId: string }>(`${this.url}/run`, { script })
    );
    return res.jobId;
  }

  stream(jobId: string): EventSource {
    return new EventSource(`${this.url}/stream/${jobId}`);
  }
}
