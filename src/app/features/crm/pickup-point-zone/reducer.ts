import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { PickupPoint } from 'src/app/models/crm/pickup-point';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import * as PickupPointActions from './actions';

export interface PickupPointState extends EntityState<PickupPoint> {
  selectedId: string | null,
  pageInfo: Partial<PageInfo & SortInfo>;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<PickupPoint>({
  selectId: (pickupPoint: PickupPoint) => pickupPoint.id || ''
});

export const initialState: PickupPointState = adapter.getInitialState({
  selectedId: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const pickupPointFeatureKey = 'pickupPoint';

export const pickupPointReducer = createReducer(
  initialState,
  on(PickupPointActions.getList, (state, { pageInfo }) => {
    console.log(PickupPointActions.getList.type);
    return {
      ...state,
      pageInfo
    }
  }),
  on(PickupPointActions.getListSuccess, (state, { list, total }) => {
    console.log(PickupPointActions.getListSuccess.type);
    return {
      ...adapter.setAll(list, state),
      isLoading: false,
      pageInfo: { ...state.pageInfo, totalCount: total }
    }
  }),
  on(
    PickupPointActions.create,
    PickupPointActions.update,
    (state) => ({...state, isLoading: true})
  ),
  on(
    PickupPointActions.createSuccess,
    PickupPointActions.updateSuccess,
    (state) => ({...state, isLoading: false})
  )
);

export const selectPickupPointState =
  createFeatureSelector<PickupPointState>(pickupPointFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectPickupPointState);

export const selectPageTotalCount = createSelector(
  selectPickupPointState,
  (state: PickupPointState) => {
    return state.pageInfo.totalCount;
  });

export const selectLoadingStatus = createSelector(
  selectPickupPointState,
  (state: PickupPointState) => {
    return state.isLoading;
  });