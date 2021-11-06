import { AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';
import { Favorite } from '../../../types/datas';

export interface InitalStateFavoritesInterface {
  loading: boolean;
  success: boolean;
  data: object;
  error?: Error;
}

export interface ListFavoritesSuccess {
  (
    state: ImmutableObject<InitalStateFavoritesInterface>,
    action: { type: 'LIST_FAVORITES_SUCCESS'; data: Favorite },
  ): ImmutableObject<InitalStateFavoritesInterface>;
}

export interface ListFavoritesFailed {
  (
    state: ImmutableObject<InitalStateFavoritesInterface>,
    action: { type: 'LIST_FAVORITES_FAILED'; error: Error },
  ): ImmutableObject<InitalStateFavoritesInterface>;
}

export interface TypesReducerFavorites {
  LIST_FAVORITES_REQUEST: string;
  LIST_FAVORITES_SUCCESS: string;
  LIST_FAVORITES_FAILED: string;
  ADD_FAVORITE: string;
  REMOVE_FAVORITE: string;
  SET_ERROR_FAVORITES: string;
}

export interface ActionsReducerFavorites {
  listFavoritesRequest(): AnyAction;
  listFavoritesSuccess(data: object): AnyAction;
  listFavoritesFailed(error: Error | unknown): AnyAction;
  addFavorite(data: Favorite): AnyAction;
  removeFavorite(data: Favorite): AnyAction;
  setErrorFavorites(): AnyAction;
}
