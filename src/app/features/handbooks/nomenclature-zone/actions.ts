import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Nomenclature } from 'src/app/models/handbooks/nomenclature';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';

export const getList = createAction(
  '[Nomenclature] Get',
  props<{pageInfo: Partial<PageInfo & SortInfo>}>()
);
export const create = createAction(
  '[Nomenclature] Create',
  props<{nomenclature: Nomenclature}>()
);
export const update = createAction(
  '[Nomenclature] Update',
  props<{update: Update<Nomenclature>}>()
);
export const remove = createAction(
  '[Nomenclature] Delete',
  props<{id: string, name: string}>()
);
export const getListSuccess = createAction(
  '[Nomenclature] Get Success',
  props<{list: Nomenclature[], total: number}>()
);
export const createSuccess = createAction('[Nomenclature] Create Success');
export const updateSuccess = createAction('[Nomenclature] Update Success');
export const removeSuccess = createAction('[Nomenclature] Delete Success');
