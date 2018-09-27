import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-search',
  templateUrl: './list-search.component.html'
})
export class ListSearchComponent implements OnInit {
  @Input() items: any[] = [];

  constructor() {}

  ngOnInit() {}

}
