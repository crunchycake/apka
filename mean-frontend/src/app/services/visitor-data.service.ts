import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitorDataService {

  url: string = 'http://localhost:4700/api/visitorData';

  constructor(private http: HttpClient) {}

  createVisit(visitData: any): Observable<any> {
    return this.http.post(this.url, visitData);
  }

  getAllVisitors(): Observable<any> {
    return this.http.get(this.url);
  }

  
}
