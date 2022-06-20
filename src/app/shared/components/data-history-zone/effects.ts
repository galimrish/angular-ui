import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { debounceTime, filter, forkJoin, map, of, switchMap } from 'rxjs';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import { hasAction } from './actions';
import { ActionType } from "../../../models/shared/action-type.enum";
import { DataHistoryService } from '../../services/data-history.service';

@Injectable()
export class DataHistoryEffects {

		getHistory$ = createEffect(() =>
		this.actions$.pipe(
			filter((action: any) => hasAction(action.type) && action.method === ActionType.GET_HISTORY),
			debounceTime(environment.debounceTime),
			switchMap((action: {
					type: string,
					path: string,
					page: Partial<PageInfo & SortInfo>,
					id?: string,
					beginChangeDate?: string,
					endChangeDate?: string,
				}) => {
				return forkJoin({
					data: this.srv.getHistory(
						action.path,
						action.page.pageNumber,
						action.page.pageSize,
						action.page.sortField,
						action.page.sortOrder,
						action.id,
						action.beginChangeDate,
						action.endChangeDate,
					),
					type: of(action.type)});
			}),
			map(response => {
				return { type: `${response.type} Success`, payload: response.data };
			})
		));

	constructor(
		private actions$: Actions,
		private srv: DataHistoryService,
	) { }
}