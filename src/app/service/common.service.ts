import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestModel } from '../model/RequestModel';
import { environment } from '../../environments/environments';
//import{} from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
 // private httpClient = inject(HttpClient);
  constructor(
   private httpClient: HttpClient
    ) { }

 // private baseUrl = 'http://13.53.206.50:3000';
  //private baseUrl = 'http://172.31.37.139:3000';

  fetchDeltaOptionChainCurrentData (requestModel:RequestModel): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
      })
    }
   // environment.baseUrl;
    var url='currency='+requestModel.currency+'&'+'strDateTime=' +requestModel.expiryDate;
    return this.httpClient.get(`${environment.baseUrl}/delta-option-chain/fetch-delta-option-chain-current-data?`+url,httpOptions);
  }
}
