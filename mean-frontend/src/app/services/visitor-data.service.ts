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

  editVisitorData(visitDataEdit: any): Observable<any> {
    return this.http.put(this.url + '/' + visitDataEdit._id, visitDataEdit);
  }

  removeVisitorData(removeData: any): Observable<any> {
    return this.http.delete(this.url + '/' + removeData._id);
  }
}
