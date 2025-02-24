import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HtmlEncoderComponent } from "../html-encoder/html-encoder.component";
import { GuidGeneratorComponent } from "../guid-generator/guid-generator.component";
import { PasswordGeneratorComponent } from "../password-generator/password-generator.component";
import { UrlEncoderComponent } from "../url-encoder/url-encoder.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatExpansionModule, HtmlEncoderComponent, GuidGeneratorComponent, PasswordGeneratorComponent, UrlEncoderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tools = [
    { name: 'GUID Generator', component: 'app-guid-generator' },
    { name: 'HTML Encoder', component: 'app-html-encoder' },
    { name: 'Password Generator', component: 'app-password-generator' },
    { name: 'URL Encoder', component: 'app-url-encoder' },
  ]
}