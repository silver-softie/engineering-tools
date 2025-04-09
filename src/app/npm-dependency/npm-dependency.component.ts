import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-npm-dependency',
  imports: [MatButtonModule],
  templateUrl: './npm-dependency.component.html',
  styleUrl: './npm-dependency.component.css'
})
export class NpmDependencyComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile);
      // You can now process the file here or call another method
      this.processFile();
    }
  }

  processFile() {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      // e.target.result contains the file's content
      const fileContent = e.target.result;

      // Example: Display the content (if it's text)
      if (this.selectedFile?.type === 'application/json') {
        console.log('File content:', fileContent);
      } else {
        console.log('File content read, but not text');
      }

      // Further processing (e.g., upload to server) can be done here.
      // this.uploadFile(fileContent);

    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(this.selectedFile); //Or readAsArrayBuffer or readAsDataURL
  }

  uploadFile(fileContent: string | ArrayBuffer | null) {
    // Example: Sending the file content to a server using HttpClient
    // (You'll need to import HttpClientModule in your app module)
    // and inject HttpClient in your component.
    // const formData = new FormData();
    // formData.append('file', this.selectedFile, this.selectedFile.name);

    // this.http.post('/api/upload', formData).subscribe(
    //   (response) => {
    //     console.log('Upload successful:', response);
    //   },
    //   (error) => {
    //     console.error('Upload failed:', error);
    //   }
    // );
  }


}
