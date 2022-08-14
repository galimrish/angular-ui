import { Component, Inject, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll, selectLoadingStatus, selectPageTotalCount } from '../reducer';
import * as NomenclatureActions from '../actions';
import { Nomenclature } from 'src/app/models/handbooks/nomenclature';
import { NomenclatureEditComponent } from '../nomenclature-edit/nomenclature-edit.component';


@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.less']
})
export class NomenclatureComponent implements AfterViewInit, OnDestroy {
  
  displayedColumns: string[] = ['name', 'code', 'shortName', 'weight', 'Operations'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<Nomenclature[]>;
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
          NomenclatureActions.getList({
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

  openEditDialog(nomenclature?: Nomenclature): void {
    const dlgRef = this.dialog.open(NomenclatureEditComponent, {
      width: '500px',
      data: { type: nomenclature || new Nomenclature() }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(result => {
          if (result !== undefined) {
            if (nomenclature) {
              this.store.dispatch(NomenclatureActions.update({
                update: {id: nomenclature.id || '', changes: result}
              }));
            } else {
              this.store.dispatch(NomenclatureActions.create({
                nomenclature: new Nomenclature(undefined, result.name, result.code, result.shortName, result.weight)
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
