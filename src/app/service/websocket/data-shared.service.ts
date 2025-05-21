import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  constructor() { }

   chatMessageTrack = [];
  private _dataListSource: BehaviorSubject<[]> = new BehaviorSubject([]);

  getSubscription(){
    return this._dataListSource.asObservable();
  }

  setdata(value:any) {
    this._dataListSource.next(value);
  }
}
