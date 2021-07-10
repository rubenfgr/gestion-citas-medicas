import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { IUser } from './../../users/interfaces/users.interfaces';
import { Role } from './../../users/users-roles-enum';
import { ILogin } from './../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl + '/auth';
  private _user: IUser | null = {
    username: 'Rubén Francisco',
    email: 'rubenfgr87@outlook.com',
    id: 1,
    isActive: true,
    role: Role.ADMIN,
  };

  get user(): IUser | null {
    return this._user;
  }

  constructor(private http: HttpClient) {}

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(false);
    }
    return this.http.post<ILogin>(this._baseUrl + '/renew', {}).pipe(
      map((iLogin) => {
        if (iLogin && iLogin.access_token && iLogin.user) {
          localStorage.setItem('access_token', iLogin.access_token);
          this._user = iLogin.user;
          return true;
        }
        return false;
      })
    );
  }

  login(): Observable<boolean> {
    return this.http.post<ILogin>(this._baseUrl + '/login', {}).pipe(
      map((iLogin) => {
        if (iLogin && iLogin.access_token && iLogin.user) {
          localStorage.setItem('access_token', iLogin.access_token);
          this._user = iLogin.user;
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._user = null;
  }
}
