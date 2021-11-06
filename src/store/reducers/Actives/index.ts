import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  AAA,
  ActionsReducerActives,
  InitalStateActivesInterface,
  ListActivesFailed,
  ListActivesSuccess,
  PersistItemActive,
  TypesReducerActives,
} from './types';

const INITIAL_STATE: ImmutableObject<InitalStateActivesInterface> = Immutable({
  loading: false,
  success: false,
  data: [],
  persistedItem: {},
});

const listActivesRequest = (state = INITIAL_STATE) =>
  state.set('loading', true);

const listActivesSuccess = (state = INITIAL_STATE, { data }: AAA) =>
  state.merge({ data, loading: false, success: true });

const listActivesFailed: ListActivesFailed = (
  state = INITIAL_STATE,
  { error },
) => state.merge({ loading: false, success: false, error });

const persistItemActives: PersistItemActive = (
  state = INITIAL_STATE,
  { data },
) => state.set('persistedItem', data);

const setErrorActives = (state = INITIAL_STATE) =>
  state.set('error', undefined);

export const { Creators, Types } = createActions<
  TypesReducerActives,
  ActionsReducerActives
>({
  listActivesRequest: [],
  listActivesSuccess: ['data'],
  listActivesFailed: ['error'],

  createActive: ['data'],
  editActive: ['data'],
  removeActive: ['data'],

  persistItemActive: ['data'],

  setErrorActives: null,
});

export default createReducer(INITIAL_STATE, {
  [Types.LIST_ACTIVES_REQUEST]: listActivesRequest,
  [Types.LIST_ACTIVES_SUCCESS]: listActivesSuccess,
  [Types.LIST_ACTIVES_FAILED]: listActivesFailed,
  [Types.PERSIST_ITEM_ACTIVE]: persistItemActives,
  [Types.SET_ERROR_ACTIVES]: setErrorActives,
});
