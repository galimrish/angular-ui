import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Shop } from 'src/app/models/crm/shop';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import * as ShopActions from './actions';

export interface ShopState extends EntityState<Shop> {
  selectedId: string | null,
  pageInfo: Partial<PageInfo & SortInfo>;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Shop>({
  selectId: (shop: Shop) => shop.id || ''
});

export const initialState: ShopState = adapter.getInitialState({
  selectedId: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const shopFeatureKey = 'shop';

export const shopReducer = createReducer(
  initialState,
  on(ShopActions.getList, (state, { pageInfo }) => {
    console.log(ShopActions.getList.type);
    return {
      ...state,
      pageInfo
    }
  }),
  on(ShopActions.getListSuccess, (state, { list, total }) => {
    console.log(ShopActions.getListSuccess.type);
    return {
      ...adapter.setAll(list, state),
      isLoading: false,
      pageInfo: { ...state.pageInfo, totalCount: total }
    }
  }),
  on(
    ShopActions.create,
    ShopActions.update,
    (state) => ({...state, isLoading: true})
  ),
  on(
    ShopActions.createSuccess,
    ShopActions.updateSuccess,
    (state) => ({...state, isLoading: false})
  )
);

export const selectShopState =
  createFeatureSelector<ShopState>(shopFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectShopState);

export const selectPageTotalCount = createSelector(
  selectShopState,
  (state: ShopState) => {
    return state.pageInfo.totalCount;
  });

export const selectLoadingStatus = createSelector(
  selectShopState,
  (state: ShopState) => {
    return state.isLoading;
  });
