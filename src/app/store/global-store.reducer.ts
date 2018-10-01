import { GlobalState, initialState } from './models/global.model';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';

// Pure function
export function globalStoreReducer(
  state: GlobalState = initialState,
  action: GlobalActions
): GlobalState {
  const newStatus = { ...state };
  switch (action.type) {
    case GlobalActionTypes.LoadLaunches:
      newStatus.launches = action.payload;
      break;
    case GlobalActionTypes.LoadStatuses:
      newStatus.statuses = action.payload;
      break;
    case GlobalActionTypes.LoadAgencies:
      newStatus.agencies = action.payload;
      break;
    case GlobalActionTypes.LoadMissionTypes:
      newStatus.missionTypes = action.payload;
      break;
  }
  return newStatus;
}
