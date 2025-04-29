import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {
  words: string[] = [];
  maxWords: number = 5;  // Maximum number of words
  numWords: number = 4;  // Default number of words
  separator: string = '-';  // Default separator
  maxLength: number = 10; // Default maximum length
  prefix: string = '';  // Default prefix
  suffix: string = '';  // Default suffix
  selectedCapital: string = 'None';

  password: string = '';
  isDataLoaded: boolean = false;
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;


  constructor(private http: HttpClient, private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.http.get('words_alpha.txt', { responseType: 'text' }).subscribe(
      data => {
        console.log('Loaded words');
        this.words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        this.isDataLoaded = true;
      },
      error => {
        console.error('Could not load words:', error);
      }
    );
  }

  onCapitalsOptionChange(event: any) {
    this.selectedCapital = event.target.value;
    console.log(this.selectedCapital);
  }

  generatePassword(): void {
    if (this.isDataLoaded) {
      const filteredWords = this.words.filter(word => word.length <= this.maxLength);
      const selectedWords = [];

      for (let i = 0; i < this.numWords; i++) {
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        var word = filteredWords[randomIndex];

        switch (this.selectedCapital) {
          case 'FirstLetter':
            console.log('first char');
            word = word.charAt(0).toUpperCase() + word.slice(1);;
            break;
          case 'LastLetter':
            console.log('last char');
            word = word.slice(0, word.length - 1) + word.charAt(word.length - 1).toUpperCase();
            break;
          case 'RandomLetter':
            console.log('random char');
            const randomLetterIndex = Math.floor(Math.random() * word.length);
            word = word.slice(0, randomLetterIndex) + word.charAt(randomLetterIndex).toUpperCase() + word.slice(randomLetterIndex + 1);
            break;
          case 'None':
            console.log('None');
            break;
        }

        selectedWords.push(word);
      }
      this.password = this.prefix + selectedWords.join(this.separator) + this.suffix;
    }
  }

  copyToClipboard() {
    this.clipboard.copy(this.password);
    this.copyButtonText = 'Copied to clipboard';
    this.isCopied = true;
    setTimeout(() => {
      this.copyButtonText = 'Copy to clipboard';
      this.isCopied = false;
    }, 1000);
  }

}
