import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Router } from 'express';
import { DataSharedService } from '../../service/websocket/data-shared.service';
import { RequestModel } from '../../model/RequestModel';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(
    private commonServices: CommonService,
    private router: Router,
    private dataSharedSvc: DataSharedService,
  ) { }
  
   webSocketAPI: any;
  ngOnInit(): void {
    this.webSocketAPI = new this.webSocketAPI();
    this.webSocketAPI._connect();
   
    // getSubscription().subscribe(res => {
    //  // console.log(res);
    //   if(res.length) {
    //     this.handleMessage(res);
      
    //   }
    //  });
  }
  requestModel = new RequestModel();
  sendMessage() {
         console.log(this.requestModel.currency);
         console.log(this.requestModel.expiryDate);
    //  this.webSocketAPI._send(this.webSocketApiModel);
 

    
  
  }


}
