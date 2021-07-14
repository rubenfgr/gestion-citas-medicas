import { DatesBetweenDto } from './../../shared/interfaces/dates-between.dto';
import { PaginatorDto } from './../../shared/interfaces/paginator.interface';
import {
  UpdateMeetingDto,
  CreateMeetingDto,
} from './../interfaces/meeting.interfaces';
import {
  IMeetingCreateResponse,
  IMeetingGetAllResponse,
} from './../interfaces/meeting-res.interfaces';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  private _baseUrl = environment.apiUrl + '/meetings';

  constructor(private http: HttpClient) {}

  create(
    createMeetingDto: CreateMeetingDto
  ): Observable<IMeetingCreateResponse> {
    return this.http.post<IMeetingCreateResponse>(
      this._baseUrl,
      createMeetingDto
    );
  }

  findAll(paginatorDto?: PaginatorDto): Observable<IMeetingGetAllResponse> {
    return this.http.get<IMeetingGetAllResponse>(this._baseUrl, {
      params: { ...paginatorDto },
    });
  }

  findAllDatesBetween(
    datesBetweenDto: DatesBetweenDto,
    paginatorDto?: PaginatorDto
  ): Observable<IMeetingGetAllResponse> {
    const { after, before } = datesBetweenDto;
    return this.http.get<IMeetingGetAllResponse>(this._baseUrl, {
      params: {
        ...paginatorDto,
        after: JSON.stringify(after),
        before: JSON.stringify(before),
      },
    });
  }

  findAllTree(paginatorDto?: PaginatorDto): Observable<IMeetingGetAllResponse> {
    return this.http.get<IMeetingGetAllResponse>(this._baseUrl + '/all/tree', {
      params: { ...paginatorDto },
    });
  }

  findAllTreeDatesBetween(
    datesBetweenDto: DatesBetweenDto,
    paginatorDto?: PaginatorDto
  ): Observable<IMeetingGetAllResponse> {
    const { after, before } = datesBetweenDto;
    return this.http.get<IMeetingGetAllResponse>(
      this._baseUrl + '/all/tree/dates',
      {
        params: {
          ...paginatorDto,
          after: after.toISOString(),
          before: before.toISOString(),
        },
      }
    );
  }

  findAllByContractId(
    contractId: number,
    paginatorDto?: PaginatorDto
  ): Observable<IMeetingGetAllResponse> {
    return this.http.get<IMeetingGetAllResponse>(
      this._baseUrl + `/all/contract/${contractId}`,
      { params: { ...paginatorDto } }
    );
  }

  findAllByClientId(
    clientId: number,
    paginatorDto?: PaginatorDto
  ): Observable<IMeetingGetAllResponse> {
    return this.http.get<IMeetingGetAllResponse>(
      this._baseUrl + `/all/client/${clientId}`,
      { params: { ...paginatorDto } }
    );
  }

  findAllByClientIdDatesBetween(
    clientId: number,
    datesBetweenDto: DatesBetweenDto,
    paginatorDto?: PaginatorDto
  ): Observable<IMeetingGetAllResponse> {
    const { after, before } = datesBetweenDto;
    return this.http.get<IMeetingGetAllResponse>(
      this._baseUrl + `/all/client/${clientId}`,
      {
        params: {
          ...paginatorDto,
          after: JSON.stringify(after),
          before: JSON.stringify(before),
        },
      }
    );
  }

  findOne(id: number): Observable<IMeetingCreateResponse> {
    return this.http.get<IMeetingCreateResponse>(this._baseUrl + `/${id}`);
  }

  findOneTree(id: number): Observable<IMeetingCreateResponse> {
    return this.http.get<IMeetingCreateResponse>(
      this._baseUrl + `/one/tree/${id}`
    );
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, updateMeetingDto);
  }

  confirm(id: number, date: Date): Observable<IMeetingCreateResponse> {
    return this.http.patch<IMeetingCreateResponse>(
      this._baseUrl + `/confirm/${id}`,
      {
        date,
      }
    );
  }

  finalize(id: number, examsDone: number): Observable<IMeetingCreateResponse> {
    return this.http.patch<IMeetingCreateResponse>(
      this._baseUrl + `/finalize/${id}`,
      {
        examsDone,
      }
    );
  }

  removeOrActive(id: number, isActive: boolean): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/activate/${id}`, {
      isActive,
    });
  }
}
