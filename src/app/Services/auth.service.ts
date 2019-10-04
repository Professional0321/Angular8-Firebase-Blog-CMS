import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class User {
  name: string;
  id: string;
  expiresAt: number;
  idToken: string;
  constructor(name: string, id: string, expireAt: number, idToken: string) {
    this.name = name;
    this.id = id;
    this.expiresAt = new Date(new Date().getTime() + expireAt * 1000).getTime();
    this.idToken = idToken;
  }
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  shouldDismiss = new Subject<boolean>();
  expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(_email: string, _password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAuthKey}`;
    this.http
      .post<AuthResponse>(url, {
        email: _email,
        password: _password,
        returnSecureToken: true
      })
      .toPromise()
      .then(data => {
        this.performLogin(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  login(_email: string, _password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAuthKey}`;
    this.http
      .post<AuthResponse>(url, {
        email: _email,
        password: _password,
        returnSecureToken: true
      })
      .toPromise()
      .then(data => {
        this.performLogin(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginAsBecca() {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAuthKey}`;
    this.http
      .post<AuthResponse>(url, {
        email: environment.becca.username,
        password: environment.becca.password,
        returnSecureToken: true
      })
      .toPromise()
      .then(data => {
        this.performLogin(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  performLogin(data: AuthResponse) {
    const newUser = new User(
      data.email,
      data.localId,
      Number(data.expiresIn),
      data.idToken
    );
    this.user.next(newUser);

    // * store token in local storage
    const userData = JSON.stringify(newUser);
    localStorage.setItem("userData", userData);

    console.log(`Authentication token received - ${newUser.name}`);

    // * emit event to dismiss modal view
    this.shouldDismiss.next(true);

    this.scheduleLogout(newUser.expiresAt);
  }

  autoLogin() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const _userData: {
        name: string;
        id: string;
        expireIn: number;
        idToken: string;
      } = JSON.parse(userData);
      const newUser = new User(
        _userData.name,
        _userData.id,
        _userData.expireIn,
        _userData.idToken
      );
      // if token exists, use the data for auth user
      // load the existing user to current user object
      this.user.next(newUser);

      // calculate the remaining time left

      this.scheduleLogout(newUser.expiresAt);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/"]);

    if (this.expirationTimer) {
      this.expirationTimer = null;
    }

    console.log("User logged out");
  }

  scheduleLogout(expirationTime: number) {
    const now = new Date().getTime();
    let time = expirationTime - now;

    // if the expireIn time is up, remove the userData.
    if (time <= 0) {
      this.expirationTimer = null;
    } else {
      this.expirationTimer = setTimeout(() => {
        this.logout();
      }, time);
    }

    const ex = new Date(expirationTime);
    if (ex) {
      console.log(`scheduled loggout at ${ex}`);
    }
  }

  loginAsAnonymous() {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAuthKey}`;

    return this.http.post(url, {
      returnSecureToken: true
    });
  }

  getCurrentUser() {
    return this.user;
  }
}
