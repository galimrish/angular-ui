import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Nomenclature } from 'src/app/models/handbooks/nomenclature';
import { PageInfo } from 'src/app/models/shared/page-info';
import { SortInfo } from 'src/app/models/shared/sort-info';
import { environment } from 'src/environments/environment';
import * as NomenclatureActions from './actions';

export interface NomenclatureState extends EntityState<Nomenclature> {
  selectedId: string | null,
  pageInfo: Partial<PageInfo & SortInfo>;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Nomenclature>({
  selectId: (nomenclature: Nomenclature) => nomenclature.id || ''
});

export const initialState: NomenclatureState = adapter.getInitialState({
  selectedId: null,
  pageInfo: {
    pageNumber: 0,
    pageSize: environment.pageSize,
    totalCount: 0,
  },
  isLoading: false,
});

export const nomenclatureFeatureKey = 'nomenclature';

export const nomenclatureReducer = createReducer(
  initialState,
  on(NomenclatureActions.getList, (state, { pageInfo }) => {
    console.log(NomenclatureActions.getList.type);
    return {
      ...state,
      pageInfo
    }
  }),
  on(NomenclatureActions.getListSuccess, (state, { list, total }) => {
    console.log(NomenclatureActions.getListSuccess.type);
    return {
      ...adapter.setAll(list, state),
      isLoading: false,
      pageInfo: { ...state.pageInfo, totalCount: total }
    }
  }),
  on(
    NomenclatureActions.create,
    NomenclatureActions.update,
    NomenclatureActions.remove,
    (state) => ({...state, isLoading: true})
  ),
  on(
    NomenclatureActions.createSuccess,
    NomenclatureActions.updateSuccess,
    NomenclatureActions.removeSuccess,
    (state) => ({...state, isLoading: false})
  )
);

export const selectNomenclatureState =
  createFeatureSelector<NomenclatureState>(nomenclatureFeatureKey);

export const { selectEntities, selectAll, selectTotal } =
  adapter.getSelectors(selectNomenclatureState);

export const selectPageTotalCount = createSelector(
  selectNomenclatureState,
  (state: NomenclatureState) => {
    return state.pageInfo.totalCount;
  });

export const selectLoadingStatus = createSelector(
  selectNomenclatureState,
  (state: NomenclatureState) => {
    return state.isLoading;
  });