import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestModel } from '../../../model/RequestModel';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';
import { BTCWebsocketApi } from '../../../service/websocket/crypto/btc-web-socket-api';

@Component({
  selector: 'app-btc',
  imports: [FormsModule, CommonModule, MatDatepickerModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './btc.component.html',
  styleUrl: './btc.component.css'
})
export class BtcComponent implements OnInit, OnDestroy {

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

  selectedStrikeFilter: any = '10'; // '10' = ATM, 'ALL' = all strikes

  constructor(
    private commonServices: CommonService,
    private btcWebsocketApi: BTCWebsocketApi,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadOptionData();
    this.fetchDeltaOptionChainCurrentData();
  }

  loadOptionData(): void {
    this.btcWebsocketApi.getAllOptions().subscribe((data) => {
      if (data) {
        if (this.selectedStrikeFilter === 'ALL') {
          this.optionData = data;
        } else {
          this.filterStrikePriceData(data);
        }
        console.log('Raw Data Received:', this.optionData);
        this.updateTopCallVolumes();
      } else {
        console.log('Received empty or null data');
      }
    });
  }

  filterStrikePriceData(data: any): void {
    const closestIndex = data.reduce((closestIdx: number, curr: any, idx: number) => {
      return Math.abs(curr.strikePrice - curr.spotPrice) <
        Math.abs(data[closestIdx].strikePrice - curr.spotPrice) ? idx : closestIdx;
    }, 0);

    const range = Number(this.selectedStrikeFilter); // e.g., 10 for ATM
    const start = Math.max(0, closestIndex - range);
    const end = Math.min(data.length - 1, closestIndex + range);
    this.optionData = data.slice(start + 1, end + 1);
  }

  // Call this method from (change) event of dropdown
  onStrikeFilterChange(): void {
    this.loadOptionData();
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
    const callVol: number[] = [], putVol: number[] = [],
          callOi: number[] = [], putOi: number[] = [],
          callOiChg: number[] = [], putOiChg: number[] = [];

    for (let row of this.optionData) {
      this.currency = row.currency;
      this.spotPrice = row.callData.spot_price;
      this.expiryDate = row.expiryDate;

      if (row.callData?.turnover_usd != null) callVol.push(row.callData.turnover_usd);
      if (row.callData?.oi_value_usd != null) callOi.push(row.callData.oi_value_usd);
      if (row.callData?.oi_contracts != null) callOiChg.push(row.callData.oi_contracts);

      if (row.putData?.turnover_usd != null) putVol.push(row.putData.turnover_usd);
      if (row.putData?.oi_value_usd != null) putOi.push(row.putData.oi_value_usd);
      if (row.putData?.oi_contracts != null) putOiChg.push(row.putData.oi_contracts);
    }

    this.highestCallVolume = [...new Set(callVol)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallVolume = [...new Set(callVol)].sort((a, b) => b - a)[1] ?? null;
    this.highestPutVolume = [...new Set(putVol)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutVolume = [...new Set(putVol)].sort((a, b) => b - a)[1] ?? null;

    this.highestCallOi = [...new Set(callOi)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallOi = [...new Set(callOi)].sort((a, b) => b - a)[1] ?? null;
    this.highestPutOi = [...new Set(putOi)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutOi = [...new Set(putOi)].sort((a, b) => b - a)[1] ?? null;

    this.highestCallOiChg = [...new Set(callOiChg)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestCallOiChg = [...new Set(callOiChg)].sort((a, b) => b - a)[1] ?? null;
    this.highestPutOiChg = [...new Set(putOiChg)].sort((a, b) => b - a)[0] ?? null;
    this.secondHighestPutOiChg = [...new Set(putOiChg)].sort((a, b) => b - a)[1] ?? null;
  }

  // ---- CLASS & % METHODS BELOW (unchanged from your logic) ----
  getCallVolumeClass(volume: number): string {
    if (!this.highestCallVolume || !volume) return '';
    const pct = (volume / this.highestCallVolume) * 100;
    if (volume === this.highestCallVolume) return 'call-volume-blue';
    if (volume === this.secondHighestCallVolume && pct >= 75) return 'call-volume-yellow';
    if (pct >= 75 && volume < (this.secondHighestCallVolume ?? Infinity)) return 'call-volume-bold';
    return '';
  }

  getPutVolumeClass(volume: number): string {
    if (!this.highestPutVolume || !volume) return '';
    const pct = (volume / this.highestPutVolume) * 100;
    if (volume === this.highestPutVolume) return 'put-volume-blue';
    if (volume === this.secondHighestPutVolume && pct >= 75) return 'put-volume-yellow';
    if (pct >= 75 && volume < (this.secondHighestPutVolume ?? Infinity)) return 'put-volume-bold';
    return '';
  }

  getCallOiClass(oi: number): string {
    if (!this.highestCallOi || !oi) return '';
    const pct = (oi / this.highestCallOi) * 100;
    if (oi === this.highestCallOi) return 'call-oi-blue';
    if (oi === this.secondHighestCallOi && pct >= 75) return 'call-oi-yellow';
    if (pct >= 75 && oi < (this.secondHighestCallOi ?? Infinity)) return 'call-oi-bold';
    return '';
  }

  getPutOiClass(oi: number): string {
    if (!this.highestPutOi || !oi) return '';
    const pct = (oi / this.highestPutOi) * 100;
    if (oi === this.highestPutOi) return 'put-oi-blue';
    if (oi === this.secondHighestPutOi && pct >= 75) return 'put-oi-yellow';
    if (pct >= 75 && oi < (this.secondHighestPutOi ?? Infinity)) return 'put-oi-bold';
    return '';
  }

  getCallOiChgClass(val: number): string {
    if (!this.highestCallOiChg || !val) return '';
    const pct = (val / this.highestCallOiChg) * 100;
    if (val === this.highestCallOiChg) return 'call-oiChg-blue';
    if (val === this.secondHighestCallOiChg && pct >= 75) return 'call-oiChg-yellow';
    if (pct >= 75 && val < (this.secondHighestCallOiChg ?? Infinity)) return 'call-oiChg-bold';
    return '';
  }

  getPutOiChgClass(val: number): string {
    if (!this.highestPutOiChg || !val) return '';
    const pct = (val / this.highestPutOiChg) * 100;
    if (val === this.highestPutOiChg) return 'put-oiChg-blue';
    if (val === this.secondHighestPutOiChg && pct >= 75) return 'put-oiChg-yellow';
    if (pct >= 75 && val < (this.secondHighestPutOiChg ?? Infinity)) return 'put-oiChg-bold';
    return '';
  }

  fetchDeltaOptionChainCurrentData(): void {
    this.commonServices.fetchDeltaOptionChainCurrentData(this.requestModel).subscribe((res: any) => {
      if (res.status && res.data != null) {
        this.optionData = res.data;
        this.updateTopCallVolumes();
        console.log('Fetched => ', res.data);
      }
    });
  }

  // Percentage helpers
  getCallVolumePercentage(volume: number): string {
    return this.highestCallVolume && volume ? ((volume / this.highestCallVolume) * 100).toFixed(2) + '%' : '0%';
  }

  getPutVolumePercentage(volume: number): string {
    return this.highestPutVolume && volume ? ((volume / this.highestPutVolume) * 100).toFixed(2) + '%' : '0%';
  }

  getCallOiPercentage(oi: number): string {
    return this.highestCallOi && oi ? ((oi / this.highestCallOi) * 100).toFixed(2) + '%' : '0%';
  }

  getPutOiPercentage(oi: number): string {
    return this.highestPutOi && oi ? ((oi / this.highestPutOi) * 100).toFixed(2) + '%' : '0%';
  }

  getCallOiChgPercentage(val: number): string {
    return this.highestCallOiChg && val ? ((val / this.highestCallOiChg) * 100).toFixed(2) + '%' : '0%';
  }

  getPutOiChgPercentage(val: number): string {
    return this.highestPutOiChg && val ? ((val / this.highestPutOiChg) * 100).toFixed(2) + '%' : '0%';
  }

  ngOnDestroy(): void {
    if (this.clockIntervalId) clearInterval(this.clockIntervalId);
  }
}
