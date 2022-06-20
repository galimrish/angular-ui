import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap } from 'rxjs';
import { NomenclatureService } from 'src/app/shared/services/nomenclature.service';
import { environment } from 'src/environments/environment';
import * as NomenclatureActions from './actions';


@Injectable()
export class NomenclatureEffects {
  
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NomenclatureActions.getList),
			debounceTime(environment.debounceTime),
      switchMap(action => this.srv.getList(
          action.pageInfo.pageNumber,
          action.pageInfo.pageSize,
          action.pageInfo.sortField,
          action.pageInfo.sortOrder,
        )
      ),
      map(response => NomenclatureActions.getListSuccess({ list: response.values, total: response.total }))
    )
  );

  create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(NomenclatureActions.create),
			switchMap(action => this.srv.create(action.nomenclature)),
			map(() => NomenclatureActions.createSuccess())
		)
  );

  update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(NomenclatureActions.update),
			switchMap(action => this.srv.update(action.update.id.toString(), action.update.changes)),
			map(() => NomenclatureActions.updateSuccess())
		)
  );

  delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(NomenclatureActions.remove),
			switchMap(action => this.srv.delete(action.id, action.name)),
			map(() => NomenclatureActions.removeSuccess())
		)
  );

  constructor(
		private actions$: Actions,
		private srv: NomenclatureService,
	) { }
}