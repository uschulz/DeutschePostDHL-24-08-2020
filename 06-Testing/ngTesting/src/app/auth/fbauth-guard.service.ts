import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthState } from './store/reducers/auth.reducer';
import { LoginRedirect } from './store/actions/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class FBAuthGuard implements CanLoad {
  constructor(private store: Store<AuthState>) {}

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.store
      .select(appState => appState.user)
      .pipe(
        map(fbUser => {
          if (!fbUser) {
            this.store.dispatch(new LoginRedirect());
            return false;
          }
          return true;
        }),
        take(1)
      );
  }
}
