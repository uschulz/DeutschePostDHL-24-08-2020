import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-simple-observable',
  templateUrl: './creating-observable.component.html',
  styleUrls: ['./creating-observable.component.scss'],
})
export class CreatingObservableComponent implements OnInit {
  constructor() {}

  onErr = (err) => console.log(err);
  onComplete = () => console.log('complete');

  ngOnInit() {}

  subscribingObservables() {
    const vals = of(2, 5, 9);

    vals.subscribe((val) => console.log('of-vals', val));

    const arr = of([2, 5, 9, 12, 22], [4, 7]);

    arr.subscribe(
      (data: number[]) => console.log('of-arr: ', data),
      this.onErr,
      this.onComplete
    );

    const arrFrom = from([2, 5, 9, 12, 22]);

    arrFrom.subscribe((val) => console.log('from', val));

    // new subscribe pattern - above pattern deprecated
    // in future release will take only one argument:
    // next handler or observer obj

    const observer = {
      next: () => (
        data: number // onNext
      ) => console.log('current number: ', data),
      error: this.onErr,
      complete: this.onComplete,
    };

    of([2, 5, 9, 12, 22]).subscribe(observer);

    // same writte as inline style

    of([2, 5, 9, 12, 22]).subscribe({
      next: () => (
        data: number // onNext
      ) => console.log('current number: ', data),
      error: this.onErr,
      complete: this.onComplete,
    });
  }

  useNewObs() {
    new Observable((observer) => {
      let idx = 0;
      const numbers = [2, 5, 9, 12, 22];

      const getNumber = () => {
        observer.next(numbers[idx++]);

        if (idx < numbers.length) {
          setTimeout(getNumber, 250);
        } else {
          observer.complete();
        }
      };

      getNumber();
    }).subscribe(
      (data: number) => console.log('useObsCreate: ', data),
      this.onErr,
      this.onComplete
    );
  }

  useObsFrom() {
    from([2, 5, 9, 12, 22]).subscribe(
      (data: number) => console.log('from(): ', data),
      this.onErr,
      this.onComplete
    );
  }

  useOf() {
    of([2, 5, 9, 12, 22]).subscribe((data) => console.log('of(): ', data));
  }

  useOfwithSpread() {
    of(...[2, 5, 9, 12, 22]).subscribe((data) => console.log(data));
  }

  // Wraps an Object that uses Callbacks
  getGeolocation$(): Observable<Position> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (pos: Position) => {
          observer.next(pos);
          observer.complete();
        },

        (err: PositionError) => {
          observer.error(err);
        }
      );
    });
  }

  // Use the wrapped Callback
  wrappingCallbacks() {
    this.getGeolocation$().subscribe((loc) => {
      console.log('current Geolocation:', loc);
    });
  }

  // Use the mock Promise
  usePromiseToObs() {
    const url = 'http://localhost:3000/todos';
    from(axios(url)).subscribe(
      (data) => console.log('data from jquery', data),
      (err) => console.log('err:', err),
      () => console.log('complete')
    );
  }

  useOperator() {
    from([2, 5, 9, 12, 22])
      .pipe(
        filter((n) => n > 6),
        map((n) => n * 2)
      )
      .subscribe((data: number) => console.log('useOperator: ', data));
  }
}
