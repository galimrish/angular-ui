import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Branch } from 'src/app/models/crm/branch';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import * as BranchActions from './actions';

export interface BranchState extends EntityState<Branch> {
  selectedId: string | null,
  pageInfo: Partial<PageInfo & SortInfo>;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Branch>({
  selectId: (branch: Branch) => branch.id || ''
});

export const initialState: BranchState = adapter.getInitialState({
  selectedId: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const branchFeatureKey = 'branch';

export const branchReducer = createReducer(
  initialState,
  on(BranchActions.getList, (state, { pageInfo }) => {
    console.log(BranchActions.getList.type);
    return {
      ...state,
      pageInfo
    }
  }),
  on(BranchActions.getListSuccess, (state, { list, total }) => {
    console.log(BranchActions.getListSuccess.type);
    return {
      ...adapter.setAll(list, state),
      isLoading: false,
      pageInfo: { ...state.pageInfo, totalCount: total }
    }
  }),
  on(
    BranchActions.create,
    BranchActions.update,
    (state) => ({...state, isLoading: true})
  ),
  on(
    BranchActions.createSuccess,
    BranchActions.updateSuccess,
    (state) => ({...state, isLoading: false})
  )
);

export const selectBranchState =
  createFeatureSelector<BranchState>(branchFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectBranchState);

export const selectPageTotalCount = createSelector(
  selectBranchState,
  (state: BranchState) => {
    return state.pageInfo.totalCount;
  })

export const selectLoadingStatus = createSelector(
  selectBranchState,
  (state: BranchState) => {
    return state.isLoading;
  })