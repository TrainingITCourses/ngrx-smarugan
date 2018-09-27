import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from './services/api.service';

import { filter, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: any = [];

  constructor(private apiService: ApiService) {}

  filterLaunches(critery) {
    console.log('FILTER TO APPLY: ', critery);
    switch (critery['type']) {
      case 'status':
        this.filterByStatus(critery);
        break;
      case 'agency':
        this.filterByAgency(critery);
        break;
      case 'type':
        this.filterByType(critery);
        break;
    }
  }

  private filterByStatus(critery) {
    this.apiService.getLaunches$().subscribe(launches => {
      this.items = launches.filter(launch => {
        return launch['status'] === critery['value']['id'];
      });
    });
  }

  private filterByAgency(critery) {
    this.apiService.getLaunches$().subscribe(launches => {
      const filtered = [];
      for (const launch of launches) {
        let includedLaunch = false;
        // Agencies can be on rocket property
        if (launch['rocket'] !== null && launch['rocket']['agencies'] !== null) {
          for (const agency of launch['rocket']['agencies']) {
            if (agency['id'] === critery['value']['id']) {
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
                if (agency['id'] === critery['value']['id']) {
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

  private filterByType(critery) {
    this.apiService.getLaunches$().subscribe(launches => {
      const filtered = [];
      for (const launch of launches) {
        if (launch['missions'] !== null) {
          for (const mission of launch['missions']) {
            if (mission['type'] === critery['value']['id']) {
              filtered.push(launch);
              break;
            }
          }
        }
      }
      this.items = filtered;
    });
  }
}
