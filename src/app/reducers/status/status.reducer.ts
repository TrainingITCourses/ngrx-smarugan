import { Action } from '@ngrx/store';

import { StatusActions, StatusActionTypes } from './status.actions';

export interface State {
  statuses: any;
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  statuses: [],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: StatusActions): State {
  switch (action.type) {
    case StatusActionTypes.LoadStatuses:
      return { ...state, loading: true};
    case StatusActionTypes.LoadedStatuses:
      return { statuses: action.payload, loaded: true, loading: false };
    default:
      return state;
  }
}
