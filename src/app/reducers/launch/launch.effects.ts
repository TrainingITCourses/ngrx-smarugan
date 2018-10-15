import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { LaunchActionTypes, LoadLaunches, LoadedLaunches } from './launch.actions';
import { ApiService } from 'src/app/services/api.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { StatusService } from 'src/app/services/status.service';

@Injectable()
export class LaunchEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private statusService: StatusService) {}

  @Effect()
  load$ = this.actions$.ofType(LaunchActionTypes.LoadLaunches).pipe(
    mergeMap((action: LoadLaunches) => {
      this.statusService.messageLaunches$.next('Loading launches...');
      return this.apiService.getLaunches$().pipe(
        map(launches => new LoadedLaunches(launches)),
        tap(launches => this.statusService.messageLaunches$.next('Loaded launches.'))
        // catchError(err => new ErrLaunches(err.message))
      );
    })
  );
}
