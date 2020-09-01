import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginCredentials } from './credential.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private fireAuth: AngularFireAuth) {
    this.onUserChanged();
  }

  private Token: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private fbUser: firebase.User = null;
  public User: BehaviorSubject<firebase.User> = new BehaviorSubject(
    this.fbUser
  );

  private onUserChanged() {
    this.fireAuth.authState.subscribe((user) => {
      this.fbUser = user;
      this.User.next(user);

      if (user != null) {
        this.fbUser.getIdToken().then((token) => {
          this.Token.next(token);
        });
      } else {
        this.Token.next(null);
      }
    });
  }

  getToken(): Observable<string> {
    return this.Token;
  }

  isAuthenticated(): Observable<boolean> {
    this.User.subscribe((user) => {
      const auth: boolean = user == null ? false : true;
      return of(auth);
    });
    return of(false);
  }

  registerUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log('Error logging in', err);
        return err;
      });
  }

  logOn(loginvm: LoginCredentials): Promise<firebase.auth.UserCredential> {
    return this.fireAuth
      .signInWithEmailAndPassword(loginvm.email, loginvm.pwd)
      .catch((err) => {
        console.log('Error logging in', err);
        return err;
      });
  }

  logOff() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.fbUser = null;
      })
      .catch((err) => console.log('Error logging out', err));
  }
}
