import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataHistoryComponent } from 'src/app/shared/components/data-history-zone/data-history/data-history.component';
import { BranchComponent } from './branch-zone/branch/branch.component';
import { PickupPointComponent } from './pickup-point-zone/pickup-point/pickup-point.component';
import { ShopComponent } from './shop-zone/shop/shop.component';

const routes: Routes = [
  {
    path: 'branch',
    data: {
      breadcrumb: 'Branch'
    },
    children: [
      {
        path: '',
        component: BranchComponent,
        // canActivate: [RoleGuard],
        data: {
          expectedRole: '[ROLE_ADMIN, BRANCH, BRANCH_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type: 'branch',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, BRANCH, BRANCH_U]'
        }
      }]
  },
  {
    path: 'pickup-point',
    data: {
      breadcrumb: 'Pickup point'
    },
    children: [
      {
        path: '',
        component: PickupPointComponent,
        // canActivate: [RoleGuard],
        data: {
          expectedRole: '[ROLE_ADMIN, PICKUP_POINT, PICKUP_POINT_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type: 'pickup-point',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, PICKUP_POINT, PICKUP_POINT_U]'
        }
      }]
  },
  {
    path: 'shop',
    data: {
      breadcrumb: 'Shop'
    },
    children: [
      {
        path: '',
        component: ShopComponent,
        // canActivate: [RoleGuard],
        data: {
          expectedRole: '[ROLE_ADMIN, SHOP, SHOP_U]'
        }
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: DataHistoryComponent,
        // canActivate: [RoleGuard],
        data: {
          type: 'shop',
          breadcrumb: 'Changes history',
          expectedRole: '[ROLE_ADMIN, SHOP, SHOP_U]'
        }
      }]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
