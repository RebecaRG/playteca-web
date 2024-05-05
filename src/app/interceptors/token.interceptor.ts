import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getTokenFromCookie();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }

  private getTokenFromCookie(): string | null {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));

    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }

    return null;
  }
}
