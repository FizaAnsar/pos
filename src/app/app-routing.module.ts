import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/Auth_Guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaymentsComponent } from './point-of-sale/payments/payments.component';
import { DashboardComponent } from './point-of-sale/dashboard/dashboard.component';
import { PosComponent } from './point-of-sale/common-layout/pos/pos.component';
import { CalculatorComponent } from './point-of-sale/calculator/calculator.component';
import { ReserveTablesComponent } from './point-of-sale/reserve-tables/reserve-tables.component';

const routes: Routes = [
  {path:'', redirectTo:'signin', pathMatch:'full'},
  {
    path:'signin',
    component: LoginComponent,
  },
  // {
    // path:'',component:DefaultLayoutComponent,
    // canActivate: [AuthGuard],
  //  children:[
  //   {path:'',redirectTo:'dashboard', pathMatch:'full'},
    // {path:'dashoard',component:DashboardComponent}
  // ]


   
// },
{path:'point-of-sale',component:PosComponent,
  children:[
    {path:"dashboard",component:DashboardComponent,outlet:"pos"},
    {path:"payment",component:PaymentsComponent,outlet:"pos"},
    {path:"reserve",component:ReserveTablesComponent,outlet:"pos"},
  
  ]
},

{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
