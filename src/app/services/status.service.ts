import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public messageLaunches$ = new BehaviorSubject<String>('');
  public messageAgencies$ = new BehaviorSubject<String>('');
  public messageStatuses$ = new BehaviorSubject<String>('');
  public messageMissionTypes$ = new BehaviorSubject<String>('');

  constructor() { }
}
