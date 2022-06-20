import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandbooksRoutingModule } from './handbooks-routing.module';
import { SimpleHandbookComponent } from './simple-handbook-zone/simple-handbook/simple-handbook.component';
import { StoreModule } from '@ngrx/store';
import { simpleHandbookFeatureKey, simpleHandbookReducer } from './simple-handbook-zone/reducer';
import { EffectsModule } from '@ngrx/effects';
import { SimpleHandbookEffects } from './simple-handbook-zone/effects';
import { SimpleHandbookEditComponent } from './simple-handbook-zone/simple-handbook-edit/simple-handbook-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesModule } from 'src/app/shared/services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from 'src/app/core/interceptors/main.interceptor';
import { NomenclatureComponent } from './nomenclature-zone/nomenclature/nomenclature.component';
import { NomenclatureEditComponent } from './nomenclature-zone/nomenclature-edit/nomenclature-edit.component';
import { nomenclatureFeatureKey, nomenclatureReducer } from './nomenclature-zone/reducer';
import { NomenclatureEffects } from './nomenclature-zone/effects';
import { PrintInfoTypeComponent } from './print-info-type-zone/print-info-type/print-info-type.component';
import { PrintInfoTypeEditComponent } from './print-info-type-zone/print-info-type-edit/print-info-type-edit.component';
import { printInfoTypeFeatureKey, printInfoTypeReducer } from './print-info-type-zone/reducer';


@NgModule({
  declarations: [
    SimpleHandbookComponent,
    SimpleHandbookEditComponent,
    NomenclatureComponent,
    NomenclatureEditComponent,
    PrintInfoTypeComponent,
    PrintInfoTypeEditComponent,
  ],
  imports: [
    HandbooksRoutingModule,
    ServicesModule,
    SharedModule,
    StoreModule.forFeature(simpleHandbookFeatureKey, simpleHandbookReducer),
    StoreModule.forFeature(nomenclatureFeatureKey, nomenclatureReducer),
    StoreModule.forFeature(printInfoTypeFeatureKey, printInfoTypeReducer),
    EffectsModule.forFeature([SimpleHandbookEffects]),
    EffectsModule.forFeature([NomenclatureEffects]),
    EffectsModule.forFeature([PrintInfoTypeComponent]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
  ]
})
export class HandbooksModule { }
