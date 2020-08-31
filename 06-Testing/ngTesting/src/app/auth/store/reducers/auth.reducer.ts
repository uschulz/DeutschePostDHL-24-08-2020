import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: firebase.User;
  token: string | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.RegisterSuccess: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload as firebase.User
      };
    }
    case AuthActionTypes.RegisterErr: {
      return { ...state, isLoggedIn: false, user: null, token: null };
    }
    case AuthActionTypes.LoginErr: {
      return { ...state, isLoggedIn: false, user: null, token: null };
    }
    case AuthActionTypes.LoginSuccess: {
      return { ...state, isLoggedIn: true, user: action.payload };
    }
    case AuthActionTypes.LoginErr: {
      return { ...state, isLoggedIn: false, user: null, token: null };
    }
    case AuthActionTypes.LogoutComplete: {
      return { ...state, isLoggedIn: false, user: null, token: null };
    }
    case AuthActionTypes.SetToken: {
      return { ...state, token: action.payload };
    }
    default:
      return state;
  }
}
