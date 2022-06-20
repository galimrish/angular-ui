import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap } from 'rxjs';
import { ShopService } from 'src/app/shared/services/shop.service';
import { environment } from 'src/environments/environment';
import * as ShopActions from './actions';


@Injectable()
export class ShopEffects {
  
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.getList),
			debounceTime(environment.debounceTime),
      switchMap(action => this.srv.getList(
          action.name,
          action.shopCategory,
          action.merchandise,
          action.pageInfo.pageNumber,
          action.pageInfo.pageSize,
          action.pageInfo.sortField,
          action.pageInfo.sortOrder,
        )
      ),
      map(response => ShopActions.getListSuccess({ list: response.values, total: response.total }))
    )
  );

  create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShopActions.create),
			switchMap(action => this.srv.create(action.shop)),
			map(() => ShopActions.createSuccess())
		)
  );

  update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShopActions.update),
			switchMap(action => this.srv.update(action.update.id.toString(), action.update.changes)),
			map(() => ShopActions.updateSuccess())
		)
  );

  delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ShopActions.remove),
			switchMap(action => this.srv.delete(action.id, action.name)),
			map(() => ShopActions.removeSuccess())
		)
  );

  constructor(
		private actions$: Actions,
		private srv: ShopService,
	) { }
}