import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent {
  
  title: string;
  message: string;  
  confirmBtnText: string;
  cancelBtnText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title || 'Confirmation';
    this.message = data.message || 'Please confirm your action...';
    this.confirmBtnText = data.confirmBtnText || 'Confirm';
    this.cancelBtnText = data.cancelBtnText || 'Cancel';
  }

}
