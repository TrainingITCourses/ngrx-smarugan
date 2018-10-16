import { Action } from '@ngrx/store';

import { AgencyActions, AgencyActionTypes } from './agency.actions';

export interface State {
  agencies: any;
  loaded: boolean;
  loading: boolean;
  err?: string;
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
      case AgencyActionTypes.ErrAgencies:
        return { ...state, err: action.payload };
    default:
      return state;
  }
}
