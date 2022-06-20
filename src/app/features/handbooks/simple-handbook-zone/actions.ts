import { Update } from '@ngrx/entity';
import { Action, createAction, props } from '@ngrx/store';
import { CommonAction } from 'src/app/models/shared/common-action';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SimpleHandbook } from 'src/app/models/shared/simple-handbook';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { ActionType } from '../../../models/shared/action-type.enum';

const actionsMap = new Map<string, any>();

export const getAction = (entity: string, actionType: ActionType) => {
  const shAction = new CommonAction(entity, actionType);
  if (!actionsMap.has(shAction.type)) {
    switch (actionType) {
      case ActionType.GET:
        actionsMap.set(shAction.type, createAction(
          shAction.type,
          props<{
            path: string,
            method: ActionType,
            page: Partial<PageInfo & SortInfo>,
            handbookName: string,
          }>())
        );
        actionsMap.set(`${shAction.type} Success`, null);
        break;
      case ActionType.ADD:
        actionsMap.set(shAction.type, createAction(shAction.type, props<{simpleHb: SimpleHandbook, path: string, method: ActionType}>()));
        break;
      case ActionType.UPDATE:
        actionsMap.set(shAction.type, createAction(shAction.type, props<{simpleHb: Update<SimpleHandbook>, path: string, method: ActionType}>()));
        break;
      case ActionType.DELETE:
        actionsMap.set(shAction.type, createAction(shAction.type, props<{id: string, path: string, method: ActionType}>()));
        break;
      default:
        actionsMap.set(shAction.type, createAction(shAction.type));
    }
  }
  return actionsMap.get(shAction.type) || createAction('');
}

export const hasAction = (type: string): boolean => actionsMap.has(type);