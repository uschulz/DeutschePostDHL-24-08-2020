import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { RouterStateUrl } from '../reducers/router.reducer';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getRouterInfo = createSelector(
  getRouterState,
  (state) => state.state
);

const {
  selectQueryParams, // select the current route query params
  selectRouteParams, // select the current route params
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(getRouterState);
