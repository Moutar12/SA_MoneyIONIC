import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // @ts-ignore
      const token = this.authService.getToken() ;
      // console.log(token) ;
      // @ts-ignore
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'Application/json'
          }
        });
      }
      return next.handle(request);
    }

  }
