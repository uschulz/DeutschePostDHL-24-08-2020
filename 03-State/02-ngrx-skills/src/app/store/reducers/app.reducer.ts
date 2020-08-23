import { Action } from '@ngrx/store';
import { AppActionTypes, AppActions } from '../actions/app.actions';
import { Author } from '../../authors/author.model';

export const appFeatureKey = 'app';

export interface AppState {
  creditsVisible: boolean;
  authors: Author[];
}

export const initialState: AppState = {
  creditsVisible: false,
  authors: [],
};

export function reducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.ToggleCredits:
      return { ...state, creditsVisible: !state.creditsVisible };
    case AppActionTypes.LoadAuthorsSuccess:
      return { ...state, authors: action.payload };

    default:
      return state;
  }
}
