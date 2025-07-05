import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestModel } from '../../../model/RequestModel';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { ETHWebsocketApi } from '../../../service/websocket/crypto/eth-web-socket-api';

@Component({
  selector: 'app-eth',
  imports: [FormsModule, CommonModule, MatDatepickerModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './eth.component.html',
  styleUrl: './eth.component.css'
})
export class EthComponent implements OnInit, OnDestroy {

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
  currency: any;
  expiryDate: any;
  currentDate: string | null = null;
  private clockIntervalId: any;

  constructor(
    private commonServices: CommonService,
    private ethWebsocketApi: ETHWebsocketApi,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.ethWebsocketApi.getAllOptions().subscribe((data) => {
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
      this.expiryDate = row.expiryDate;

      if (row.callData?.turnover_usd != null) totalCallVolumes.push(row.callData.turnover_usd);
      if (row.callData?.oi_value_usd != null) totalCallOi.push(row.callData.oi_value_usd);
      if (row.callData?.oi_contracts != null) totalCallOiChg.push(row.callData.oi_contracts);

      if (row.putData?.turnover_usd != null) totalPutVolumes.push(row.putData.turnover_usd);
      if (row.putData?.oi_value_usd != null) totalPutOi.push(row.putData.oi_value_usd);
      if (row.putData?.oi_contracts != null) totalPutOiChg.push(row.putData.oi_contracts);
    }

    this.highestCallVolume = [...new Set(totalCallVolumes)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallVolume = [...new Set(totalCallVolumes)].sort((a, b) => b - a)[1] ?? null;

    this.highestPutVolume = [...new Set(totalPutVolumes)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutVolume = [...new Set(totalPutVolumes)].sort((a, b) => b - a)[1] ?? null;

    this.highestCallOi = [...new Set(totalCallOi)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallOi = [...new Set(totalCallOi)].sort((a, b) => b - a)[1] ?? null;

    this.highestPutOi = [...new Set(totalPutOi)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutOi = [...new Set(totalPutOi)].sort((a, b) => b - a)[1] ?? null;

    this.highestCallOiChg = [...new Set(totalCallOiChg)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallOiChg = [...new Set(totalCallOiChg)].sort((a, b) => b - a)[1] ?? null;

    this.highestPutOiChg = [...new Set(totalPutOiChg)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutOiChg = [...new Set(totalPutOiChg)].sort((a, b) => b - a)[1] ?? null;
  }

  getCallVolumeClass(volume: number): string {
    if (!this.highestCallVolume || !volume) return '';
    const percentage = (volume / this.highestCallVolume) * 100;
    if (volume === this.highestCallVolume) return 'call-volume-blue';
    if (volume === this.secondHighestCallVolume && percentage >= 75) return 'call-volume-yellow';
    if (percentage >= 75 && volume < (this.secondHighestCallVolume ?? Infinity)) return 'call-volume-bold';
    return '';
  }

  getPutVolumeClass(volume: number): string {
    if (!this.highestPutVolume || !volume) return '';
    const percentage = (volume / this.highestPutVolume) * 100;
    if (volume === this.highestPutVolume) return 'put-volume-blue';
    if (volume === this.secondHighestPutVolume && percentage >= 75) return 'put-volume-yellow';
    if (percentage >= 75 && volume < (this.secondHighestPutVolume ?? Infinity)) return 'put-volume-bold';
    return '';
  }

  getCallOiClass(oi: number): string {
    if (!this.highestCallOi || !oi) return '';
    const percentage = (oi / this.highestCallOi) * 100;
    if (oi === this.highestCallOi) return 'call-oi-blue';
    if (oi === this.secondHighestCallOi && percentage >= 75) return 'call-oi-yellow';
    if (percentage >= 75 && oi < (this.secondHighestCallOi ?? Infinity)) return 'call-oi-bold';
    return '';
  }

  getPutOiClass(oi: number): string {
    if (!this.highestPutOi || !oi) return '';
    const percentage = (oi / this.highestPutOi) * 100;
    if (oi === this.highestPutOi) return 'put-oi-blue';
    if (oi === this.secondHighestPutOi && percentage >= 75) return 'put-oi-yellow';
    if (percentage >= 75 && oi < (this.secondHighestPutOi ?? Infinity)) return 'put-oi-bold';
    return '';
  }

  getCallOiChgClass(oiChg: number): string {
    if (!this.highestCallOiChg || !oiChg) return '';
    const percentage = (oiChg / this.highestCallOiChg) * 100;
    if (oiChg === this.highestCallOiChg) return 'call-oiChg-blue';
    if (oiChg === this.secondHighestCallOiChg && percentage >= 75) return 'call-oiChg-yellow';
    if (percentage >= 75 && oiChg < (this.secondHighestCallOiChg ?? Infinity)) return 'call-oiChg-bold';
    return '';
  }

  getPutOiChgClass(oiChg: number): string {
    if (!this.highestPutOiChg || !oiChg) return '';
    const percentage = (oiChg / this.highestPutOiChg) * 100;
    if (oiChg === this.highestPutOiChg) return 'put-oiChg-blue';
    if (oiChg === this.secondHighestPutOiChg && percentage >= 75) return 'put-oiChg-yellow';
    if (percentage >= 75 && oiChg < (this.secondHighestPutOiChg ?? Infinity)) return 'put-oiChg-bold';
    return '';
  }

  fetchDeltaOptionChainCurrentData(): void {
    console.log('Currency => ' + this.requestModel.currency);
    console.log('Expiry => ' + this.requestModel.expiryDate);
    this.commonServices.fetchDeltaOptionChainCurrentData(this.requestModel).subscribe((res: any) => {
      if (res.status && res.data != null) {
        this.optionData = res.data;
        this.updateTopCallVolumes();
        console.log('Fetched => ', res.data);
      }
    });
  }

  getCallVolumePercentage(volume: number): string {
    if (!this.highestCallVolume || !volume) return '0%';
    return ((volume / this.highestCallVolume) * 100).toFixed(2) + '%';
  }

  getPutVolumePercentage(volume: number): string {
    if (!this.highestPutVolume || !volume) return '0%';
    return ((volume / this.highestPutVolume) * 100).toFixed(2) + '%';
  }

  getCallOiPercentage(oi: number): string {
    if (!this.highestCallOi || !oi) return '0%';
    return ((oi / this.highestCallOi) * 100).toFixed(2) + '%';
  }

  getPutOiPercentage(oi: number): string {
    if (!this.highestPutOi || !oi) return '0%';
    return ((oi / this.highestPutOi) * 100).toFixed(2) + '%';
  }

  getCallOiChgPercentage(oi: number): string {
    if (!this.highestCallOiChg || !oi) return '0%';
    return ((oi / this.highestCallOiChg) * 100).toFixed(2) + '%';
  }

  getPutOiChgPercentage(oiChg: number): string {
    if (!this.highestPutOiChg || !oiChg) return '0%';
    return ((oiChg / this.highestPutOiChg) * 100).toFixed(2) + '%';
  }

  ngOnDestroy(): void {
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
  }
}
