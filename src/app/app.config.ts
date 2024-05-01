import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { FeatherModule } from 'angular-feather';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { allIcons } from 'angular-feather/icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideToastr(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(CommonModule, BrowserModule, NgbModule, FeatherModule, FeatherModule.pick(allIcons), TranslateModule.forRoot({
                  loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                  },
                })),
  ]
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
