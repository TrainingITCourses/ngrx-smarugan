export class GlobalState {
  launches: any[];
  statuses: any[];
  agencies: any[];
  missionTypes: any[];
}

export const initialState: GlobalState = {
  launches: [],
  statuses: [],
  agencies: [],
  missionTypes: []
};
