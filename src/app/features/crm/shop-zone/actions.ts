import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Shop } from 'src/app/models/crm/shop';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';

export const getList = createAction(
  '[Shop] Get',
  props<{name?: string, shopCategory?: string, merchandise?: string, pageInfo: Partial<PageInfo & SortInfo>}>()
);
export const create = createAction(
  '[Shop] Create',
  props<{shop: Shop}>()
);
export const update = createAction(
  '[Shop] Update',
  props<{update: Update<Shop>}>()
);
export const getListSuccess = createAction(
  '[Shop] Get Success',
  props<{list: Shop[], total: number}>()
);
export const remove = createAction(
  '[Shop] Delete',
  props<{id: string, name: string}>()
);
export const createSuccess = createAction('[Shop] Create Success');
export const updateSuccess = createAction('[Shop] Update Success');
export const removeSuccess = createAction('[Shop] Delete Success');
