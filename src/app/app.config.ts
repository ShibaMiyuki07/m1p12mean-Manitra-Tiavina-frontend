import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {CalendarUtils} from "angular-calendar";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DatePipe} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideAnimations(),
    CalendarUtils,
  ],
};
