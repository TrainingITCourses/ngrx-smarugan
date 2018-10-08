import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromLaunch from './launch/launch.reducer';
import * as fromStatus from './status/status.reducer';
import * as fromAgency from './agency/agency.reducer';
import * as fromMissionType from './mission-type/mission-type.reducer';

export interface State {
  launch: fromLaunch.State;
  status: fromStatus.State;
  agency: fromAgency.State;
  missionType: fromMissionType.State;
}

export const reducers: ActionReducerMap<State> = {
  launch: fromLaunch.reducer,
  status: fromStatus.reducer,
  agency: fromAgency.reducer,
  missionType: fromMissionType.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
