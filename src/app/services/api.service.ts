import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { config } from '../models/config';
import { Login } from '../models/login';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  responsedata: any;

  constructor(private http: HttpClient, private router: Router) { }
  reloadUser() {
    // this function indicate that if user login it does not go back to signin and signup page.user will stay on dashboard(main) page
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn.next(true)
      this.router.navigate(['/point-of-sale', {
        outlets: { 'pos': ['dashboard'] }
      }])
    }

  }

  deleteUser() {
    localStorage.clear();
  }

  userSignIn(data: Login) {
    this.http.get(`${config.server}${config.domain}user/login?username=${data.username}&password=${data.password}`)

      .subscribe({
        next: (res) => {
          console.log(res);
          this.responsedata = res;
          localStorage.setItem('token', this.responsedata.auth_token);
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('user_name', data.username)
          this.router.navigate(['/point-of-sale', {
            outlets: { 'pos': ['dashboard'] }
          }])



        },
        error: (err) => {
          console.log(err.name);
          alert(err.error)
          alert(err.name)
        }

      })
  }
  getToken() {
    localStorage.getItem('token') || '';

  }

  getCategories() {
    return this.http.get(`${config.server}${config.domain}sections`)
  }
  getsubCategory(CategoryID: any) {
    return this.http.get(`${config.server}${config.domain}categories/section/${CategoryID}`)
  }

  getmainmenu(subCategoryID: any): Observable<Product> {
    return this.http.get<Product>(`${config.server}${config.domain}menus/categories/${subCategoryID}`)
  }

  getMenuNames() {
    return this.http.get(`${config.server}${config.domain}sections/Category/menu/all`)

  }

   /////////////////send order details from dashboard.ts *to* sidebar.ts////////////////////////////////
   orderSubject = new Subject();
  
   sendOrderDetail(data: any) {
    // console.log("API",data)
     this.orderSubject.next(data) 
   }

   receiveOrderMenu() {
     return this.orderSubject.asObservable();
   }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////Start Passing Amounts side bar to payment page//////////////////////////////////////////////
    public gst:number; menuTotal:number; total:number; serviceCharge:number;
    //////////////////End Passing Amounts side bar to payment page//////////////////////////////////////////////



    //////////////////send only menus without modifiers//////////////////////////////////////////////
    sendMenu = new Subject();
    sendMenus(data:any){
      this.sendMenu.next(data)
    }
    recieveMenus(){
      return this.sendMenu.asObservable();
    }
}
