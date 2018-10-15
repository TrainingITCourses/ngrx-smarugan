import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { StatusActionTypes, StatusActions, LoadedStatuses } from './status.actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { StatusService } from 'src/app/services/status.service';

@Injectable()
export class StatusEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private statusService: StatusService) {}

  @Effect()
  load$ = this.actions$.ofType(StatusActionTypes.LoadStatuses).pipe(
    mergeMap((action: StatusActions) => {
      this.statusService.messageStatuses$.next('Loading statuses...');
      return this.apiService.getStatuses$().pipe(
        map((statuses) => new LoadedStatuses(statuses)),
        tap((statuses) => this.statusService.messageStatuses$.next('Loaded statuses.'))
        // catchError((err) => new ErrStatuses(err.message))
      );
    })
  );
}
