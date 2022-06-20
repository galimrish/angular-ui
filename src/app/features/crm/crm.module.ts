import { NgModule } from '@angular/core';

import { CrmRoutingModule } from './crm-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesModule } from 'src/app/shared/services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from 'src/app/core/interceptors/main.interceptor';
import { BranchComponent } from './branch-zone/branch/branch.component';
import { BranchEditComponent } from './branch-zone/branch-edit/branch-edit.component';
import { branchFeatureKey, branchReducer } from './branch-zone/reducer';
import { BranchEffects } from './branch-zone/effects';
import { PickupPointComponent } from './pickup-point-zone/pickup-point/pickup-point.component';
import { PickupPointEditComponent } from './pickup-point-zone/pickup-point-edit/pickup-point-edit.component';
import { pickupPointFeatureKey, pickupPointReducer } from './pickup-point-zone/reducer';
import { PickupPointEffects } from './pickup-point-zone/effects';
import { ShopComponent } from './shop-zone/shop/shop.component';
import { ShopEditComponent } from './shop-zone/shop-edit/shop-edit.component';
import { shopFeatureKey, shopReducer } from './shop-zone/reducer';
import { ShopEffects } from './shop-zone/effects';


@NgModule({
  declarations: [
    BranchComponent,
    BranchEditComponent,
    PickupPointComponent,
    PickupPointEditComponent,
    ShopComponent,
    ShopEditComponent,
  ],
  imports: [
    CrmRoutingModule,
    ServicesModule,
    SharedModule,
    StoreModule.forFeature(branchFeatureKey, branchReducer),
    StoreModule.forFeature(pickupPointFeatureKey, pickupPointReducer),
    StoreModule.forFeature(shopFeatureKey, shopReducer),
    EffectsModule.forFeature([BranchEffects]),
    EffectsModule.forFeature([PickupPointEffects]),
    EffectsModule.forFeature([ShopEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
  ]
})
export class CrmModule { }
