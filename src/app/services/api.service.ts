
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

// 'https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000'
// environment.url + '/assets/launchlibrary.json'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public launches: any[];
  public statuses: any[];
  private key = 'launches';
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: string) {
  }

  public getLaunches$ = (): Observable<any[]> => {
    console.log('platformBroser ', this.platformId, isPlatformBrowser(this.platformId));

    if (isPlatformBrowser(this.platformId)) {
      const launches = localStorage.getItem(this.key);
      if (launches) {
        return of(JSON.parse(launches));
      }
    }

    return this.http
      .get('https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000')
      .pipe(
        map((res: any) => res.launches),
        tap(res => (this.launches = res)),
        tap(res => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.key, JSON.stringify(this.launches));
          }
        })
      );
  }

  public getAgencies = (): Observable<any[]> =>
    this.http
      .get(environment.url + '/assets/launchagencies.json')
      .pipe(map((res: any) => res.agencies))

  public getMissionTypes = (): Observable<any[]> =>
    this.http
      .get(environment.url + '/assets/launchmissions.json')
      .pipe(map((res: any) => res.types))

  public getStatusTypes$ = (): Observable<any[]> =>
    this.http.get(environment.url + '/assets/launchstatus.json').pipe(
      map((res: any) => res.types),
      map((res: any[]) => res.map(this.setStatusColor)),
      tap((res: any[]) => (this.statuses = res))
    )
  private setStatusColor = statusType => {
    switch (statusType.id) {
      case 1:
      case 3:
      case 6:
        statusType.color = 'accent';
        break;
      case 2:
      case 4:
      case 5:
      case 7:
        statusType.class = 'warn';
        break;
      default:
        break;
    }
    return statusType;
  }
}
