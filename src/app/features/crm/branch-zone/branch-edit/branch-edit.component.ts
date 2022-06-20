import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { Address } from 'src/app/models/crm/address';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.less']
})
export class BranchEditComponent implements OnDestroy {

  branchFG: FormGroup;
  address: Address;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BranchEditComponent>,
    private snackBar: AppSnackBarComponent,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.branchFG = this.fb.group({
      nameFC: [data.type.name, [Validators.required]],
      address: '',
    });
    this.address = data.type.address;
  }

  changeFormAddress(event: any) {
    this.address = new Address(
      event.get('zipFC').value,
      event.get('regionFC').value,
      event.get('cityFC').value,
      event.get('streetFC').value,
      event.get('houseNumFC').value,
      event.get('buildNumFC').value,
      event.get('blockNumFC').value,
      event.get('oneLineFC').value,
    );
  }

  onSaveButton() {
    let name = this.branchFG.get('nameFC')!.value;
    name = (name && name.length > 0) ? name.replace(' ', '') : null;

    if (!name) {
      this.snackBar.openSnackBar('Empty name is not allowed!', 'red-snackbar');
      return;
    }

    this.dialogRef.close({
      name: this.branchFG.get('nameFC')!.value,
      address: this.address,
    });
  }

  onCancelButton() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.branchFG.reset();
  }

}
