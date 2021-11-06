import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ActionsReducerLogin,
  editFailed,
  editSuccess,
  InitalStateAuthInterface,
  ListAllFailed,
  ListAllSuccess,
  LoginUserFailed,
  LoginUserSuccess,
  TypesReducerLogin,
} from './types';

const INITIAL_STATE: ImmutableObject<InitalStateAuthInterface> = Immutable({
  loading: false,
  success: false,
  authenticated: false,
  data: {},
  user: undefined,
  loadingSplashScreen: true,
});

const registerRequest = (state = INITIAL_STATE) => state.set('loading', true);

const loginRequest = (state = INITIAL_STATE) => state.set('loading', true);

const loginSuccess: LoginUserSuccess = (state = INITIAL_STATE, { data }) =>
  state.merge({
    authenticated: true,
    user: data,
    loading: false,
    loadingSplashScreen: false,
  });

const loginFailed: LoginUserFailed = (state = INITIAL_STATE, { error }) =>
  state.merge({
    error,
    loading: false,
    loadingSplashScreen: false,
  });

const editUserRequest = (state = INITIAL_STATE) => state.set('loading', true);

const editUserSuccess: editSuccess = (state = INITIAL_STATE, { data }) =>
  state.merge({
    user: data,
    loading: false,
  });

const editUserFailed: editFailed = (state = INITIAL_STATE, { error }) =>
  state.merge({
    error,
    loading: false,
  });

const listAllRequest = (state = INITIAL_STATE) => state.set('loading', true);

const listAllSuccess: ListAllSuccess = (state = INITIAL_STATE, { data }) =>
  state.merge({
    data,
    loading: false,
  });

const listAllFailed: ListAllFailed = (state = INITIAL_STATE, { error }) =>
  state.merge({
    error,
    loading: false,
  });

const logout = (state = INITIAL_STATE) =>
  state.merge({
    user: {},
    loading: false,
    authenticated: false,
  });

export const { Types, Creators } = createActions<
  TypesReducerLogin,
  ActionsReducerLogin
>({
  loginRequest: ['data'],
  loginSuccess: ['data'],
  loginFailed: ['error'],
  registerRequest: ['data'],
  loadUser: [],
  logout: [],

  editUserRequest: ['data'],
  editUserSuccess: ['data'],
  editUserFailed: ['error'],

  listAllRequest: [],
  listAllSuccess: ['data'],
  listAllFailed: ['error'],
});

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.EDIT_USER_REQUEST]: editUserRequest,
  [Types.EDIT_USER_SUCCESS]: editUserSuccess,
  [Types.EDIT_USER_FAILED]: editUserFailed,
  [Types.LIST_ALL_REQUEST]: listAllRequest,
  [Types.LIST_ALL_SUCCESS]: listAllSuccess,
  [Types.LIST_ALL_FAILED]: listAllFailed,
  [Types.LOGOUT]: logout,
});
