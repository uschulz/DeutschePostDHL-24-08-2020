import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  demosAdapter,
  DemoState,
  demosFeatureKey,
} from '../reducers/demos.reducer';

export const getDemoState = createFeatureSelector<DemoState>(demosFeatureKey);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = demosAdapter.getSelectors();

export const getAllDemos = createSelector(getDemoState, selectAll);

export const getSelectedDemo = createSelector(
  getDemoState,
  (state: DemoState) => state.selected
);

export const getFilter = createSelector(
  getDemoState,
  (state: DemoState) => state.filter
);
