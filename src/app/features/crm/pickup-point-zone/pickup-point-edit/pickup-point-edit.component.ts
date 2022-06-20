import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: 'app-pickup-point-edit',
  templateUrl: './pickup-point-edit.component.html',
  styleUrls: ['./pickup-point-edit.component.less']
})
export class PickupPointEditComponent implements OnDestroy {

  pickupPointFG: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PickupPointEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pickupPointFG = this.fb.group({
      name: [this.data.type.name, [Validators.required]],
      code: [this.data.type.code, [Validators.required]],
      additionalCode: [this.data.type.additionalCode, [Validators.required]],
      city: [this.data.type.city, [Validators.required]],
      pickupPointTypeName: [this.data.type.pickupPointTypeName, [Validators.required]],
    });
  }

  onSaveButton() {
    try {
      this.checkStringField('name');
      this.checkStringField('additionalCode', 'Additional code');
      this.checkStringField('city');
      this.checkStringField('pickupPointTypeName', 'Pickup point type');
    } catch(err) {
      this.snackBar.openSnackBar((err as string), 'red-snackbar');
      return;
    }

    let code = this.pickupPointFG.get('code')!.value;
    code = Number(code);
    if (isNaN(code)) {
      this.snackBar.openSnackBar('Code should be a valid number!', 'red-snackbar');
      return;
    }

    this.dialogRef.close({
      name: this.pickupPointFG.get('name')!.value,
      code: this.pickupPointFG.get('code')!.value,
      additionalCode: this.pickupPointFG.get('additionalCode')!.value,
      city: this.pickupPointFG.get('city')!.value,
      pickupPointTypeName: this.pickupPointFG.get('pickupPointTypeName')!.value,
    });
  }

  checkStringField(name: string, displayName?: string) {
    let value = this.pickupPointFG.get(name)!.value;
    value = (value && value.length > 0) ? value.replace(' ', '') : null;
    if (!value) {
      throw new Error(`Empty ${displayName || name} is not allowed!`);
    }
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.pickupPointFG.reset();
  }

}
