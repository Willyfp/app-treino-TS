import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ActionsReducerFavorites,
  InitalStateFavoritesInterface,
  ListFavoritesFailed,
  ListFavoritesSuccess,
  TypesReducerFavorites,
} from './types';

const INITIAL_STATE: ImmutableObject<InitalStateFavoritesInterface> = Immutable(
  {
    loading: false,
    success: false,
    data: {},
  },
);

const listFavoritesRequest = (state = INITIAL_STATE) =>
  state.set('loading', true);

const listFavoritesSuccess: ListFavoritesSuccess = (
  state = INITIAL_STATE,
  { data },
) =>
  state.merge({
    data,
    loading: false,
    success: true,
  });

const listFavoritesFailed: ListFavoritesFailed = (
  state = INITIAL_STATE,
  { error },
) =>
  state.merge({
    error,
    loading: false,
  });

const setErrorFavorites = (state = INITIAL_STATE) =>
  state.set('error', undefined);

export const { Types, Creators } = createActions<
  TypesReducerFavorites,
  ActionsReducerFavorites
>({
  listFavoritesRequest: [],
  listFavoritesSuccess: ['data'],
  listFavoritesFailed: ['error'],

  setErrorFavorites: null,

  addFavorite: ['data'],
  removeFavorite: ['data'],
});

export default createReducer(INITIAL_STATE, {
  [Types.LIST_FAVORITES_REQUEST]: listFavoritesRequest,
  [Types.LIST_FAVORITES_SUCCESS]: listFavoritesSuccess,
  [Types.LIST_FAVORITES_FAILED]: listFavoritesFailed,

  [Types.SET_ERROR_FAVORITES]: setErrorFavorites,
});
