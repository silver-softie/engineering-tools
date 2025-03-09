import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Output() confirmed = new EventEmitter<boolean>();

  confirm(): void {
    this.confirmed.emit(true);
  }

  cancel(): void {
    this.confirmed.emit(false);
  }
}
