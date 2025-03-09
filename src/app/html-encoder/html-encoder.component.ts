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
  rawHtml: string = '';
  safeHtmlString: string = '';
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;

  constructor(private clipboard: Clipboard) {
  }

  encodeHtml(): void {
    this.safeHtmlString = this.rawHtml
      .replace(/&/g, '&amp;')   // Encode &
      .replace(/</g, '&lt;')    // Encode <
      .replace(/>/g, '&gt;')    // Encode >
      .replace(/"/g, '&quot;')  // Encode "
      .replace(/'/g, '&#39;');  // Encode '
  }

  copyToClipboard(): void {
    if (this.safeHtmlString) {
      this.clipboard.copy(this.safeHtmlString);
      this.copyButtonText = 'Copied to clipboard';
      this.isCopied = true;
      setTimeout(() => {
        this.copyButtonText = 'Copy to clipboard';
        this.isCopied = false;
      }, 1000);
    }
  }
}

