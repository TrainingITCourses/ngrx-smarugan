import { Action } from '@ngrx/store';

export enum StatusActionTypes {
  LoadStatuses = '[Status] Load Statuses',
  LoadedStatuses = '[Status] Loaded Statuses'
}

export class LoadStatuses implements Action {
  readonly type = StatusActionTypes.LoadStatuses;
}

export class LoadedStatuses implements Action {
  readonly type = StatusActionTypes.LoadedStatuses;

  constructor(readonly payload?: any) {}
}

export type StatusActions = LoadStatuses | LoadedStatuses;
