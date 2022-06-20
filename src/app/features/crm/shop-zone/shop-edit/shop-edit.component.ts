import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.less']
})
export class ShopEditComponent implements OnDestroy {

  shopFG: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShopEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shopFG = this.fb.group({
      name: [this.data.type.name, [Validators.required]],
      shopCategory: [this.data.type.shopCategory, [Validators.required]],
      merchandise: [this.data.type.merchandise, [Validators.required]],
    });
  }

  onSaveButton() {
    try {
      this.checkStringField('name');
      this.checkStringField('shopCategory', 'Shop category');
      this.checkStringField('merchandise');
    } catch(err) {
      this.snackBar.openSnackBar((err as string), 'red-snackbar');
      return;
    }

    this.dialogRef.close({
      name: this.shopFG.get('name')!.value,
      shopCategory: this.shopFG.get('shopCategory')!.value,
      merchandise: this.shopFG.get('merchandise')!.value,
    });
  }

  checkStringField(name: string, displayName?: string) {
    let value = this.shopFG.get(name)!.value;
    value = (value && value.length > 0) ? value.replace(' ', '') : null;
    if (!value) {
      throw new Error(`Empty ${displayName || name} is not allowed!`);
    }
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.shopFG.reset();
  }

}
