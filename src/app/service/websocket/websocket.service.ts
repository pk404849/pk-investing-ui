import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import  SockJS from 'sockjs-client';
import { setdata } from './test';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocketEndPoint: string = 'http://localhost:1000/ws';
    topic: string = '/topic/public';
    stompClient: any = null;

  constructor() { }

  _connect(){
        console.log("Initialize web socket connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({},function(frame:any){
            _this.stompClient.subscribe(_this.topic,function(sdkEvent:any){
                _this.onMessageReceived(sdkEvent);
            });
        },this.errorCallBack);
     }

    _disconnect(){
        if(this.stompClient !== null && this.stompClient !== 'undefined'){
            this.stompClient.disconnect();
        }
        console.log('Web socket connection disconnected.');
    }

    errorCallBack(error:any){
        console.log("errorCallBack -> "+error);
        setTimeout(()=>{
            this._connect();
        },5000);
    }

    _send(message:any){
        //if(message.type === MessageType.CHAT){
            this.stompClient.send("/app/chat.sendMessage",{}, JSON.stringify(message));
        // }else{
        //     this.stompClient.send("/app/chat.addUser",{}, JSON.stringify({sender: message.sender, type: 'JOIN'}));
        // }
    }
    onMessageReceived(message:any){
       // console.log('Message receieved from server :: '+message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
        setdata(JSON.stringify(message.body));
    }
}
