import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:ApiService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // this auth guard is for those user who does not logged in and try to redirect main dashboard page.
      // this guard restrict that only those users redirect to dashboard who logged in the app
      //in google search bar write url and try to redirect this auth guard restrict unautherize user
      if(localStorage.getItem('token')){
       return true;
      }
      this.router.navigate(['signin'])
      return this.userService.isUserLoggedIn;
  }
  
}

