import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';

interface DynamicComponent {
  component: any,
  headingId: string,
  collapse: string,
  heading: string
}

@Component({
  selector: 'app-root',
  imports: [
    BannerComponent,
    FooterComponent,
    RouterModule,
    RouterOutlet,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'engineering-tools';
}
