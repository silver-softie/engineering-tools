import { Component } from '@angular/core';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';
import { UrlEncoderComponent } from './url-encoder/url-encoder.component';

@Component({
  selector: 'app-root',
  imports: [
    GuidGeneratorComponent,
    PasswordGeneratorComponent,
    UrlEncoderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'engineering-tools';
}
