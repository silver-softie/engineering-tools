import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-html-encoder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './html-encoder.component.html',
  styleUrl: './html-encoder.component.css'
})
export class HtmlEncoderComponent {
  html: string = '';
  encodedHtml: string = '';
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;

  constructor(private clipboard: Clipboard) {
  }

  encodeHtml(): void {
    const tempDiv = document.createElement('div');
    tempDiv.innerText = this.html;
    this.encodedHtml = tempDiv.innerHTML;
  }

  copyToClipboard(): void {
    this.clipboard.copy(this.encodedHtml);
    this.copyButtonText = 'Copied to clipboard';
    this.isCopied = true;
    setTimeout(() => {
      this.copyButtonText = 'Copy to clipboard';
      this.isCopied = false;
    }, 1000);
  }
}

