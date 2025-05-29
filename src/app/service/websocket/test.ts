import { BehaviorSubject } from 'rxjs';

let chatMessageTrack = [];
let _dataListSource = new BehaviorSubject([]);

export function getSubscription() {
    return _dataListSource.asObservable();
}

export function setdata(value:any) {
    _dataListSource.next(value);
}