import { Action } from '@ngrx/store';

export enum LaunchActionTypes {
  LoadLaunches = '[Launch] Load Launches',
  LoadedLaunches = '[Launch] Loaded Launches'
}

export class LoadLaunches implements Action {
  readonly type = LaunchActionTypes.LoadLaunches;
}

export class LoadedLaunches implements Action {
  readonly type = LaunchActionTypes.LoadedLaunches;

  constructor(readonly payload?: any) {}
}

export type LaunchActions = LoadLaunches | LoadedLaunches;
