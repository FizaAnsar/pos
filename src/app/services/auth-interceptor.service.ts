import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user_name')
    if(token){
      const cloned = req.clone({
        headers:req.headers.set("auth_token",token).set("user_name",userName)
        
      });
      return next.handle(cloned)
    }
    else{
      return next.handle(req)
    }
    
  }
}
