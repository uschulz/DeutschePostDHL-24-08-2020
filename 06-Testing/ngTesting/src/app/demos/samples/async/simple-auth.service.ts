import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthService {
  constructor() {}

  keyToken = 'token';

  isAuthenticated(): Observable<boolean> {
    return of(!!localStorage.getItem(this.keyToken)).pipe(delay(300));
  }

  login() {
    localStorage.setItem(this.keyToken, 'yes');
  }

  logout() {
    localStorage.setItem(this.keyToken, null);
  }
}
