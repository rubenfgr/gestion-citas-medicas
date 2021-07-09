import {
  UpdateMeetingDto,
  CreateMeetingDto,
} from './../interfaces/meeting.interfaces';
import { IMeetingCreateResponse } from './../interfaces/meeting-res.interfaces';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeetingGetAllResponse } from '../interfaces/meeting-res.interfaces';

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

  findAll(): Observable<IMeetingGetAllResponse> {
    return this.http.get<IMeetingGetAllResponse>(this._baseUrl);
  }

  findOne(id: number): Observable<IMeetingCreateResponse> {
    return this.http.get<IMeetingCreateResponse>(this._baseUrl + `/${id}`);
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto): Observable<boolean> {
    return this.http.patch<boolean>(this._baseUrl + `/${id}`, updateMeetingDto);
  }

  removeOrActive(id: number, isActive: boolean): Observable<boolean> {
    return this.http.patch<boolean>(
      this._baseUrl + `/activate/${id}`,
      {},
      { params: { isActive } }
    );
  }
}
