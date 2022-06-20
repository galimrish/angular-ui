import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { ButtonEditComponent } from './components/button-edit/button-edit.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataHistoryComponent } from './components/data-history-zone/data-history/data-history.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from '../core/interceptors/main.interceptor';
import { StoreModule } from '@ngrx/store';
import { dataHistoryFeatureKey, dataHistoryReducer } from './components/data-history-zone/reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataHistoryEffects } from './components/data-history-zone/effects';
import { ButtonHistoryComponent } from './components/button-history/button-history.component';
import { FormAddressComponent } from './components/form-address/form-address.component';


@NgModule({
  declarations: [
    ButtonDeleteComponent,
    ButtonEditComponent,
    ButtonHistoryComponent,
    ConfirmDialogComponent,
    DataHistoryComponent,
    FormAddressComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(dataHistoryFeatureKey, dataHistoryReducer),
    EffectsModule.forFeature([DataHistoryEffects]),
  ],
  exports: [
    ButtonDeleteComponent,
    ButtonEditComponent,
    ButtonHistoryComponent,
    CommonModule,
    CustomMaterialModule,
    FormAddressComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
  ]
})
export class SharedModule {
  constructor(faConf: FaConfig, faLib: FaIconLibrary) {
    faLib.addIcons(faEdit, faRemove);
  }
}
