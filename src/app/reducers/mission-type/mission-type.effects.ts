import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { MissionTypeActionTypes, MissionTypeActions, LoadedMissionTypes, ErrMissionTypes } from './mission-type.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { StatusService } from 'src/app/services/status.service';
import { of } from 'rxjs';

@Injectable()
export class MissionTypeEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private statusService: StatusService) {}

  @Effect()
  load$ = this.actions$.ofType(MissionTypeActionTypes.LoadMissionTypes).pipe(
    mergeMap((action: MissionTypeActions) => {
      this.statusService.messageMissionTypes$.next('Loading misions...');
      return this.apiService.getMissionTypes$().pipe(
        map((missionTypes) => new LoadedMissionTypes(missionTypes)),
        tap((missionTypes) => this.statusService.messageMissionTypes$.next('Loaded missions.')),
        catchError((err) => of(new ErrMissionTypes(err.message)))
      );
    })
  );
}
