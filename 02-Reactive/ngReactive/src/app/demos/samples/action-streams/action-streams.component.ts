import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DemoItem } from '../../../model/demo/DemoItem';
import { DemoService } from '../../demo.service';

@Component({
  selector: 'app-action-streams',
  templateUrl: './action-streams.component.html',
  styleUrls: ['./action-streams.component.scss'],
})
export class ActionStreamsComponent {
  constructor(private ds: DemoService) {}

  demosData$: Observable<DemoItem[]> = this.ds.getItems();
  filter$ = new FormControl('');

  demos$ = combineLatest([
    this.demosData$,
    this.filter$.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([demos, filter]) => {
      return filter == ''
        ? demos
        : demos.filter((d) =>
            d.title.toLowerCase().includes(filter.toLowerCase())
          );
    })
  );
}
