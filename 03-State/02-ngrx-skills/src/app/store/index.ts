import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState, reducer as AppReducer } from './reducers/app.reducer';
import {
  SkillsState,
  reducer as skillsReducer,
} from '../skills/store/reducers/skills.reducer';

export interface State {
  app: AppState;
  skills: SkillsState;
}

export const reducers: ActionReducerMap<State> = {
  app: AppReducer,
  skills: skillsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
