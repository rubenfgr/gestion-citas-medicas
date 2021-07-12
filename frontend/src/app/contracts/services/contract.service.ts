import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorDto } from '../../shared/interfaces/paginator.interface';
import { environment } from './../../../environments/environment';
import { UpdateClientDto } from './../../clients/interfaces/client.interfaces';
import { CreateContractDto } from './../interfaces/contract.interfaces';
import {
  IContractCreateResponse,
  IContractGetAllResponse,
  IContractGetByClientIdResponse,
  IContractGetByIdResponse
} from './../interfaces/contracts-res.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private _baseUrl = environment.apiUrl + '/contracts';

  constructor(private http: HttpClient) {}

  create(
    createContractDto: CreateContractDto
  ): Observable<IContractCreateResponse> {
    return this.http.post<IContractCreateResponse>(
      this._baseUrl,
      createContractDto
    );
  }

  findAll(paginatorDto?: PaginatorDto): Observable<IContractGetAllResponse> {
    return this.http.get<IContractGetAllResponse>(this._baseUrl, {
      params: { ...paginatorDto },
    });
  }

  findOne(id: number): Observable<IContractGetByIdResponse> {
    return this.http.get<IContractGetByIdResponse>(this._baseUrl + `/${id}`);
  }

  findOneByClientId(
    clientId: number
  ): Observable<IContractGetByClientIdResponse> {
    return this.http.get<IContractGetByClientIdResponse>(
      this._baseUrl + `/client/${clientId}`
    );
  }

  update(id: number, updateClientDto: UpdateClientDto): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, updateClientDto);
  }

  removeOrActive(id: number, isActive: boolean): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, { isActive });
  }
}
