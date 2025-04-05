import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxMaskConfig, provideNgxMask } from 'ngx-mask'

const maskConfigFunction: () => Partial<NgxMaskConfig> = () => {
  return {
    validation: true,
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideNgxMask(maskConfigFunction)
  ]
};
