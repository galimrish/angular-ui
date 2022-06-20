import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.less']
})
export class AppSnackBarComponent  {

  constructor(public snackBar: MatSnackBar) { }

  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(message: string, className: string) {

    this.snackBar.open(message, 'Close', {
    duration: 10000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: [className],
  });
  }
}
