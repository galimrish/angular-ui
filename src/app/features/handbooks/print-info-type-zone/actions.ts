import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { PrintInfoType } from 'src/app/models/handbooks/print-info-type';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';

export const getList = createAction(
  '[PrintInfoType] Get',
  props<{pageInfo: Partial<PageInfo & SortInfo>}>()
);
export const create = createAction(
  '[PrintInfoType] Create',
  props<{newEntry: PrintInfoType}>()
);
export const update = createAction(
  '[PrintInfoType] Update',
  props<{update: Update<PrintInfoType>}>()
);
export const remove = createAction(
  '[PrintInfoType] Delete',
  props<{id: string, name: string}>()
);
export const getListSuccess = createAction(
  '[PrintInfoType] Get Success',
  props<{list: PrintInfoType[], total: number}>()
);
export const createSuccess = createAction('[PrintInfoType] Create Success');
export const updateSuccess = createAction('[PrintInfoType] Update Success');
export const removeSuccess = createAction('[PrintInfoType] Delete Success');
