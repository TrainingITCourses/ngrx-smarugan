import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { StatusActionTypes, StatusActions, LoadedStatuses } from './status.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class StatusEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  load$ = this.actions$.ofType(StatusActionTypes.LoadStatuses).pipe(
    mergeMap((action: StatusActions) => {
      return this.apiService.getStatuses$().pipe(
        map((statuses) => new LoadedStatuses(statuses)),
        // catchError((err) => new ErrStatuses(err.message))
      );
    })
  );
}
