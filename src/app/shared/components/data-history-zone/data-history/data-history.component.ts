import { AfterViewInit, Component, EventEmitter, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge, startWith, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ActionType } from 'src/app/models/shared/action-type.enum';
import { DataHistory } from 'src/app/models/shared/data-history';
import { getAction } from '../actions';
import { selectAllHistory, selectHistoryPageTotalCount } from '../reducer';

@Component({
  selector: 'app-data-history',
  templateUrl: './data-history.component.html',
  styleUrls: ['./data-history.component.less']
})
export class DataHistoryComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'changes', 'changeDate'];
  footerColumns: string[] = ['no_records'];
  dataSource$: Observable<DataHistory[]>;
  totalCount$: Observable<number | undefined>;
  pageSizeOptions: number[];

  type: string;
  selection: any[] = [];

  idFC = new FormControl('');
  dateFG = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  onFilterChange: EventEmitter<string> = new EventEmitter();

  dataChangeFunc: any;

  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    @Inject('pageSize') public pageSize: number,
    @Inject('pageSizeOptions') private _pageSizeOptions: string,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.dataSource$ = this.store.select(selectAllHistory);
    this.totalCount$ = this.store.select(selectHistoryPageTotalCount);
    const pageSizeArray = _pageSizeOptions.split(',');
    this.pageSizeOptions = [];
    pageSizeArray.forEach(size => this.pageSizeOptions.push(parseInt(size, 10)));

    this.type = this.route.snapshot.data['type'];
  }

  ngAfterViewInit() {
    this.sort!.sortChange
    .subscribe(() => this.paginator!.pageIndex = 0);
    
    let totalCount = 0;
    this.subscriptions.push(this.totalCount$.subscribe(count => totalCount = count || 0));

    this.subscriptions.push(
      merge(this.paginator!.page, this.sort!.sortChange, this.onFilterChange)
        .pipe(
          startWith({}),
        )
        .subscribe(() => {
          this.store.dispatch(getAction(this.type, ActionType.GET_HISTORY)({
            path: this.type,
            method: ActionType.GET_HISTORY,
            page: {
              pageNumber: this.paginator!.pageIndex,
              pageSize: this.paginator!.pageSize,
              sortField: this.sort!.active,
              sortOrder: this.sort!.direction,
              totalCount: totalCount,
            },
            id: this.idFC.value,
            beginChangeDate: this.dateFG.controls['start'].value,
            endChangeDate: this.dateFG.controls['end'].value,
          }));
        })
    );
  }

  search() {
    this.paginator!.pageIndex = 0;
    this.onFilterChange.emit();
  }

  clearFilters() {
    this.idFC.reset();
    this.dateFG.reset();
    this.search();
  }

  ngOnDestroy() {
    this.paginator!.page.unsubscribe();
    this.sort!.sortChange.unsubscribe();
    this.onFilterChange.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
