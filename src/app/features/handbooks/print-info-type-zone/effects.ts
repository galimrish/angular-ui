import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap } from 'rxjs';
import { PrintInfoTypeService } from 'src/app/shared/services/print-info-type.service';
import { environment } from 'src/environments/environment';
import * as PrintInfoTypeActions from './actions';


@Injectable()
export class PrintInfoTypeEffects {
  
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrintInfoTypeActions.getList),
			debounceTime(environment.debounceTime),
      switchMap(action => this.srv.getList(
          action.pageInfo.pageNumber,
          action.pageInfo.pageSize,
          action.pageInfo.sortField,
          action.pageInfo.sortOrder,
        )
      ),
      map(response => PrintInfoTypeActions.getListSuccess({ list: response.values, total: response.total }))
    )
  );

  create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PrintInfoTypeActions.create),
			switchMap(action => this.srv.create(action.newEntry)),
			map(() => PrintInfoTypeActions.createSuccess())
		)
  );

  update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PrintInfoTypeActions.update),
			switchMap(action => this.srv.update(action.update.id.toString(), action.update.changes)),
			map(() => PrintInfoTypeActions.updateSuccess())
		)
  );

  delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PrintInfoTypeActions.remove),
			switchMap(action => this.srv.delete(action.id, action.name)),
			map(() => PrintInfoTypeActions.removeSuccess())
		)
  );

  constructor(
		private actions$: Actions,
		private srv: PrintInfoTypeService,
	) { }
}