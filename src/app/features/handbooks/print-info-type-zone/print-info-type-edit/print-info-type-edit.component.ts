import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: 'app-print-info-type-edit',
  templateUrl: './print-info-type-edit.component.html',
  styleUrls: ['./print-info-type-edit.component.less']
})
export class PrintInfoTypeEditComponent implements OnDestroy {

  printInfoTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PrintInfoTypeEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.printInfoTypeForm = this.fb.group({
      nameFC: [this.data.type.name, [Validators.required]],
      codeFC: [this.data.type.code, [Validators.required]],
      shortNameFC: [this.data.type.shortName, [Validators.required]],
    });
  }

  onSaveButton() {
    let name = this.printInfoTypeForm.get('nameFC')!.value;
    name = (name && name.length > 0) ? name.replace(' ', '') : null;

    if (!name) {
      this.snackBar.openSnackBar('Empty name is not allowed!', 'red-snackbar');
      return;
    }
    let code = this.printInfoTypeForm.get('codeFC')!.value;
    code = Number(code);
    if (isNaN(code)) {
      this.snackBar.openSnackBar('Code should be a valid number!', 'red-snackbar');
      return;
    }

    this.data.type.name = this.printInfoTypeForm.get('nameFC')!.value;
    this.data.type.code = this.printInfoTypeForm.get('codeFC')!.value;
    this.data.type.shortName = this.printInfoTypeForm.get('shortNameFC')!.value;
    this.dialogRef.close(this.data.type);
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.printInfoTypeForm.reset();
  }

  canSave() {
    return (
      this.printInfoTypeForm.get('nameFC')!.valid
      && this.printInfoTypeForm.get('codeFC')!.valid
      && this.printInfoTypeForm.get('shortNameFC')!.valid
    );
  }
}
