import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';


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
    const serverUrl = 'http://localhost:3000/ws-option-chain';
    const ws = new SockJS(serverUrl);
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
