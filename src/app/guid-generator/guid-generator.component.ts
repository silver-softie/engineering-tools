import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-guid-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guid-generator.component.html',
  styleUrls: ['./guid-generator.component.css']
})
export class GuidGeneratorComponent {
  prefix: string = '';  // Default prefix
  suffix: string = '';  // Default suffix
  guid: string = '';

  constructor(private clipboard: Clipboard) { }

  generateGuid(): void {
    this.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
