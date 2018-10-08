import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { MissionTypeActionTypes, MissionTypeActions, LoadedMissionTypes } from './mission-type.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class MissionTypeEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  load$ = this.actions$.ofType(MissionTypeActionTypes.LoadMissionTypes).pipe(
    mergeMap((action: MissionTypeActions) => {
      return this.apiService.getMissionTypes$().pipe(
        map((missionTypes) => new LoadedMissionTypes(missionTypes)),
        // catchError((err) => new ErrMissionTypes(err.message))
      );
    })
  );
}
