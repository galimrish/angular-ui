import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SimpleHandbook } from 'src/app/models/shared/simple-handbook';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import { ActionType } from "../../../models/shared/action-type.enum";
import { hasAction } from './actions';

export interface SimpleHandbookState extends EntityState<SimpleHandbook> {
  selectedSimpleHandbookId: string | null;
  path: string;
  pageInfo: Partial<PageInfo & SortInfo>;
  handbookName: string | null;
  isLoading: boolean;
}

export const adapter: EntityAdapter<SimpleHandbook> = createEntityAdapter<SimpleHandbook>({
  selectId: (sh: SimpleHandbook) => sh.id || ''
});

export const initialState: SimpleHandbookState = adapter.getInitialState({
  selectedSimpleHandbookId: null,
  path: '',
  handbookName: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const simpleHandbookFeatureKey = 'simpleHandbook';

export const simpleHandbookReducer = (
  state: SimpleHandbookState = initialState,
  action: any
) => {
  if (!hasAction(action.type)) {
    return state;
  }
  console.log(action.type);
  if (action.type.endsWith(ActionType.GET)) {
    return {...state, pageInfo: action.page};
  }
  if (action.type.endsWith(ActionType.GET_SUCCESS)) {
    return {
      ...adapter.setAll(action.payload.values, state),
      isLoading: false,
      pageInfo: {...state.pageInfo, totalCount: action.payload.total}
    };
  }
  
  return {
    ...state,
    isLoading: action.type.endsWith(ActionType.ADD)
      || action.type.endsWith(ActionType.UPDATE)
      || action.type.endsWith(ActionType.DELETE)
  };
}

export const selectSimpleHandbookState =
  createFeatureSelector<SimpleHandbookState>(simpleHandbookFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectSimpleHandbookState);

export const selectPageTotalCount = createSelector(
  selectSimpleHandbookState,
  (state: SimpleHandbookState) => {
    return state.pageInfo.totalCount;
  });

export const selectLoadingStatus = createSelector(
  selectSimpleHandbookState,
  (state: SimpleHandbookState) => {
    return state.isLoading;
  });
  