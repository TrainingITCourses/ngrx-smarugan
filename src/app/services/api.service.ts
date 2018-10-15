
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { StatusService } from './status.service';

// 'https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000'
// environment.url + '/assets/launchlibrary.json'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000';
  private key = 'launches';

  constructor(private http: HttpClient) { }

  public getLaunches$ = () =>
    this.http
    .get(this.url)
    .pipe(
      map((res: any) => res.launches)
    )

  public getAgencies$ = () =>
    this.http
      .get(environment.url + '/assets/launchagencies.json')
      .pipe(
        map((res: any) => res.agencies),
        map(res => res.sort((a, b) => a['abbrev'] < b['abbrev'] ? -1 : 1)) // sorting results
      )

  public getMissionTypes$ = () =>
    this.http
      .get(environment.url + '/assets/launchmissions.json')
      .pipe(
        map((res: any) => res.types),
        map(res => res.sort((a, b) => a['name'] < b['name'] ? -1 : 1)) // sorting results
      )

  public getStatuses$ = () =>
    this.http.get(environment.url + '/assets/launchstatus.json')
    .pipe(
      map((res: any) => res.types),
      map(res => res.sort((a, b) => a['name'] < b['name'] ? -1 : 1)), // sorting results
      map((res: any[]) => res.map(this.setStatusColor))
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
