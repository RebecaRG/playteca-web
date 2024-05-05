import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } 
  ],
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}