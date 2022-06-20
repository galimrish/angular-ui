import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap } from 'rxjs';
import { PickupPointService } from 'src/app/shared/services/pickup-point.service';
import { environment } from 'src/environments/environment';
import * as PickupPointActions from './actions';


@Injectable()
export class PickupPointEffects {
  
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PickupPointActions.getList),
			debounceTime(environment.debounceTime),
      switchMap(action => this.srv.getList(
          action.name,
          action.code,
          action.city,
          action.pageInfo.pageNumber,
          action.pageInfo.pageSize,
          action.pageInfo.sortField,
          action.pageInfo.sortOrder,
        )
      ),
      map(response => PickupPointActions.getListSuccess({ list: response.values, total: response.total }))
    )
  );

  create$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PickupPointActions.create),
			switchMap(action => this.srv.create(action.pickupPoint)),
			map(() => PickupPointActions.createSuccess())
		)
  );

  update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PickupPointActions.update),
			switchMap(action => this.srv.update(action.update.id.toString(), action.update.changes)),
			map(() => PickupPointActions.updateSuccess())
		)
  );

  delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PickupPointActions.remove),
			switchMap(action => this.srv.delete(action.id, action.name)),
			map(() => PickupPointActions.removeSuccess())
		)
  );

  constructor(
		private actions$: Actions,
		private srv: PickupPointService,
	) { }
}