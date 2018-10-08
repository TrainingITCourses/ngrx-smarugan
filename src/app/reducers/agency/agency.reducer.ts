import { Action } from '@ngrx/store';

import { AgencyActions, AgencyActionTypes } from './agency.actions';

export interface State {
  agencies: any;
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  agencies: [],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: AgencyActions): State {
  console.log(action.type);

  switch (action.type) {
    case AgencyActionTypes.LoadAgencies:
      return { ...state, loading: true};
    case AgencyActionTypes.LoadedAgencies:
      return { agencies: action.payload, loaded: true, loading: false };
    default:
      return state;
  }
}
