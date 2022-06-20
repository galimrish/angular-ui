import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap } from 'rxjs';
import { BranchService } from 'src/app/shared/services/branch.service';
import { environment } from 'src/environments/environment';
import * as BranchActions from './actions';


@Injectable()
export class BranchEffects {
  
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BranchActions.getList),
			debounceTime(environment.debounceTime),
      switchMap(action => this.srv.getList(
          action.name,
          action.pageInfo.pageNumber,
          action.pageInfo.pageSize,
          action.pageInfo.sortField,
          action.pageInfo.sortOrder,
        )
      ),
      map(response => BranchActions.getListSuccess({ list: response.values, total: response.total }))
    )
  );

  create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(BranchActions.create),
			switchMap(action => this.srv.create(action.branch)),
			map(() => BranchActions.createSuccess())
		)
  );

  update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(BranchActions.update),
			switchMap(action => this.srv.update(action.update.id.toString(), action.update.changes)),
			map(() => BranchActions.updateSuccess())
		)
  );

  constructor(
		private actions$: Actions,
		private srv: BranchService,
	) { }
}