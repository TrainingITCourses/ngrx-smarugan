import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { ApiService } from 'src/app/services/api.service';
import { AgencyActionTypes, AgencyActions, LoadedAgencies } from './agency.actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { StatusService } from 'src/app/services/status.service';

@Injectable()
export class AgencyEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private statusService: StatusService) {}

  @Effect()
  load$ = this.actions$.ofType(AgencyActionTypes.LoadAgencies).pipe(
    mergeMap((action: AgencyActions) => {
      this.statusService.messageAgencies$.next('Loading agencies...');
      return this.apiService.getAgencies$().pipe(
        map((agencies) => new LoadedAgencies(agencies)),
        tap((agencies) => this.statusService.messageAgencies$.next('Loaded agencies.'))
        // catchError((err) => new ErrAgencies(err.message))
      );
    })
  );
}
