import { Action } from '@ngrx/store';

export enum MissionTypeActionTypes {
  LoadMissionTypes = '[MissionType] Load MissionTypes',
  LoadedMissionTypes = '[MissionType] Loaded MissionTypes'
}

export class LoadMissionTypes implements Action {
  readonly type = MissionTypeActionTypes.LoadMissionTypes;
}

export class LoadedMissionTypes implements Action {
  readonly type = MissionTypeActionTypes.LoadedMissionTypes;

  constructor(readonly payload?: any) {}
}

export type MissionTypeActions = LoadMissionTypes | LoadedMissionTypes;
