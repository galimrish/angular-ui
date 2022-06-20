import { Component, Inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll, selectLoadingStatus, selectPageTotalCount } from '../reducer';
import * as ShopActions from '../actions';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';
import { Shop } from 'src/app/models/crm/shop';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnDestroy {

  displayedColumns: string[] = ['name', 'shopCategory', 'merchandise', 'Operations'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<Shop[]>;
  totalCount$: Observable<number | undefined>;
  isLoading$: Observable<boolean>;
  pageSizeOptions: number[];
  subscriptions: Subscription[] = [];
  
  selectionMode = false;
  selection = [];
  
  nameFC = new FormControl('');
  shopCategoryFC = new FormControl('');
  merchandiseFC = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,

    @Inject('pageSize') public pageSize: number,
    @Inject('pageSizeOptions') private _pageSizeOptions: string,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.dataSource$ = this.store.select(selectAll);
    this.totalCount$ = this.store.select(selectPageTotalCount);
    this.isLoading$ = this.store.select(selectLoadingStatus);

    const pageSizeArray = _pageSizeOptions.split(',');
    this.pageSizeOptions = [];
    pageSizeArray.forEach(size => this.pageSizeOptions.push(parseInt(size, 10)));
  }

  
  ngAfterViewInit() {
    this.sort?.sortChange
      .subscribe(() => this.paginator!.pageIndex = 0);

    let totalCount = 0;
    this.subscriptions.push(this.totalCount$.subscribe(count => totalCount = count || 0));

    this.subscriptions.push(
      merge(this.paginator!.page, this.sort!.sortChange)
        .pipe(startWith({}))
        .subscribe(() => this.store.dispatch(
          ShopActions.getList({
            name: this.nameFC.value,
            shopCategory: this.shopCategoryFC.value,
            merchandise: this.merchandiseFC.value,
            pageInfo: {
              pageNumber: this.paginator!.pageIndex,
              pageSize: this.paginator!.pageSize,
              sortField: this.sort!.active,
              sortOrder: this.sort!.direction,
              totalCount: totalCount,
            },
          })
        ))
    );
  }

  openHistory() {
    this.router.navigate(['history'], {relativeTo: this.route});
  }

  openEditDialog(shop?: Shop): void {
    const dlgRef = this.dialog.open(ShopEditComponent, {
      width: '500px',
      data: { type: shop || new Shop() }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(result => {
          if (result !== undefined) {
            if (shop) {
              this.store.dispatch(ShopActions.update({
                update: {id: shop.id || '', changes: result}
              }));
            } else {
              this.store.dispatch(ShopActions.create({
                shop: new Shop(
                  undefined,
                  result.name,
                  result.shopCategory,
                  result.merchandise,
                )
              }));
            }
            this.search();
          }
      })
    );
  }

  openDeleteDialog(shop: Shop): void {
    const dlgRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete '${shop.name}'`,
        confirmBtnText: 'Yes',
      }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(ShopActions.remove({
            id: shop.id || '',
            name: shop.name || '',
          }));

          this.search();
        }
      })
    );
  }

  search() {
    this.paginator!.pageIndex = 0;
    this.paginator!.page.emit();
  }

  clearFilters() {
    this.nameFC.reset();
    this.shopCategoryFC.reset();
    this.merchandiseFC.reset();
    this.search();
  }

  ngOnDestroy() {
    this.paginator!.page.unsubscribe();
    this.sort!.sortChange.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}