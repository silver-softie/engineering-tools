import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-username-generator',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './username-generator.component.html',
  styleUrl: './username-generator.component.css'
})
export class UsernameGeneratorComponent implements OnInit {
  private adjectives: string[] = [];
  private animals: string[] = [];
  private areAdjectivesLoaded: boolean = false;
  private areAnimalsLoaded: boolean = false;

  separator: string = '.';
  addIdentifier: boolean = false;
  username: string = '';
  copyButtonText: string = 'Copy to clipboard';
  isCopied: boolean = false;

  constructor(private http: HttpClient, private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.http.get<string[]>('adjectives.json').subscribe(
      data => {
        console.log('Loaded adjectives');
        this.adjectives = data
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 0);
        this.areAdjectivesLoaded = true;
      },
      error => {
        console.error('Could not load adjectives:', error);
      }
    );

    this.http.get<string[]>('animals.json').subscribe(
      data => {
        console.log('Loaded animals');
        this.animals = data
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 0);
        this.areAnimalsLoaded = true;
      },
      error => {
        console.error('Could not load animals:', error);
      }
    );
  }

  generateUsername(): void {
    const randomAdjective = this.getRandomElement(this.adjectives);
    const randomAnimal = this.getRandomElement(this.animals);
    if (this.addIdentifier) {
      const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
      this.username = `${randomAdjective}${this.separator}${randomAnimal}${this.separator}${randomNumber}`;
    } else {
      this.username = `${randomAdjective}${this.separator}${randomAnimal}`;
    }
  }

  copyToClipboard() {
    this.clipboard.copy(this.username);
    this.copyButtonText = 'Copied to clipboard';
    this.isCopied = true;
    setTimeout(() => {
      this.copyButtonText = 'Copy to clipboard';
      this.isCopied = false;
    }, 1000);
  }

  private getRandomElement(array: string[]): string {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

}
