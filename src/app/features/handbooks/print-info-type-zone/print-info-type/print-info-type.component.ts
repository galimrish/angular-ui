import { Component, Inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll, selectLoadingStatus, selectPageTotalCount } from '../reducer';
import * as PrintInfoTypeActions from '../actions';
import { PrintInfoType } from 'src/app/models/handbooks/print-info-type';
import { PrintInfoTypeEditComponent } from '../print-info-type-edit/print-info-type-edit.component';


@Component({
  selector: 'app-print-info-type',
  templateUrl: './print-info-type.component.html',
  styleUrls: ['./print-info-type.component.less']
})
export class PrintInfoTypeComponent implements AfterViewInit, OnDestroy {
  
  displayedColumns: string[] = ['name', 'code', 'shortName', 'Operations'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<PrintInfoType[]>;
  totalCount$: Observable<number | undefined>;
  isLoading$: Observable<boolean>;
  pageSizeOptions: number[];
  subscriptions: Subscription[] = [];
  
  selectionMode = false;
  selection = [];
  
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
          PrintInfoTypeActions.getList({
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

  openEditDialog(entry?: PrintInfoType): void {
    const dlgRef = this.dialog.open(PrintInfoTypeEditComponent, {
      width: '500px',
      data: { type: entry || new PrintInfoType() }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(result => {
          if (result !== undefined) {
            if (entry) {
              this.store.dispatch(PrintInfoTypeActions.update({
                update: {id: entry.id || '', changes: result}
              }));
            } else {
              this.store.dispatch(PrintInfoTypeActions.create({
                newEntry: new PrintInfoType(undefined, result.name, result.code)
              }));
            }
            this.search();
          }
      })
    );
  }

  search() {
    this.paginator!.pageIndex = 0;
    this.paginator!.page.emit();
  }

  ngOnDestroy() {
    this.paginator!.page.unsubscribe();
    this.sort!.sortChange.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
