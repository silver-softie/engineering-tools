import { Component } from '@angular/core';
import { version } from '../../environments/version';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  appVersion: string = version;
}
