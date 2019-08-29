import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser && loggedUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}
