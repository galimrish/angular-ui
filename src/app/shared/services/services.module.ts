import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BranchService } from './branch.service';
import { DataHistoryService } from './data-history.service';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { NomenclatureService } from './nomenclature.service';
import { PickupPointService } from './pickup-point.service';
import { ShopService } from './shop.service';
import { SimpleHandbookService } from "./simple-handbook.service";

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      DigitOnlyDirective,
    ],
    exports: [
      DigitOnlyDirective,
    ],
    providers: [
      BranchService,
      DataHistoryService,
      NomenclatureService,
      PickupPointService,
      ShopService,
      SimpleHandbookService,
    ]
})
export class ServicesModule { }