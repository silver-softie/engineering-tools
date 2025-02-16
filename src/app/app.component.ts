import { Component } from '@angular/core';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';

@Component({
  selector: 'app-root',
  imports: [
    GuidGeneratorComponent,
    PasswordGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'engineering-tools';
}
