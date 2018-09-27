import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

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
  public criteries: String[] = ['', 'status', 'agency', 'type'];
  public criteryValues: String[] = [];
  public showValues = false;

  private statuses: any[] = [];
  private agencies: any[] = [];
  private types: any[] = [];

  @Output() onFilterLaunches = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getStatusTypes$().subscribe(statuses => {
      for (const status of statuses) {
        this.statuses.push(status);
      }
      this.statuses.sort((v1, v2) => (v1['name'] < v2['name']) ? -1 : 1);
    });

    this.apiService.getAgencies().subscribe(agencies => {
      for (const agency of agencies) {
        this.agencies.push(agency);
      }
      this.agencies.sort((v1, v2) => (v1['abbrev'] < v2['abbrev']) ? -1 : 1);
    });

    this.apiService.getMissionTypes().subscribe(missions => {
      for (const type of missions) {
        this.types.push(type);
      }
      this.types.sort((v1, v2) => (v1['name'] < v2['name']) ? -1 : 1);
    });

    this.form = new FormGroup({
      'critery-type': new FormControl(this.criteries[0], [Validators.required]),
      'critery-values': new FormControl([], [Validators.required])
    });
  }

  onSelectCriteryType() {
    switch (this.form.value['critery-type']) {
      case 'status':
        this.criteryValues = this.statuses;
        break;
      case 'agency':
        this.criteryValues = this.agencies;
        break;
      case 'type':
        this.criteryValues = this.types;
        break;
    }
    this.showValues = true;
  }

  onSelectCriteryValue() {
    const selectedCriteria = {
      'type': this.form.value['critery-type']
    };

    switch (this.form.value['critery-type']) {
      case 'status':
        selectedCriteria['value'] = this.statuses[this.form.value['critery-values']];
        break;
      case 'agency':
        selectedCriteria['value'] = this.agencies[this.form.value['critery-values']];
        break;
      case 'type':
        selectedCriteria['value'] = this.types[this.form.value['critery-values']];
        break;
    }

    this.onFilterLaunches.next(selectedCriteria);
  }

}
