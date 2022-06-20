import { ActionType } from './action-type.enum';

export class CommonAction {
  type: string;
  actionType: ActionType;
  entity: string;

  constructor(
    entity: string,
    actionType: ActionType,
  ) {
    this.actionType = actionType;
    this.entity = entity;
    const info = `${entity[0].toUpperCase()}${entity.substring(1).replaceAll('-', ' ')}`;
    this.type = `[${info}] ${actionType}`;
  }
}