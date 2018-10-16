import { Action } from '@ngrx/store';

export enum AgencyActionTypes {
  LoadAgencies = '[Agency] Load Agencies',
  LoadedAgencies = '[Agency] Loaded Agencies',
  ErrAgencies = '[Agency] Error'
}

export class LoadAgencies implements Action {
  readonly type = AgencyActionTypes.LoadAgencies;
}

export class LoadedAgencies implements Action {
  readonly type = AgencyActionTypes.LoadedAgencies;

  constructor(readonly payload?: any) {}
}

export class ErrAgencies implements Action {
  readonly type = AgencyActionTypes.ErrAgencies;

  constructor(readonly payload?: any) {}
}

export type AgencyActions = LoadAgencies | LoadedAgencies | ErrAgencies;
