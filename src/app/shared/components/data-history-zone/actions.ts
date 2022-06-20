import { createAction, props } from '@ngrx/store';
import { CommonAction } from 'src/app/models/shared/common-action';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { ActionType } from '../../../models/shared/action-type.enum';

const actionsMap = new Map<string, any>();

export const getAction = (entity: string, actionType: ActionType) => {
  const shAction = new CommonAction(entity, actionType);
  if (!actionsMap.has(shAction.type)) {
    if (actionType === ActionType.GET_HISTORY) {
      actionsMap.set(shAction.type, createAction(
        shAction.type,
        props<{
          path: string,
          method: ActionType,
          page: Partial<PageInfo & SortInfo>,
          id: string,
          beginChangeDate: string,
          endChangeDate: string
        }>())
      );
    } else {
      console.error(`Unsupported type: ${actionType}`);
    }
  }
  return actionsMap.get(shAction.type) || createAction('');
}

export const hasAction = (type: string): boolean => actionsMap.has(type);