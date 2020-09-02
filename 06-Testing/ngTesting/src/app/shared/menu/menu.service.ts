import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MenuItem } from './MenuItem';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private mediaObserver: MediaObserver) {
    this.handleChange();
  }

  private visible = true;
  visible$: BehaviorSubject<boolean> = new BehaviorSubject(this.visible);
  private position = 'side';
  position$: BehaviorSubject<string> = new BehaviorSubject(this.position);

  private handleChange() {
    this.mediaObserver.media$.subscribe((change) => {
      this.visible$.next(change.mqAlias == 'xs' ? false : true);
      this.position$.next(change.mqAlias == 'xs' ? 'over' : 'side');
    });
  }

  getTopItems(): Observable<MenuItem[]> {
    return of([
      { label: 'Home', url: '' },
      { label: 'Demos', url: 'demos' },
      { label: 'Skills', url: 'skills' },
      { label: 'Admin', url: 'admin' },
    ]);
  }

  toggleMenu() {
    this.visible = !this.visible;
    this.visible$.next(this.visible);
  }
}
