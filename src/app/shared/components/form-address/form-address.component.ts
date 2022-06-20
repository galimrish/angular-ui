import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Address } from 'src/app/models/crm/address';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.less']
})
export class FormAddressComponent implements OnChanges, OnDestroy {

  @Input() address: Address = new Address();
  @Input() formDisabled: boolean = true;

  addressFG: FormGroup;
  loading = false;
  changeCounter = 0;

  @Output() changeFormAddress = new EventEmitter<FormGroup>(true);

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
  ) {

    this.addressFG = this.fb.group({
       zipFC: this.address.zip,
       regionFC: this.address.region,
       cityFC: this.address.city,
       streetFC: this.address.street,
       houseNumFC: this.address.houseNum,
       buildNumFC: this.address.buildNum,
       blockNumFC: this.address.blockNum,
       oneLineFC: this.address.oneLine
    });

    this.subscription = this.addressFG.valueChanges.subscribe(() => {
      if (this.addressFG.dirty) {
        this.changeFormAddress.emit(this.addressFG);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address'] && changes['address'].currentValue) {

      if (changes['address'].previousValue) {
        if (changes['address'].currentValue.zip !== changes['address'].previousValue.zip) {
          this.addressFG.get('zipFC')!.setValue(changes['address'].currentValue.zip);
        }
        if (changes['address'].currentValue.region !== changes['address'].previousValue.region) {
          this.addressFG.get('regionFC')!.setValue(changes['address'].currentValue.region);
        }
        if (changes['address'].currentValue.city !== changes['address'].previousValue.city) {
          this.addressFG.get('cityFC')!.setValue(changes['address'].currentValue.city);
        }
        if (changes['address'].currentValue.street !== changes['address'].previousValue.street) {
          this.addressFG.get('streetFC')!.setValue(changes['address'].currentValue.street);
        }
        if (changes['address'].currentValue.houseNum !== changes['address'].previousValue.houseNum) {
          this.addressFG.get('houseNumFC')!.setValue(changes['address'].currentValue.houseNum);
        }
        if (changes['address'].currentValue.buildNum !== changes['address'].previousValue.buildNum) {
          this.addressFG.get('buildNumFC')!.setValue(changes['address'].currentValue.buildNum);
        }
        if (changes['address'].currentValue.blockNum !== changes['address'].previousValue.blockNum) {
          this.addressFG.get('blockNumFC')!.setValue(changes['address'].currentValue.blockNum);
        }
        if (changes['address'].currentValue.oneLine !== changes['address'].previousValue.oneLine) {
          this.addressFG.get('oneLineFC')!.setValue(changes['address'].currentValue.oneLine);
        }
      } else {
        this.addressFG.get('zipFC')!.setValue(changes['address'].currentValue.zip);
        this.addressFG.get('regionFC')!.setValue(changes['address'].currentValue.region);
        this.addressFG.get('cityFC')!.setValue(changes['address'].currentValue.city);
        this.addressFG.get('streetFC')!.setValue(changes['address'].currentValue.street);
        this.addressFG.get('houseNumFC')!.setValue(changes['address'].currentValue.houseNum);
        this.addressFG.get('buildNumFC')!.setValue(changes['address'].currentValue.buildNum);
        this.addressFG.get('blockNumFC')!.setValue(changes['address'].currentValue.blockNum);
        this.addressFG.get('oneLineFC')!.setValue(changes['address'].currentValue.oneLine);
      }
    }

    if (changes['formDisabled']) {
      if (!changes['formDisabled'].currentValue) {
        this.addressFG.enable();
      } else {
        this.addressFG.disable();
      }
    }
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
