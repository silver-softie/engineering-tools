import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { UrlEncoderComponent } from './url-encoder/url-encoder.component';
import { HtmlEncoderComponent } from './html-encoder/html-encoder.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    GuidGeneratorComponent,
    HtmlEncoderComponent,
    PasswordGeneratorComponent,
    UrlEncoderComponent
  ]
};
