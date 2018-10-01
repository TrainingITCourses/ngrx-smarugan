import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ApiService } from './services/api.service';
import { GlobalStoreService, GlobalSlideTypes } from './store/global-store.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: any = [];

  constructor(private apiService: ApiService, private storeService: GlobalStoreService) {
    // Load data
    this.apiService.getLaunches();
    this.apiService.getAgencies();
    this.apiService.getStatusTypes();
    this.apiService.getMissionTypes();
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
    const filtered = [];
    this.storeService.selectSnapShot(GlobalSlideTypes.launches).filter(launch => {
        if (launch['status'] === critery['id']) {
          filtered.push(launch);
        }
    });
    this.items = filtered;
  }

  private filterByAgency(critery) {
    const filtered = [];
    this.storeService.selectSnapShot(GlobalSlideTypes.launches).filter(launch => {
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
    });
    this.items = filtered;
  }

  private filterByMissionType(critery) {
    const filtered = [];
    this.storeService.selectSnapShot(GlobalSlideTypes.launches).filter(launch => {
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
  }
}
