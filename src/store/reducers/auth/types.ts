import { AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';
import { User } from '../../../types/datas';
import { FormLogin, FormRegister } from '../../../types/forms';

export interface InitalStateAuthInterface {
  loadingSplashScreen: boolean;
  loading: boolean;
  data: object;
  success: boolean;
  authenticated: boolean;
  user?: User;
  error?: Error;
}

export interface TypesReducerLogin {
  LOGIN_REQUEST: string;
  LOGIN_SUCCESS: string;
  LOGIN_FAILED: string;
  LOGOUT: string;
  LOAD_USER: string;
  REGISTER_REQUEST: string;
  EDIT_USER_REQUEST: string;
  EDIT_USER_FAILED: string;
  EDIT_USER_SUCCESS: string;
  LIST_ALL_REQUEST: string;
  LIST_ALL_SUCCESS: string;
  LIST_ALL_FAILED: string;
}

export interface ActionsReducerLogin {
  loginRequest(data: FormLogin): AnyAction;
  loginFailed(error: Error | unknown): AnyAction;
  loginSuccess(logedUser: User): AnyAction;

  editUserRequest(data: User): AnyAction;
  editUserFailed(error: Error | unknown): AnyAction;
  editUserSuccess(logedUser: User): AnyAction;

  registerRequest(data: FormRegister): AnyAction;
  loadUser(): AnyAction;
  logout(): AnyAction;

  listAllRequest(): AnyAction;
  listAllFailed(error: Error | unknown): AnyAction;
  listAllSuccess(data: object): AnyAction;
}

export interface LoginUserSuccess {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'LOGIN_SUCCESS'; data: User },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface LoginUserFailed {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'LOGIN_FAILED'; error: Error },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface RegisterFailed {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'REGISTER_FAILED'; error: Error },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface editSuccess {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'EDIT_USER_SUCCESS'; data: User },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface editFailed {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'EDIT_USER_FAILED'; error: Error },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface ListAllSuccess {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'LIST_ALL_SUCCESS'; data: object },
  ): ImmutableObject<InitalStateAuthInterface>;
}

export interface ListAllFailed {
  (
    state: ImmutableObject<InitalStateAuthInterface>,
    action: { type: 'LIST_ALL_FAILED'; error: Error },
  ): ImmutableObject<InitalStateAuthInterface>;
}
