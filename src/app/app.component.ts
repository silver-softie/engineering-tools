import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'engineering-tools';
}
