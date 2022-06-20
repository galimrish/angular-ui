import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { PrintInfoType } from 'src/app/models/handbooks/print-info-type';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import * as PrintInfoTypeActions from './actions';

export interface PrintInfoTypeState extends EntityState<PrintInfoType> {
  selectedId: string | null,
  pageInfo: Partial<PageInfo & SortInfo>;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<PrintInfoType>({
  selectId: (entry: PrintInfoType) => entry.id || ''
});

export const initialState: PrintInfoTypeState = adapter.getInitialState({
  selectedId: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const printInfoTypeFeatureKey = 'printInfoType';

export const printInfoTypeReducer = createReducer(
  initialState,
  on(PrintInfoTypeActions.getList, (state, { pageInfo }) => {
    console.log(PrintInfoTypeActions.getList.type);
    return {
      ...state,
      pageInfo
    }
  }),
  on(PrintInfoTypeActions.getListSuccess, (state, { list, total }) => {
    console.log(PrintInfoTypeActions.getListSuccess.type);
    return {
      ...adapter.setAll(list, state),
      isLoading: false,
      pageInfo: { ...state.pageInfo, totalCount: total }
    }
  }),
  on(
    PrintInfoTypeActions.create,
    PrintInfoTypeActions.update,
    PrintInfoTypeActions.remove,
    (state) => ({...state, isLoading: true})
  ),
  on(
    PrintInfoTypeActions.createSuccess,
    PrintInfoTypeActions.updateSuccess,
    PrintInfoTypeActions.removeSuccess,
    (state) => ({...state, isLoading: false})
  )
);

export const selectPrintInfoTypeState =
  createFeatureSelector<PrintInfoTypeState>(printInfoTypeFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectPrintInfoTypeState);

export const selectPageTotalCount = createSelector(
  selectPrintInfoTypeState,
  (state: PrintInfoTypeState) => {
    return state.pageInfo.totalCount;
  });

export const selectLoadingStatus = createSelector(
  selectPrintInfoTypeState,
  (state: PrintInfoTypeState) => {
    return state.isLoading;
  });