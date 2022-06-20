import { Component, Inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll, selectLoadingStatus, selectPageTotalCount } from '../reducer';
import * as PickupPointActions from '../actions';
import { PickupPointEditComponent } from '../pickup-point-edit/pickup-point-edit.component';
import { PickupPoint } from 'src/app/models/crm/pickup-point';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pickup-point',
  templateUrl: './pickup-point.component.html',
  styleUrls: ['./pickup-point.component.less']
})
export class PickupPointComponent implements OnDestroy {

  displayedColumns: string[] = ['name', 'code', 'additionalCode', 'city', 'pickupPointType', 'Operations'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<PickupPoint[]>;
  totalCount$: Observable<number | undefined>;
  isLoading$: Observable<boolean>;
  pageSizeOptions: number[];
  subscriptions: Subscription[] = [];
  
  selectionMode = false;
  selection = [];
  
  nameFC = new FormControl('');
  codeFC = new FormControl('');
  cityFC = new FormControl('');

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
          PickupPointActions.getList({
            name: this.nameFC.value,
            code: this.codeFC.value,
            city: this.cityFC.value,
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

  openEditDialog(pickupPoint?: PickupPoint): void {
    const dlgRef = this.dialog.open(PickupPointEditComponent, {
      width: '500px',
      data: { type: pickupPoint || new PickupPoint() }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(result => {
          if (result !== undefined) {
            if (pickupPoint) {
              this.store.dispatch(PickupPointActions.update({
                update: {id: pickupPoint.id || '', changes: result}
              }));
            } else {
              this.store.dispatch(PickupPointActions.create({
                pickupPoint: new PickupPoint(
                  undefined,
                  result.name,
                  result.code,
                  result.additionalCode,
                  result.city,
                  result.pickupPointTypeName,
                )
              }));
            }
            this.search();
          }
      })
    );
  }

  openDeleteDialog(pickupPoint: PickupPoint): void {
    const dlgRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete '${pickupPoint.name}'`,
        confirmBtnText: 'Yes',
      }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(PickupPointActions.remove({
            id: pickupPoint.id || '',
            name: pickupPoint.name || '',
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
    this.codeFC.reset();
    this.cityFC.reset();
    this.search();
  }

  ngOnDestroy() {
    this.paginator!.page.unsubscribe();
    this.sort!.sortChange.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}