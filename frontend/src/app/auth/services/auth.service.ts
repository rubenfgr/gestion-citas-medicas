import { SweetAlertService } from './../../shared/services/sweet-alert.service';
import { CreateUserDto } from './../../users/interfaces/users.interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../../users/interfaces/users-res.interfaces';
import { environment } from './../../../environments/environment';
import { ILogin } from './../interfaces/auth.interfaces';
import { Role } from '../../users/users-roles-enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl + '/auth';
  private _user: IUser | null = null;

  get user(): any {
    return { ...this._user };
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private sweetAlertService: SweetAlertService
  ) {}

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(false);
    }
    return this.http
      .get<ILogin>(this._baseUrl + '/renew', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((iLogin) => {
          localStorage.setItem('access_token', iLogin.access_token);
          this._user = iLogin.user;
          return true;
        })
      );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<ILogin>(this._baseUrl + '/login', { username, password })
      .pipe(
        map((iLogin) => {
          if (iLogin.user.role === Role.NONE) {
            throw new Error(
              'Se ha identificado correctamente pero no tiene permisos para acceder al sistema'
            );
          }
          if (iLogin && iLogin.access_token && iLogin.user) {
            localStorage.setItem('access_token', iLogin.access_token);
            this._user = iLogin.user;
            return true;
          }
          return false;
        })
      );
  }

  register(createUserDto: CreateUserDto): Observable<boolean> {
    return this.http
      .post<ILogin>(environment.apiUrl + '/auth/register', createUserDto)
      .pipe(
        map(
          (register) => {
            if (register && register.user) {
              return true;
            }
            return false;
          },
          catchError(() => of(false))
        )
      );
  }

  changePass(id: number, password: string): Observable<boolean> {
    return this.http.post<boolean>(this._baseUrl + '/change-pass/' + id, {
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._user = null;
    this.router.navigate(['auth']);
  }
}
