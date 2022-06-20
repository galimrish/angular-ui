import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: 'app-nomenclature-edit',
  templateUrl: './nomenclature-edit.component.html',
  styleUrls: ['./nomenclature-edit.component.less']
})
export class NomenclatureEditComponent implements OnDestroy {

  nomenclatureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NomenclatureEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nomenclatureForm = this.fb.group({
      nameFC: [this.data.type.name, [Validators.required]],
      codeFC: [this.data.type.code, [Validators.required]],
      shortNameFC: [this.data.type.shortName, [Validators.required]],
      weightFC: [this.data.type.weight, [Validators.required, Validators.min(0)]],
    });
  }

  onSaveButton() {
    let name = this.nomenclatureForm.get('nameFC')!.value;
    name = (name && name.length > 0) ? name.replace(' ', '') : null;

    if (!name) {
      this.snackBar.openSnackBar('Empty name is not allowed!', 'red-snackbar');
      return;
    }
    let code = this.nomenclatureForm.get('codeFC')!.value;
    code = Number(code);
    if (isNaN(code)) {
      this.snackBar.openSnackBar('Code should be a valid number!', 'red-snackbar');
      return;
    }

    this.data.type.name = this.nomenclatureForm.get('nameFC')!.value;
    this.data.type.code = this.nomenclatureForm.get('codeFC')!.value;
    this.data.type.shortName = this.nomenclatureForm.get('shortNameFC')!.value;
    this.data.type.weight = this.nomenclatureForm.get('weightFC')!.value;
    this.dialogRef.close(this.data.type);
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.nomenclatureForm.reset();
  }

  canSave() {
    return (
      this.nomenclatureForm.get('nameFC')!.valid
      && this.nomenclatureForm.get('codeFC')!.valid
      && this.nomenclatureForm.get('shortNameFC')!.valid
      && this.nomenclatureForm.get('weightFC')!.valid
    );
  }
}
