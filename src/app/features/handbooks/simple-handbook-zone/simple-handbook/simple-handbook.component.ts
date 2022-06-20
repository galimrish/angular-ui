import { Component, Inject, AfterViewInit, ViewChild, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { merge, Observable, Subscription } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { SimpleHandbook } from 'src/app/models/shared/simple-handbook';
import { SimpleHandbookEditComponent } from '../simple-handbook-edit/simple-handbook-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAll, selectLoadingStatus, selectPageTotalCount } from '../reducer';
import { getAction } from '../actions';
import { ActionType } from "../../../../models/shared/action-type.enum";
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-simple-handbook',
  templateUrl: './simple-handbook.component.html',
  styleUrls: ['./simple-handbook.component.less']
})
export class SimpleHandbookComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'code', 'Operations'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<SimpleHandbook[]>;
  totalCount$: Observable<number | undefined>;
  isLoading$: Observable<boolean>;
  pageSizeOptions: number[];
  
  type: string;
  selection: any[] = [];

  showFilter = false;
  
  nameSearchFC = new FormControl('');
  onFilterChange: EventEmitter<string> = new EventEmitter();

  selectionMode: string;
  subscriptions: Subscription[] = [];

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

    this.type = this.route.snapshot.data['type'];
    this.showFilter = this.route.snapshot.data['showFilter'] || false;
    
    this.selectionMode = this.route.snapshot.queryParams['mode'];
    if (this.selectionMode === 'multi-select') {
      this.displayedColumns.unshift('select');
    }
    if (this.selectionMode === 'single-select') {
      this.displayedColumns = ['Operations', 'name', 'code'];
    }
  }
  
  ngAfterViewInit() {
    this.sort!.sortChange
      .subscribe(() => this.paginator!.pageIndex = 0);
    
    this.subscriptions.push(
      merge(this.paginator!.page, this.sort!.sortChange, this.onFilterChange)
        .pipe(startWith({}))
        .subscribe(() => this.getHandbooks())
    );
  }

  getHandbooks() {
    let totalCount = 0;
    this.subscriptions.push(this.totalCount$.subscribe(count => totalCount = count || 0));

    return this.store.dispatch(getAction(this.type, ActionType.GET)({
      path: this.type,
      method: ActionType.GET,
      page: {
        pageNumber: this.paginator!.pageIndex,
        pageSize: this.paginator!.pageSize,
        sortField: this.sort!.active,
        sortOrder: this.sort!.direction,
        totalCount: totalCount,
      },
      handbookName: this.nameSearchFC.value
    }));
  }

  openHistory() {
    this.router.navigate(['history'], {relativeTo: this.route});
  }

  openEditDialog(hb?: SimpleHandbook): void {
    const dlgRef = this.dialog.open(SimpleHandbookEditComponent, {
      width: '500px',
      data: { type: hb || new SimpleHandbook() }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(result => {
          if (result !== undefined) {
            const method = hb ? ActionType.UPDATE : ActionType.ADD;
            const simpleHb = hb
              ? { id: hb.id, changes: { name: result.name, code: result.code } }
              : new SimpleHandbook(undefined, result.name, result.code)

            this.store.dispatch(getAction(this.type, method)({
              path: this.type,
              method: method,
              id: simpleHb.id,
              simpleHb: simpleHb
            }));

            this.search();
          }
      })
    );
  }
  
  openDeleteDialog(hb: SimpleHandbook): void {
    const dlgRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: `Are you sure you want to delete '${hb.name}'`,
        confirmBtnText: 'Yes',
      }
    });

    this.subscriptions.push(
      this.isLoading$.pipe(
        filter(isLoading => !isLoading),
        switchMap(() => dlgRef.afterClosed())
      ).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(getAction(this.type, ActionType.DELETE)({
            path: this.type,
            method: ActionType.DELETE,
            id: hb.id,
            name: hb.name,
          }));

          this.search();
        }
      })
    );
  }

  // returnMassSelected() {
  //   console.log(this.selection);
  // }


  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.length;
  //   const numRows = this.length;
  //   return numSelected === numRows;
  // }

  // isSelected(type: any) {
  //   return (this.selection.find(e => e.id === type.id) !== undefined);
  // }
  // toggleSelection(type: any) {
  //   if (this.selection.find(e => e.id === type.id) === undefined) {
  //     this.selection.push(type);
  //   } else {
  //     this.selection = this.selection.filter(e => e.id !== type.id);
  //   }
  // }

  search() {
    this.paginator!.pageIndex = 0;
    this.onFilterChange.emit();
    this.getHandbooks();
  }

  clearFilters() {
    this.nameSearchFC.reset();
    this.search();
  }

  ngOnDestroy() {
    this.paginator!.page.unsubscribe();
    this.sort!.sortChange.unsubscribe();
    this.onFilterChange.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
