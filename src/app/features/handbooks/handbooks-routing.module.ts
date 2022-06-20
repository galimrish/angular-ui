import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintInfoType } from 'src/app/models/handbooks/print-info-type';
import { DataHistoryComponent } from 'src/app/shared/components/data-history-zone/data-history/data-history.component';
import { HomeComponent } from '../home/home.component';
import { NomenclatureComponent } from './nomenclature-zone/nomenclature/nomenclature.component';
import { SimpleHandbookComponent } from './simple-handbook-zone/simple-handbook/simple-handbook.component';

const routes: Routes = [
  {
    path: 'business-area',
    data: {
      breadcrumb: 'Business area'
    },
    children: [
      {
        path: '',
        component: SimpleHandbookComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'business-area',
          showFilter: true,
          expectedRole: '[ROLE_ADMIN, BUSINESS_AREA, BUSINESS_AREA_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'business-area',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, BUSINESS_AREA, BUSINESS_AREA_U]'
        }
      }
    ]
  },
  {
    path: 'merchandise',
    data: {
      breadcrumb: 'Merchandise'
    },
    children: [
      {
        path: '',
        component: SimpleHandbookComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'merchandise',
          showFilter: true,
          expectedRole: '[ROLE_ADMIN, MERCHANDISE, MERCHANDISE_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'merchandise',
          breadcrumb: 'Changes history',
          showFilter: true,
          expectedRole: '[ROLE_ADMIN, MERCHANDISE, MERCHANDISE_U]'
        }
      }]
  },
  {
    path: 'pickup-point-type',
    data: {
      breadcrumb: 'Pickup point type'
    },
    children: [
      {
        path: '',
        component: SimpleHandbookComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'pickup-point-type',
          expectedRole: '[ROLE_ADMIN, PICKUP_POINT_TYPE, PICKUP_POINT_TYPE_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          breadcrumb: 'Changes history',
          type:'pickup-point-type',
          expectedRole: '[ROLE_ADMIN, PICKUP_POINT_TYPE, PICKUP_POINT_TYPE_U]'
        }
      }]
  },
  {
    path: 'shop-category',
    data: {
      breadcrumb: 'Shop category'
    },
    children: [
      {
        path: '',
        component: SimpleHandbookComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'shop-category',
          expectedRole: '[ROLE_ADMIN, SHOP_CATEGORY, SHOP_CATEGORY_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type:'shop-category',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, SHOP_CATEGORY, SHOP_CATEGORY_U]'
        }
      }]
  },
  {
    path: 'nomenclature',
    data: {
      breadcrumb: 'Nomenclature'
    },
    children: [
      {
        path: '',
        component: NomenclatureComponent,
        // canActivate: [RoleGuard],
        data: {
          expectedRole: '[ROLE_ADMIN, NOMENCLATURE, NOMENCLATURE_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type: 'nomenclature',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, NOMENCLATURE, NOMENCLATURE_U]'
        }
      }]
  },
  {
    path: 'print-info-type',
    data: {
      breadcrumb: 'Print info type'
    },
    children: [
      {
        path: '',
        component: PrintInfoType,
        // canActivate: [RoleGuard],
        data: {
          expectedRole: '[ROLE_ADMIN, PRINTINFOTYPE, PRINTINFOTYPE_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type: 'print-info-type',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, PRINTINFOTYPE, PRINTINFOTYPE_U]'
        }
      }]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandbooksRoutingModule { }
