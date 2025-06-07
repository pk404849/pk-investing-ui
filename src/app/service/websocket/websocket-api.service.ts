import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class WebsocketApiService {
private stompClient: any;
  private randomOptionSubject = new BehaviorSubject<any>(null);
  private allOptionsSubject = new BehaviorSubject<any[]>([]);
  constructor() { 
     this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    //const serverUrl = 'http://13.53.206.50:3000/ws-option-chain';
    //const serverUrl = 'http://172.31.37.139:3000/ws-option-chain';

    //environment.websocketserverUrl
    const ws = new SockJS(environment.websocketserverUrl);
    this.stompClient = Stomp.Stomp.over(ws);
    
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/all-options', (message: any) => {
        this.allOptionsSubject.next(JSON.parse(message.body));
     
      });
    });
  }

  getAllOptions(): Observable<any[]> {
    return this.allOptionsSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
