import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CellarData } from '../models/CellarData';
import { BarrelInfoModel } from '../models/BarrelInfoModel';
import { CellarDataResponseModel } from '../models/CellarDataReponseModel';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private http: HttpClient) {}

  GetFaqCategories(code: string): Observable<CellarDataResponseModel> {
    const req = this.http.get<CellarDataResponseModel>('https://wine-monitoring-fa.azurewebsites.net/api/getforcode/' + code, {
      headers: this.getHeaders(),
    });
    return req;
  }

  UpdateBarrelInfo(cellarCode: string, barrelCode: string, info: BarrelInfoModel): Observable<any> {
    const req = this.http.post<any>(
      `https://wine-monitoring-fa.azurewebsites.net/api/updateBarrel/${cellarCode}/${barrelCode}${this.getQueryStringForBarrelInfo(
        info
      )}`,
      {
        headers: this.getHeaders(),
      }
    );
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

  private getQueryStringForBarrelInfo(barrel: BarrelInfoModel) {
    const formBody = [];
    // tslint:disable-next-line: forin
    for (const property in barrel) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(barrel[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return '?' + formBody.join('&');
  }
}
