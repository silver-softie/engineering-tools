import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GuidGeneratorComponent } from "./guid-generator/guid-generator.component";
import { HomeComponent } from "./home/home.component";

interface DynamicComponent {
  component: any,
  headingId: string,
  collapse: string,
  heading: string
}

@Component({
  selector: 'app-root',
  imports: [
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
