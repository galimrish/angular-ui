import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { PickupPoint } from 'src/app/models/crm/pickup-point';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';

export const getList = createAction(
  '[PickupPoint] Get',
  props<{name?: string, code?: string, city?: string, pageInfo: Partial<PageInfo & SortInfo>}>()
);
export const create = createAction(
  '[PickupPoint] Create',
  props<{pickupPoint: PickupPoint}>()
);
export const update = createAction(
  '[PickupPoint] Update',
  props<{update: Update<PickupPoint>}>()
);
export const getListSuccess = createAction(
  '[PickupPoint] Get Success',
  props<{list: PickupPoint[], total: number}>()
);
export const remove = createAction(
  '[PickupPoint] Delete',
  props<{id: string, name: string}>()
);
export const createSuccess = createAction('[PickupPoint] Create Success');
export const updateSuccess = createAction('[PickupPoint] Update Success');
export const removeSuccess = createAction('[PickupPoint] Delete Success');
