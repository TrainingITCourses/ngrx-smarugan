import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from './reducers';
import { LoadLaunches } from './reducers/launch/launch.actions';
import { LoadStatuses } from './reducers/status/status.actions';
import { LoadAgencies } from './reducers/agency/agency.actions';
import { LoadMissionTypes } from './reducers/mission-type/mission-type.actions';
import { map } from 'rxjs/operators';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { StatusService } from './services/status.service';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appVersion = 21;
  public messageLaunches$: Observable<String>;
  public messageAgencies$: Observable<String>;
  public messageStatuses$: Observable<String>;
  public messageMissionTypes$: Observable<String>;
  public items: any = [];

  constructor(private store: Store<State>, swUpdate: SwUpdate, private statusService: StatusService) {
    this.messageLaunches$ = this.statusService.messageLaunches$;
    this.messageAgencies$ = this.statusService.messageAgencies$;
    this.messageStatuses$ = this.statusService.messageStatuses$;
    this.messageMissionTypes$ = this.statusService.messageMissionTypes$;

    // Load data
    this.store.dispatch(new LoadLaunches());
    this.store.dispatch(new LoadStatuses());
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadMissionTypes());

    if (swUpdate.isEnabled) {
      swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        const msg = 'New version available. Download now?';
        if (confirm(msg)) { window.location.reload(); }
      });
    }
  }

  filterLaunches(critery) {
    console.log('FILTER TO APPLY: ', critery);
    switch (critery['type']) {
      case 'status':
        this.filterByStatus(critery);
        break;
      case 'agency':
        this.filterByAgency(critery);
        break;
      case 'missionType':
        this.filterByMissionType(critery);
        break;
      default:
        this.items = [];
    }
  }

  private filterByStatus(critery) {
    this.store.select('launch').pipe(
      map(st => st.launches),
    ).subscribe((launches) => {
      this.items = launches.filter(launch => {
        return launch['status'] === critery['id'];
      });
    });
  }

  private filterByAgency(critery) {
    this.store.select('launch').pipe(
      map(st => st.launches)
    ).subscribe((launches) => {
      const filtered = [];
      for (const launch of launches) {
        let includedLaunch = false;
        // Agencies can be on rocket property
        if (launch['rocket'] !== null && launch['rocket']['agencies'] !== null) {
          for (const agency of launch['rocket']['agencies']) {
            if (agency['id'] === critery['id']) {
              filtered.push(launch);
              includedLaunch = true;
              break;
            }
          }
        }
        // Agencies can be on missions property
        if (!includedLaunch && launch['missions'] !== null) {
          for (const mission of launch['missions']) {
            if (!includedLaunch && mission['agencies'] !== null) {
              for (const agency of mission['agencies']) {
                if (agency['id'] === critery['id']) {
                  filtered.push(launch);
                  includedLaunch = true;
                  break;
                }
              }
            }
          }
        }
      }
      this.items = filtered;
    });
  }

  private filterByMissionType(critery) {
    this.store.select('launch').pipe(
      map(st => st.launches)
    ).subscribe((launches) => {
      const filtered = [];
      launches.filter(launch => {
        if (launch['missions'] !== null) {
          for (const mission of launch['missions']) {
            if (mission['type'] === critery['id']) {
              filtered.push(launch);
              break;
            }
          }
        }
      });
      this.items = filtered;
    });
  }
}
