import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: 'handbooks',
    data: {
      breadcrumb: 'Handbooks'
    },
    loadChildren: () => import('./features/handbooks/handbooks.module').then(m => m.HandbooksModule)
  },
  {
    path: 'crm',
    data: {
      breadcrumb: 'CRM'
    },
    loadChildren: () => import('./features/crm/crm.module').then(m => m.CrmModule)
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
