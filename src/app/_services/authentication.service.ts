import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators'
import { Principal } from '../_models/Principal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  principalSubject: BehaviorSubject<Principal>;
  principal: Observable<Principal>;

  constructor(private httpClient: HttpClient) {
    if(localStorage.getItem('principal')) {
      this.principalSubject = new BehaviorSubject<Principal>(
        new Principal(JSON.parse(localStorage.getItem('principal')))
      );
    } else {
      this.principalSubject = new BehaviorSubject<Principal>(null);
    }
    this.principal = this.principalSubject.asObservable();
  }

  getPrincipalObject(): Principal {
    return this.principalSubject.value;
  }

  login(loginForm: any): Observable<Principal> {
    return this.httpClient.post<Principal>(`${environment.apiUrl}/api/auth/login`, loginForm)
      .pipe(map(authResponse => {
        if(authResponse && authResponse.token) {
          localStorage.setItem('principal', JSON.stringify(authResponse));
          this.principalSubject.next(new Principal(authResponse));
        }

        return authResponse;
      }), shareReplay());
  }

  singup(singupForm: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/auth/signup`, singupForm);
  }

  logout() {
    this.principalSubject.next(null);
    localStorage.removeItem('principal');
  }

  hasRole(role: string | string[]): boolean {
    const principal = this.getPrincipalObject();

    if(principal && principal.token) {

      if(typeof role === 'string' && role.length > 0) {
        return principal.roles.includes(role);
      }

      if(Array.isArray(role) && role.length > 0) {
        let response = false;
        role.forEach(r => {
          if(principal.roles.includes(r)) {
            response = true;
          }
        });
        return response;
      }
    }
    return false;
  }

  hasAnyRole() {
    const principal = this.getPrincipalObject();
    if(principal && principal.roles.length > 0) {
      return true;
    }
    return false;
  }
  
}
