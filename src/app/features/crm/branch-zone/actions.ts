import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Branch } from 'src/app/models/crm/branch';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';

export const getList = createAction(
  '[Branch] Get',
  props<{name?: string, pageInfo: Partial<PageInfo & SortInfo>}>()
);
export const create = createAction(
  '[Branch] Create',
  props<{branch: Branch}>()
);
export const update = createAction(
  '[Branch] Update',
  props<{update: Update<Branch>}>()
);
export const getListSuccess = createAction(
  '[Branch] Get Success',
  props<{list: Branch[], total: number}>()
);
export const createSuccess = createAction('[Branch] Create Success');
export const updateSuccess = createAction('[Branch] Update Success');
