import { map } from 'rxjs/operators';
import {
  CreateClientDto,
  UpdateClientDto,
} from './../interfaces/client.interfaces';
import { environment } from './../../../environments/environment';
import {
  IClientCreateResponse,
  IClientGetAllReponse,
} from '../interfaces/client-res.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private _baseUrl = environment.apiUrl + '/clients';

  constructor(private http: HttpClient) {}

  create(createClientDto: CreateClientDto): Observable<IClientCreateResponse> {
    return this.http.post<IClientCreateResponse>(
      this._baseUrl,
      createClientDto
    );
  }

  findAll(): Observable<IClientGetAllReponse> {
    return this.http.get<IClientGetAllReponse>(this._baseUrl);
  }

  findOne(id: number): Observable<IClientCreateResponse> {
    return this.http.get<IClientCreateResponse>(this._baseUrl + `/${id}`);
  }

  findOneByUserId(userId: number): Observable<IClientCreateResponse> {
    return this.http.get<IClientCreateResponse>(
      this._baseUrl + `/user/${userId}`
    );
  }

  update(id: number, updateClientDto: UpdateClientDto): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, updateClientDto);
  }

  toExcel(term: string): Observable<any> {
    return this.http
      .get<any>(this._baseUrl + `/excel/${term}`, {
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((res) => {
          console.log(res);
          const binaryData = [];
          binaryData.push(res);
          const url = window.URL.createObjectURL(
            new Blob(binaryData, { type: res.type })
          );
          return url;
        })
      );
  }
}
