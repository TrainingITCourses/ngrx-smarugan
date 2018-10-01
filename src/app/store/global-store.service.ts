import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalState, initialState } from './models/global.model';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  private state: GlobalState = { ...initialState };
  //  BehaviorSubject is a kind of Observable with inital value
  private launches$ = new BehaviorSubject<any>(this.state.launches);
  private statuses$ = new BehaviorSubject<any>(this.state.statuses);
  private agencies$ = new BehaviorSubject<any>(this.state.agencies);
  private missionTypes$ = new BehaviorSubject<any>(this.state.missionTypes);

  constructor() { }

  // Status mutation using reducer function
  public dispatch(action: GlobalActions) {
    console.log('[dispatch] Dispatching ', action);
    this.state = globalStoreReducer(this.state, action);

    switch (action.type) {
      case GlobalActionTypes.LoadLaunches:
        this.launches$.next([ ...this.state.launches ]);
        break;
      case GlobalActionTypes.LoadStatuses:
        this.statuses$.next([ ...this.state.statuses ]);
        break;
      case GlobalActionTypes.LoadAgencies:
        this.agencies$.next([ ...this.state.agencies ]);
        break;
      case GlobalActionTypes.LoadMissionTypes:
        this.missionTypes$.next([ ...this.state.missionTypes ]);
        break;
    }
  }

  public select$(slice: GlobalSlideTypes): Observable<any> {
    console.log('[select] Selecting ', slice);
    switch (slice) {
      case GlobalSlideTypes.launches:
        return this.launches$.asObservable();
      case GlobalSlideTypes.statuses:
        return this.statuses$.asObservable();
      case GlobalSlideTypes.agencies:
        return this.agencies$.asObservable();
      case GlobalSlideTypes.missionTypes:
        return this.missionTypes$.asObservable();
    }
  }

  public selectSnapShot(slice: GlobalSlideTypes) {
    switch (slice) {
      case GlobalSlideTypes.launches:
        return [ ...this.state.launches ];
        case GlobalSlideTypes.statuses:
          return [ ...this.state.statuses ];
      case GlobalSlideTypes.agencies:
        return [ ...this.state.agencies ];
      case GlobalSlideTypes.missionTypes:
        return [ ...this.state.missionTypes ];
    }
  }
}

export enum GlobalSlideTypes {
  launches,
  statuses,
  agencies,
  missionTypes
}
