import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';

import { environment } from 'src/environments/environment';
import { AppSnackBarComponent } from './core/snack-bar/snack-bar.component';
import { CustomMaterialModule } from './shared/custom-material/custom-material.module';
import { ServicesModule } from './shared/services/services.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './core/footer/footer.component';
import { EffectsModule } from '@ngrx/effects';
import { MainInterceptor } from './core/interceptors/main.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './core/breadcrumb/breadcrumb.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { HomeComponent } from './features/home/home.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AppSnackBarComponent,
    BreadCrumbComponent,
    FooterComponent,
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServicesModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'pageSize', useValue: environment.pageSize },
    { provide: 'pageSizeOptions', useValue: environment.pageSizeOptions },
    { provide: 'pageSizeSelectForm', useValue: environment.pageSizeSelectForm },
    { provide: 'debounceTime', useValue: environment.debounceTime },
    // { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
    AppSnackBarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
