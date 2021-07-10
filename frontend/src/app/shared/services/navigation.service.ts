import { IRoute } from './../interfaces/route.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  getRoutes(): Observable<IRoute[]> {
    return this.http.get<IRoute[]>('assets/data/routes.json');
  }
}
