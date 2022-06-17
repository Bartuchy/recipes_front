import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup-request-payload';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginResponse } from '../login/login.response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
     return this.httpClient.post(
       'http://localhost:8080/api/user/register',
        signupRequestPayload,
        { responseType: 'text' },
      )
   }

   login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/user/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('email', data.email);
        this.loggedIn.emit(true);
        return true;
      }));
   }

  getJwtToken() {
     return this.localStorage.retrieve('authenticationToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
