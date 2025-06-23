import { Routes } from '@angular/router';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DeltaOptionChainComponent } from './component/delta-option-chain/delta-option-chain.component';

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
    }
];
