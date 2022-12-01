import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './point-of-sale/common-layout/header/header.component'; //common layout
import { SidebarComponent } from './point-of-sale/common-layout/sidebar/sidebar.component'; //common layout
import { PosComponent } from './point-of-sale/common-layout/pos/pos.component';//common layout

import { AuthModule } from './auth/auth.module'; //login & logout

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service'; //authentication for user

import { DashboardComponent } from './point-of-sale/dashboard/dashboard.component'; //routing layout
import { PaymentsComponent } from './point-of-sale/payments/payments.component';// routing layout
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';//routing layout

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModifierPopupComponent } from './utilities/modifier-popup/modifier-popup.component'; //owl carouse used in dashboard

import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './point-of-sale/calculator/calculator.component';
import { ReserveTablesComponent } from './point-of-sale/reserve-tables/reserve-tables.component';
import { TakeawayComponent } from './point-of-sale/posServices/takeaway/takeaway.component';
import { DineinComponent } from './point-of-sale/posServices/dinein/dinein.component';
import { DeliveryComponent } from './point-of-sale/posServices/delivery/delivery.component';
import { ReserveComponent } from './point-of-sale/posServices/reserve/reserve.component'; 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PosComponent,
    DashboardComponent,
    PaymentsComponent,
    PageNotFoundComponent,
    ModifierPopupComponent,
    CalculatorComponent,
    ReserveTablesComponent,
    TakeawayComponent,
    DineinComponent,
    DeliveryComponent,
    ReserveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
