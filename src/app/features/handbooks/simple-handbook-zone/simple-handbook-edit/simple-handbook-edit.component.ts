import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: 'app-simple-handbook-edit',
  templateUrl: './simple-handbook-edit.component.html',
  styleUrls: ['./simple-handbook-edit.component.less']
})
export class SimpleHandbookEditComponent implements OnDestroy {

  simpleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SimpleHandbookEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.simpleForm = this.fb.group({
      nameFC: [this.data.type.name, [Validators.required]],
      codeFC: [this.data.type.code, [Validators.required]],
    });
  }

  onSaveButton() {
    let name = this.simpleForm.get('nameFC')!.value;
    name = (name && name.length > 0) ? name.replace(' ', '') : null;

    if (!name) {
      this.snackBar.openSnackBar('Empty name is not allowed!', 'red-snackbar');
      return;
    }
    let code = this.simpleForm.get('codeFC')!.value;
    code = Number(code);
    if (isNaN(code)) {
      this.snackBar.openSnackBar('Code should be a valid number!', 'red-snackbar');
      return;
    }

    this.dialogRef.close({name, code});
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.simpleForm.reset();
  }
}
