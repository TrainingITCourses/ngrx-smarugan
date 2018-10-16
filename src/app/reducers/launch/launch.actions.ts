import { Action } from '@ngrx/store';

export enum LaunchActionTypes {
  LoadLaunches = '[Launch] Load Launches',
  LoadedLaunches = '[Launch] Loaded Launches',
  ErrLaunches = '[Launch] Error'
}

export class LoadLaunches implements Action {
  readonly type = LaunchActionTypes.LoadLaunches;
}

export class LoadedLaunches implements Action {
  readonly type = LaunchActionTypes.LoadedLaunches;

  constructor(readonly payload?: any) {}
}

export class ErrLaunches implements Action {
  readonly type = LaunchActionTypes.ErrLaunches;

  constructor(readonly payload?: any) {}
}

export type LaunchActions = LoadLaunches | LoadedLaunches | ErrLaunches;
