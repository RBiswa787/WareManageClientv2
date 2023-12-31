import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
 
  constructor() {}
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + window.localStorage.getItem("token")
      }
    });
 
    return next.handle(request);
  }
}