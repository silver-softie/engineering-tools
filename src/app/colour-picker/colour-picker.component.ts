import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-colour-picker',
  imports: [CommonModule, FormsModule],
  templateUrl: './colour-picker.component.html',
  styleUrl: './colour-picker.component.css'
})
export class ColourPickerComponent {
  colour: string = '#000000';
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;

  constructor(private clipboard: Clipboard) {
  }
  
  copyToClipboard() {
    const processedHex = this.colour.slice(1);
    this.clipboard.copy(processedHex);
    this.copyButtonText = 'Copied to clipboard';
    this.isCopied = true;
    setTimeout(() => {
      this.copyButtonText = 'Copy to clipboard';
      this.isCopied = false;
    }, 1000);
  }
}
