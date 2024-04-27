import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '@angular/localize/init';
import { HttpLoaderFactory } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(CommonModule, BrowserModule, NgbModule, FeatherModule, FeatherModule.pick(allIcons), TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
