import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActionType } from 'src/app/models/shared/action-type.enum';
import { DataHistory } from 'src/app/models/shared/data-history';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';

export interface DataHistoryState extends EntityState<DataHistory> {
  selectedDataHistoryId: string | null;
  path: string;
  pageInfo: Partial<PageInfo & SortInfo>;
  entityName: string | null;
}

export const adapterHistory: EntityAdapter<DataHistory> = createEntityAdapter<DataHistory>({
    selectId: (data: DataHistory) => data._id || ''
  });

export const initialHistoryState: DataHistoryState = adapterHistory.getInitialState({
  selectedDataHistoryId: null,
  path: '',
  entityName: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
});

export const dataHistoryFeatureKey = 'dataHistory';

export const dataHistoryReducer = (
  state: DataHistoryState = initialHistoryState,
  action: any
) => {
  console.log(action.type);
  if (action.type.endsWith(ActionType.GET_HISTORY)) {
    return {...state, pageInfo: action.page}
  }
  if (action.type.endsWith(ActionType.GET_HISTORY_SUCCESS)) {
    return {
      ...adapterHistory.setAll(action.payload.values, state),
      pageInfo: {...state.pageInfo, totalCount: action.payload.total}
    };
  }

  return state;
}

export const selectDataHistoryState = createFeatureSelector<DataHistoryState>(dataHistoryFeatureKey);

export const { selectAll: selectAllHistory } = adapterHistory.getSelectors(selectDataHistoryState);

export const selectHistoryPageTotalCount = createSelector(
  selectDataHistoryState,
  (state: DataHistoryState) => {
    return state.pageInfo.totalCount;
  })
