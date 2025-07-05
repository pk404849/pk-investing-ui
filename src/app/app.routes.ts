import { Routes } from '@angular/router';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DeltaOptionChainComponent } from './component/delta-option-chain/delta-option-chain.component';
import { PriceComponent } from './component/price/price.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BtcComponent } from './component/crypto/btc/btc.component';
import { EthComponent } from './component/crypto/eth/eth.component';

export const routes: Routes = [
    {
        path:'',
        component: LoginComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'sign-up',
        component: SignUpComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'delta-option-chain',
        component: DeltaOptionChainComponent
    },
    {
        path:'price',
        component: PriceComponent
    },
    {
        path:'profile',
        component: ProfileComponent
    },
    {
        path:'btc-option-chain',
        component: BtcComponent
    },
    {
        path:'eth-option-chain',
        component: EthComponent
    }

];
