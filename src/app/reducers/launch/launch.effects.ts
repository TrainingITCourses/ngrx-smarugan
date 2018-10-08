import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { LaunchActionTypes, LoadLaunches, LoadedLaunches } from './launch.actions';
import { ApiService } from 'src/app/services/api.service';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class LaunchEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  load$ = this.actions$.ofType(LaunchActionTypes.LoadLaunches).pipe(
    mergeMap((action: LoadLaunches) => {
      return this.apiService.getLaunches$().pipe(
        map(launches => new LoadedLaunches(launches)),
        // catchError(err => new ErrLaunches(err.message))
      );
    })
  );
}
