import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { debounceTime, filter, forkJoin, map, of, switchMap } from 'rxjs';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SimpleHandbook } from 'src/app/models/shared/simple-handbook';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { SimpleHandbookService } from 'src/app/shared/services/simple-handbook.service';
import { environment } from 'src/environments/environment';
import { hasAction } from './actions';
import { ActionType } from "../../../models/shared/action-type.enum";

@Injectable()
export class SimpleHandbookEffects {

	getHandbooks$ = createEffect(() =>
		this.actions$.pipe(
			filter((action: any) => hasAction(action.type) && action.method === ActionType.GET),
			debounceTime(environment.debounceTime),
			switchMap((action: {type: string, path: string, page: Partial<PageInfo & SortInfo>, handbookName: string | null}) => {
				return forkJoin({
					data: this.srv.get(
						action.path,
						action.page.pageNumber,
						action.page.pageSize,
						action.page.sortField,
						action.page.sortOrder,
						action.handbookName,
					),
					type: of(action.type)});
			}),
			map(response => {
				return { type: `${response.type} Success`, payload: response.data };
			})
		));

	addHandbook$ = createEffect(() =>
		this.actions$.pipe(
			filter((action: any) => hasAction(action.type) && action.method === ActionType.ADD),
			switchMap((action: {type: string, path: string, simpleHb: SimpleHandbook}) => {
				return forkJoin({data: this.srv.create(action.path, action.simpleHb), type: of(action.type)});
			}),
			map(response => ({type: `${response.type} Success`}))
		));

	updateHandbook$ = createEffect(() =>
		this.actions$.pipe(
			filter((action: any) => hasAction(action.type) && action.method === ActionType.UPDATE),
			switchMap((action: {type: string, path: string, id: string, simpleHb: Update<SimpleHandbook>}) => {
				return forkJoin({data: this.srv.update(action.path, action.id, action.simpleHb.changes), type: of(action.type)});
			}),
			map(response => ({type: `${response.type} Success`}))
		));

	deleteHandbook$ = createEffect(() =>
		this.actions$.pipe(
			filter((action: any) => hasAction(action.type) && action.method === ActionType.DELETE),
			switchMap((action: {type: string, path: string, id: string, name: string}) => {
				return forkJoin({data: this.srv.delete(action.path, action.id, action.name), type: of(action.type)});
			}),
			map(response => ({type: `${response.type} Success`}))
		));

	constructor(
		private actions$: Actions,
		private srv: SimpleHandbookService,
	) { }
}