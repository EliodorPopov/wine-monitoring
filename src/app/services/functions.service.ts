import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellarData } from '../models/CellarData';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private http: HttpClient) {}

  GetFaqCategories(code: string): Observable<CellarData[]> {
    const req = this.http.get<CellarData[]>('https://wine-monitoring-fa.azurewebsites.net/api/getforcode/' + code, {
      headers: this.getHeaders(),
    });
    return req;
  }

  private getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Headers', 'Origin');
    return headers;
  }
}
