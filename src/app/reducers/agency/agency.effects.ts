import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ApiService } from 'src/app/services/api.service';
import { AgencyActionTypes, AgencyActions, LoadedAgencies } from './agency.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class AgencyEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  load$ = this.actions$.ofType(AgencyActionTypes.LoadAgencies).pipe(
    mergeMap((action: AgencyActions) => {
      return this.apiService.getAgencies$().pipe(
        map((agencies) => new LoadedAgencies(agencies)),
        // catchError((err) => new ErrAgencies(err.message))
      );
    })
  );
}
