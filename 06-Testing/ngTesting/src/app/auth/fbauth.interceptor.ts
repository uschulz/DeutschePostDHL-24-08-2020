import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/reducers/auth.reducer';
import { getToken } from './store/selectors/auth.selectors';
import { first, flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FBAuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      first(),
      flatMap(token => {
        const authReq = !!token
          ? req.clone({
              setHeaders: { Authorization: 'Bearer ' + token }
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
