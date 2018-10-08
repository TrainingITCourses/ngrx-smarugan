import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { map } from 'rxjs/operators';

interface TypeSearch {
  'text-search': String;
  'type-search': String;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
    input, select {
      margin: 10px 2px;
    }

    .message-error {
      padding: 20px 0px;
      color: red;
    }
  `]
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  public criteries: String[] = ['', 'status', 'agency', 'missionType'];
  public criteryValues$ = [];
  public showValues = false;

  @Output() onFilterLaunches = new EventEmitter();

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.criteryValues$['status'] = this.store.select('status').pipe(map(st => st.statuses));
    this.criteryValues$['agency'] = this.store.select('agency').pipe(map(st => st.agencies));
    this.criteryValues$['missionType'] = this.store.select('missionType').pipe(map(st => st.missionTypes));

    this.form = new FormGroup({
      'critery-type': new FormControl(this.criteries[0], [Validators.required]),
      'critery-values': new FormControl(null, [Validators.required])
    });
  }

  onSelectCriteryValue() {
    const selectedCriteria = {
      'type': this.form.value['critery-type'],
      'id': Number(this.form.value['critery-values'])
    };

    this.onFilterLaunches.next(selectedCriteria);
  }

}
