import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorDto } from '../../shared/interfaces/paginator.interface';
import { environment } from './../../../environments/environment';
import {
  IUserCreateResponse,
  IUsersGetAllResponse
} from './../interfaces/users-res.interfaces';
import { UpdateUserDto } from './../interfaces/users.interfaces';
import { Role } from './../users-roles-enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  findAll(paginatorDto: PaginatorDto): Observable<IUsersGetAllResponse> {
    return this.http.get<IUsersGetAllResponse>(this._baseUrl, {
      params: { ...paginatorDto },
    });
  }

  findOne(id: number): Observable<IUserCreateResponse> {
    return this.http.get<IUserCreateResponse>(this._baseUrl + `/${id}`);
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, updateUserDto);
  }

  changeRole(id: number, role: Role) {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, { role });
  }

  removeOrActivate(id: number, isActive: boolean) {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, { isActive });
  }
}
