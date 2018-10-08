import { Action } from '@ngrx/store';

import { LaunchActionTypes, LaunchActions } from './launch.actions';

export interface State {
  launches: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  launches: [],
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: LaunchActions): State {
  console.log(action.type);

  switch (action.type) {
    case LaunchActionTypes.LoadLaunches:
      return { ...state, loading: true };
    case LaunchActionTypes.LoadedLaunches:
      return { launches: action.payload, loading: false, loaded: true};
    default:
      return state;
  }
}
