import { createActions, createReducer } from 'reduxsauce';
import Immutable, { ImmutableObject } from 'seamless-immutable';
import {
  ActionsReducerDependents,
  InitalStateDependentsInterface,
  ListDependentsFailed,
  ListDependentsSuccess,
  PersistItemDependent,
  TypesReducerDependents,
} from './types';

const INITIAL_STATE: ImmutableObject<InitalStateDependentsInterface> =
  Immutable({
    loading: false,
    success: false,
    data: {},
    persistedItem: {},
  });

const listDependentsRequest = (state = INITIAL_STATE) =>
  state.set('loading', true);

const listDependentsSuccess: ListDependentsSuccess = (
  state = INITIAL_STATE,
  { data },
) => state.merge({ data, loading: false, success: true });

const listDependentsFailed: ListDependentsFailed = (
  state = INITIAL_STATE,
  { error },
) => state.merge({ loading: false, success: false, error });

const persistItemDependent: PersistItemDependent = (
  state = INITIAL_STATE,
  { data },
) => state.set('persistedItem', data);

const setErrorDependents = (state = INITIAL_STATE) =>
  state.set('error', undefined);

export const { Creators, Types } = createActions<
  TypesReducerDependents,
  ActionsReducerDependents
>({
  listDependentsRequest: [],
  listDependentsSuccess: ['data'],
  listDependentsFailed: ['error'],

  createDependent: ['data'],
  editDependent: ['data'],
  removeDependent: ['data'],

  persistItemDependent: ['data'],

  setErrorDependents: null,
});

export default createReducer(INITIAL_STATE, {
  [Types.LIST_DEPENDENTS_REQUEST]: listDependentsRequest,
  [Types.LIST_DEPENDENTS_SUCCESS]: listDependentsSuccess,
  [Types.LIST_DEPENDENTS_FAILED]: listDependentsFailed,
  [Types.PERSIST_ITEM_DEPENDENT]: persistItemDependent,
  [Types.SET_ERROR_DEPENDENTS]: setErrorDependents,
});
