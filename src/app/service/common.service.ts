import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:3000';

  // fetchDeltaOptionChainData (): Observable<any>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Accept': 'application/json',
  //     })
  //   }
  //   return this.httpClient.get(`${this.baseUrl}/delta-option-chain/fetch-delta-option-chain-data`,httpOptions);
  // }
}
