import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${environment.apiUrl}/api/v1/users`)
      .pipe(map((users: User[]) => users.map(user => new User(user))));
  }

  getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/api/v1/users/${userId}`);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/api/v1/users/${user.id}`, user);
  }
}
