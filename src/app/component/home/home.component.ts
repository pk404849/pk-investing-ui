import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestModel } from '../../model/RequestModel';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { WebsocketApiService } from '../../service/websocket/websocket-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  optionData:any=[];
  requestModel = new RequestModel();

  constructor(
    private commonServices: CommonService,
    private websocketApi: WebsocketApiService
  ) {}

  ngOnInit(): void {
    this.websocketApi.getAllOptions().subscribe((data) => {
      if (data) {
      
        this.optionData=data;
          console.log('Raw Data Received:', data);
        // Normalize keys (remove extra spaces)
        // Object.entries(data).forEach(([key, value]) => {
        //   const normalizedKey = key.replace(/\s+/g, ' ').trim();

        //   if (normalizedKey === 'ETH Call') {
        //     this.callDataList = value as any[];
        //   } else if (normalizedKey === 'ETH Put') {
        //     this.putDataList = value as any[];
        //   }
        // });

        // console.log('Call Data List:', this.callDataList);
        // console.log('Put Data List:', this.putDataList);
      } else {
        console.log('Received empty or null data');
      }
    });

    this.sendMessage();
  }

  sendMessage(): void {
    console.log('sendMessage() called - implement if needed');
  }

  ngOnDestroy(): void {
    // this.websocketApi.disconnect(); // if implemented
  }
}
