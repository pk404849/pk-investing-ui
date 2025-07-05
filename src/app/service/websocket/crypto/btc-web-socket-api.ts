import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BTCWebsocketApi {
private stompClient: any;
  private randomOptionSubject = new BehaviorSubject<any>(null);
  private allOptionsSubject = new BehaviorSubject<any[]>([]);
  constructor() { 
     this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
 
    // if (typeof window !== 'undefined' && window.localStorage) {
    
    // var userId = localStorage.getItem("userId");
    //  if (userId) {
    const ws = new SockJS(environment.BTCWebsocketUrl);
    this.stompClient = Stomp.Stomp.over(ws);
    
    this.stompClient.connect({}, () => {
      const topic = '/BTC-topic/BTC-options';
      this.stompClient.subscribe(topic, (message: any) => {
        this.allOptionsSubject.next(JSON.parse(message.body));
     
      });
    });
    }
  //  }
    
  //}

  getAllOptions(): Observable<any[]> {
    return this.allOptionsSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
