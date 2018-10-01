
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from '../store/global-store.service';
import { LoadLaunches, LoadAgencies, LoadStatuses, LoadMissionTypes } from '../store/global-store.actions';

// 'https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000'
// environment.url + '/assets/launchlibrary.json'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private key = 'launches';

  constructor(private http: HttpClient, private storeService: GlobalStoreService) {}

  public getLaunches = () => {
    const localLaunches = localStorage.getItem(this.key);
    if (localLaunches) {
      this.storeService.dispatch(new LoadLaunches(JSON.parse(localLaunches)));
    } else {
      this.http
      .get('https://launchlibrary.net/1.4/launch/1950-01-01?limit=2000')
      .pipe(map((res: any) => res.launches))
      .subscribe((launches) => {
        localStorage.setItem(this.key, JSON.stringify(launches));
        this.storeService.dispatch(new LoadLaunches(launches));
      });
    }
  }

  public getAgencies = () =>
    this.http
      .get(environment.url + '/assets/launchagencies.json')
      .pipe(
        map((res: any) => res.agencies),
        map(res => res.sort((a, b) => a['abbrev'] < b['abbrev'] ? -1 : 1)) // sorting results
      )
      .subscribe((agencies) => {
        this.storeService.dispatch(new LoadAgencies(agencies));
      })

  public getMissionTypes = () =>
    this.http
      .get(environment.url + '/assets/launchmissions.json')
      .pipe(
        map((res: any) => res.types),
        map(res => res.sort((a, b) => a['name'] < b['name'] ? -1 : 1)) // sorting results
      )
      .subscribe((missionTypes) => {
        this.storeService.dispatch(new LoadMissionTypes(missionTypes));
      })

  public getStatusTypes = () =>
    this.http.get(environment.url + '/assets/launchstatus.json')
    .pipe(
      map((res: any) => res.types),
      map(res => res.sort((a, b) => a['name'] < b['name'] ? -1 : 1)), // sorting results
      map((res: any[]) => res.map(this.setStatusColor))
    ).subscribe((statuses) => {
      this.storeService.dispatch(new LoadStatuses(statuses));
    })

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
