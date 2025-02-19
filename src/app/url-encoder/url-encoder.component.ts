import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-url-encoder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-encoder.component.html',
  styleUrl: './url-encoder.component.css'
})
export class UrlEncoderComponent {
  url: string = '';
  encodedUrl: string = '';
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;

  constructor(private clipboard: Clipboard) {
  }

  encodeUrl() {
    this.encodedUrl = this.url.replace(/[!'()*]/g, function (char) {
      return '%' + char.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  copyToClipboard() {
    this.clipboard.copy(this.encodedUrl);
    this.copyButtonText = 'Copied to clipboard';
    this.isCopied = true;
    setTimeout(() => {
      this.copyButtonText = 'Copy to clipboard';
      this.isCopied = false;
    }, 1000);
  }

}
