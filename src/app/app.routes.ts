import { Routes } from '@angular/router';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { UrlEncoderComponent } from './url-encoder/url-encoder.component';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';
import { HtmlEncoderComponent } from './html-encoder/html-encoder.component';

export const routes: Routes = [
  { path: 'guid-generator', component: GuidGeneratorComponent },
  { path: 'html-encoder', component: HtmlEncoderComponent },
  { path: 'password-generator', component: PasswordGeneratorComponent },
  { path: 'url-encoder', component: UrlEncoderComponent }
];
