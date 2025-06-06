import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestModel } from '../../model/RequestModel';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { WebsocketApiService } from '../../service/websocket/websocket-api.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule,MatDatepickerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  optionData: any = [];
  requestModel = new RequestModel();

  highestCallVolume: number | null = null;
  secondHighestCallVolume: number | null = null;
  highestCallOi: number | null = null;
  secondHighestCallOi: number | null = null;
  highestCallOiChg: number | null = null;
  secondHighestCallOiChg: number | null = null;

  highestPutVolume: number | null = null;
  secondHighestPutVolume: number | null = null;
  highestPutOi: number | null = null;
  secondHighestPutOi: number | null = null;
  highestPutOiChg: number | null = null;
  secondHighestPutOiChg: number | null = null;

  spotPrice: any;
  currency:any;
  constructor(
    private commonServices: CommonService,
    private websocketApi: WebsocketApiService
  ) { }

  ngOnInit(): void {
    //this.fetchDeltaOptionChainCurrentData();
    this.websocketApi.getAllOptions().subscribe((data) => {
      if (data) {

        this.optionData = data;
        console.log('Raw Data Received:', data);
        this.updateTopCallVolumes();
      } else {
        console.log('Received empty or null data');
      }
    });

    this.fetchDeltaOptionChainCurrentData();
  }

  isSpotBetween(currentStrike: number, nextStrike: number): boolean {
    return this.spotPrice > currentStrike && this.spotPrice < nextStrike;
  }
  isBeforeSpot(strikePrice: number): boolean {
    return strikePrice < this.spotPrice;
  }

  isAfterSpot(price: number): boolean {
    return price > this.spotPrice;
  }
  updateTopCallVolumes() {
    const totalCallVolumes: number[] = [];
    const totalPutVolumes: number[] = [];
    const totalCallOi: number[] = [];
    const totalPutOi: number[] = [];
    const totalCallOiChg: number[] = [];
    const totalPutOiChg: number[] = [];
    for (let row of this.optionData) {
      this.currency = row.currency;
      this.spotPrice = row.callData.spot_price;
      if (row.callData?.volume != null) {
        totalCallVolumes.push(row.callData.volume);
      }
      if (row.callData?.oi_value_usd != null) {
        totalCallOi.push(row.callData.oi_value_usd);
      }
      if (row.callData?.oi_contracts != null) {
        totalCallOiChg.push(row.callData.oi_contracts)
      }

      if (row.putData?.volume != null) {
        totalPutVolumes.push(row.putData.volume);
      }
      if (row.putData?.oi_value_usd != null) {
        totalPutOi.push(row.putData.oi_value_usd);
      }
      if (row.putData?.oi_contracts != null) {
        totalPutOi.push(row.putData.oi_contracts);
      }
    }

    const sortedCallVolumes = [...new Set(totalCallVolumes)].sort((a, b) => b - a); // remove duplicates and sort descending
    const sortedPutVolumes = [...new Set(totalPutVolumes)].sort((a, b) => b - a); // remove duplicates and sort descending

    const sortedCallOi = [...new Set(totalCallOi)].sort((a, b) => b - a); // remove duplicates and sort descending
    const sortedPutOi = [...new Set(totalPutOi)].sort((a, b) => b - a); // remove duplicates and sort descending

    const sortedCallOiChg = [...new Set(totalCallOiChg)].sort((a, b) => b - a); // remove duplicates and sort descending
    const sortedPutOiChg = [...new Set(totalPutOiChg)].sort((a, b) => b - a); // remove duplicates and sort descending

    this.highestCallVolume = sortedCallVolumes[0] ?? null;
    this.secondHighestCallVolume = sortedCallVolumes[1] ?? null;
    this.highestPutVolume = sortedPutVolumes[0] ?? null;
    this.secondHighestPutVolume = sortedPutVolumes[1] ?? null;

    this.highestCallOi = sortedCallOi[0] ?? null;
    this.secondHighestCallOi = sortedCallOi[1] ?? null;
    this.highestPutOi = sortedPutOi[0] ?? null;
    this.secondHighestPutOi = sortedPutOi[1] ?? null;

    this.highestCallOiChg = sortedCallOiChg[0] ?? null;
    this.secondHighestCallOiChg = sortedCallOiChg[1] ?? null;
    this.highestPutOiChg = sortedPutOiChg[0] ?? null;
    this.secondHighestPutOiChg = sortedPutOiChg[1] ?? null;
  }

  getCallVolumeClass(volume: number): string {
    if (volume === this.highestCallVolume) {
      return 'call-highest-volume';
    } else if (volume === this.secondHighestCallVolume) {
      return 'call-second-highest-volume';
    } else {
      return '';
    }
  }

  getPutVolumeClass(volume: number): string {
    if (volume === this.highestPutVolume) {
      return 'put-highest-volume';
    } else if (volume === this.secondHighestPutVolume) {
      return 'put-second-highest-volume';
    } else {
      return '';
    }
  }

  getCallOiClass(oi: number): string {
    if (oi === this.highestCallOi) {
      return 'call-highest-oi';
    } else if (oi === this.secondHighestCallOi) {
      return 'call-second-highest-oi';
    } else {
      return '';
    }
  }

  getPutOiClass(oi: number): string {
    if (oi === this.highestPutOi) {
      return 'put-highest-oi';
    } else if (oi === this.secondHighestPutOi) {
      return 'put-second-highest-oi';
    } else {
      return '';
    }
  }

  getCallOiChgClass(oiChg: number): string {
    if (oiChg === this.highestCallOiChg) {
      return 'call-highest-oiChg';
    } else if (oiChg === this.secondHighestCallOiChg) {
      return 'call-second-highest-oiChg';
    } else {
      return '';
    }
  }

  getPutOiChgClass(oiChg: number): string {
    if (oiChg === this.highestPutOiChg) {
      return 'put-highest-oiChg';
    } else if (oiChg === this.secondHighestPutOiChg) {
      return 'put-second-highest-oiChg';
    } else {
      return '';
    }
  }

  fetchDeltaOptionChainCurrentData(): void {
    console.log('Currency => '+this.requestModel.currency);
    console.log('Currency => '+this.requestModel.expiryDate);
    this.commonServices.fetchDeltaOptionChainCurrentData(this.requestModel).subscribe((res : any) =>{
      if(res.status && res.data != null){
        this.optionData = res.data;
        this.updateTopCallVolumes();
        console.log('fetchDeltaOptionChainCurrentData => '+res.data);
      }
    });
  }

  
  ngOnDestroy(): void {
    // this.websocketApi.disconnect(); // if implemented
  }
}
